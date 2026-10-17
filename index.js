require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { MONGO_URL } = require("./config");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

let dbConnectionPromise;

async function connectDB() {
  if (!MONGO_URL) {
    throw new Error("MONGO_URL is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!dbConnectionPromise) {
    dbConnectionPromise = mongoose.connect(MONGO_URL).catch((error) => {q
      dbConnectionPromise = null;
      throw error;
    });
  }

  await dbConnectionPromise;
  console.log("Connected to MongoDB Atlas");
}

// Ensure the database is connected before handling requests.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// Preserve the traditional server for AWS and local development.
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`LISTENING ON PORT ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Failed to start server:", error.message);
      process.exit(1);
    });
}

// Export the application for Vercel.
module.exports = app;
