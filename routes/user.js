const{router}=require("express");
const userRouter=Router();
app.post("/signup", function (req, res) {
  res.json({
    message: "signup endpoint",
  });
});
app.post("/signin", function (req, res) {
  res.json({
    message: "signin endpoint",
  });
});
app.get("/purchases", function (req, res) {
  res.json({
    message: "purchase endpoint",
  });
});
module.exports={
    userRouter:userRouter
}