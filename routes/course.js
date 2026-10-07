const {Router}=require("express");
const courseRouter=Router();
const {purchaseModel,courseModel}=require("../db");
const{userMiddleware}=require("../Middleware/user");
courseRouter.post("/purchase",userMiddleware, async function (req, res) {
  // Extract userId from the request object, which was set by the userMiddleware
    const userId = req.userId;

    // Extract courseId from the request body send by the client
    const courseId = req.body.courseId;

    // If courseId is not provided in the request body, return a error response to the client
    if(!courseId){
        return res.status(400).json({
            message: "Please provide a courseId",
        });
    }

    // Check if the user has already purchased the course by quering the purchaseModel with courseId and userId
    const existingPurchase = await purchaseModel.findOne({
        courseId: courseId,
        userId: userId,     
    });
    // Check whether the course actually exists
    const course = await courseModel.findById(courseId);

    if (!course) {
        return res.status(404).json({
            message: "Course not found",
        });
    }

    // If the user has already purchased the course, return a error response to the client
    if(existingPurchase){
        return res.status(400).json({
            message:"You have already bought this course",
        });
    }

    // Try to create a new purchase entry in the database with the provided courseId and userId
    const purchase=await purchaseModel.create({
        courseId: courseId, // The ID of the course being purchased
        userId: userId, // The ID of the user making the purchase
    });

    // If the purchase is successful, return a status with a success message to the client
    return res.status(201).json({
        message: "You have successfully bought the course"
    });
});
//simple return all the courses , when project grow api will return all the couses at once 
/*courseRouter.get("/preview", async function (req, res) {
  // Query the database to get all the courses available for purchase
    const courses = await courseModel.find({});

    Return the queried course details as a JSON response to the client with a status code
    res.status(200).json({
        courses: courses, // Send the course details back to the client
    });
});*/
//req.query , mongodb filtration and pagination concept , so that we dont get all courses every time at once 
courseRouter.get("/preview", async function (req, res) {

    // Get page number from query parameter
    const page = Math.max(Number(req.query.page) || 1, 1);

    // Get number of courses per page
    // Maximum 20 courses per request
    const limit = Math.min(Number(req.query.limit) || 10, 20);

    // Get search text
    const search = req.query.search || "";

    // Calculate how many courses to skip
    const skip = (page - 1) * limit;

    // Create filter
    const filter = search
        ? {
            title: {
                $regex: search,
                $options: "i"
            }
        }
        : {};

    // Get total number of matching courses
    const totalCourses = await courseModel.countDocuments(filter);

    // Get courses for current page
    const courses = await courseModel
        .find(filter)
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        courses: courses,
        pagination: {
            currentPage: page,
            limit: limit,
            totalCourses: totalCourses,
            totalPages: Math.ceil(totalCourses / limit)
        }
    });
});
module.exports={
    courseRouter: courseRouter
}