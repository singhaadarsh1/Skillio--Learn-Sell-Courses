const {Router}=require("express");
const courseRouter=Router();
const {purchaseModel,courseModel}=require("../db");
courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "course purchased endpoint",
  });
});
courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "courses endpoint",
  });
});
module.exports={
    courseRouter: courseRouter
}