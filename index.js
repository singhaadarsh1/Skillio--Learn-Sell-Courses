require('dotenv').config()
//console.log(process.env.MONGO_URL)
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGO_URL } = require("./config");

const{userRouter}=require("./routes/user");
const {courseRouter}=require("./routes/course");
const {adminRouter}=require("./routes/admin");
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);


async function main(){
    try{
    await mongoose.connect(MONGO_URL);
    console.log("connected to the database ");
    const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
console.log(`LISTENING ON PORT ${PORT}`);
});
    }catch(e){
        console.error("Failed to connect to the database ",e);
    }
}
main();



