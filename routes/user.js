const { Router } = require("express");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const z = require("zod");
const bcrypt = require("bcrypt");
const { userMiddleware } = require("../Middleware/user");
const { userModel,purchaseModel,courseModel } = require("../db");
const { JWT_USER_PASSWORD } = require("../config");
userRouter.post("/signup", async function (req, res) {
  const requireBody = z.object({
    email: z.string().min(3).max(100).email(),
    password: z.string().min(3).max(12),
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
  });
  const parseDataSuccess = requireBody.safeParse(req.body);
  if (!parseDataSuccess.success) {
    return res.json({
      message: "Incorrect Format",
      error: parseDataSuccess.error,
    });
  }
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      message: "unable to create account ",
    });
  }
  res.json({
    message: "signed up successfully",
  });
});
userRouter.post("/signin", async function (req, res) {
  const requireBody = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });
  const parseDatawithSuccess = requireBody.safeParse(req.body);
  if (!parseDatawithSuccess.success) {
    return res.json({
      message: "unable to signin",
      error: parseDatawithSuccess.error,
    });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({
    email: email,
  });
  if (!user) {
    return res.status(403).json({
      message: "Incorrect Credentials!",
    });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    // Create a jwt token using the jwt.sign() method
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD,
      {expiresIn:"2h"}
    );

    // Send the generated token back to client
    res.json({
      token: token,
    });
  } else {
    // If the password does not match, return a error indicating the invalid credentials
    res.status(403).json({
      // Error message for failed password comparison
      message: "Invalid credentials!",
    });
  }
});
userRouter.get("/purchases", userMiddleware, async function (req, res) {
  const userId = req.userId;
  const purchases = await purchaseModel.find({
    userId: userId,
  });

  if (purchases.length===0) {
    return res.status(404).json({
      // Error message for no purchases found
      message: "No purchases found",
    });
  }

  // If purchases are found, extract the courseIds from the found purchases
  const purchasesCourseIds = purchases.map((purchase) => purchase.courseId);

  // Find all course details associated with the courseIds
  const courseData = await courseModel.find({
    _id: { $in: purchasesCourseIds },
  });

  // Send the purchases and corresponding course details back to the client
  res.status(200).json({
    purchases,
    courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};
