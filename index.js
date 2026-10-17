const app = express();
app.use(cors());
app.use(express.json());

// Database connection function
let dbConnectionPromise;

async function connectDB() {
  if (!MONGO_URL) {
    throw new Error("MONGO_URL is not configured");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!dbConnectionPromise) {
    console.log("Attempting MongoDB connection...");

    dbConnectionPromise = mongoose
      .connect(MONGO_URL, {
        serverSelectionTimeoutMS: 15000,
      })
      .catch((error) => {
        dbConnectionPromise = null;

        console.error("MongoDB connection failed:", {
          name: error.name,
          message: error.message,
          code: error.code,
        });

        throw error;
      });
  }

  await dbConnectionPromise;
}

// IMPORTANT: This must run BEFORE the API routers.
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// API routes must come AFTER the database middleware.
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

// Preserve local and AWS server startup.
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

module.exports = app;