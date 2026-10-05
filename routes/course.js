const {Router}=require("express");
const courseRouter=Router();
app.post("/purchase", function (req, res) {
  res.json({
    message: "course purchased endpoint",
  });
});
app.get("/preview", function (req, res) {
  res.json({
    message: "courses endpoint",
  });
});
module.exports={
    courseRouter: courseRouter
}