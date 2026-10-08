const { Router } = require("express");

const courseRouter = Router();

const {
  purchaseModel,
  courseModel,
} = require("../db");

const { userMiddleware } = require("../Middleware/user");


// --------------------------------------------------
// Purchase course
// --------------------------------------------------

courseRouter.post(
  "/purchase",
  userMiddleware,
  async function (req, res) {

    const userId = req.userId;

    const courseId = req.body.courseId;

    // Check courseId
    if (!courseId) {
      return res.status(400).json({
        message: "Please provide a courseId",
      });
    }

    // Check whether the course exists
    const course = await courseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    // Check duplicate purchase
    const existingPurchase = await purchaseModel.findOne({
      courseId,
      userId,
    });

    if (existingPurchase) {
      return res.status(400).json({
        message: "You have already bought this course",
      });
    }

    // Create purchase
    const purchase = await purchaseModel.create({
      courseId,
      userId,
    });

    return res.status(201).json({
      message: "You have successfully bought the course",
    });
  }
);


// --------------------------------------------------
// Preview / search courses
// --------------------------------------------------

courseRouter.get(
  "/preview",
  async function (req, res) {

    // Page number
    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    // Courses per page
    const limit = Math.min(
      Number(req.query.limit) || 10,
      20
    );

    // Search text
    const search = req.query.search || "";

    // Calculate documents to skip
    const skip = (page - 1) * limit;

    // Create filter
    let filter = {};

    if (search.trim()) {
      filter = {
        $or: [
          {
            title: {
              $regex: search,
              $options: "i",
            },
          },
          {
            category: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    // Count matching courses
    const totalCourses =
      await courseModel.countDocuments(filter);

    // Get courses
    const courses = await courseModel
      .find(filter)
      .skip(skip)
      .limit(limit);

    // Send response
    res.status(200).json({
      courses,
      pagination: {
        currentPage: page,
        limit,
        totalCourses,
        totalPages: Math.ceil(
          totalCourses / limit
        ),
      },
    });
  }
);


module.exports = {
  courseRouter,
};