const {Router}=require("express");
const adminRouter=Router();
const {adminModel , courseModel}=require("../db");
adminRouter.post("/signup", function(req,res){
    res.json({
        message:"signed in"

    });
});
adminRouter.post("/signin", function(req,res){
    res.json({
        message:"signed up"
    });
});
adminRouter.post("/course",function(req,res){
    res.json({
        message: "add courses"
    });
});
adminRouter.put("/course",function(req,res){
    res.json({
        message: "add courses"
    });
});

adminRouter.get("/course/bulk",function(req,res){
    res,json({
        message:"get all courses"
    })
})
module.exports={
    adminRouter:adminRouter
}