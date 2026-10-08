const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
  },
  {
    timestamps: true,
  },
);

const adminSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
  },

  {
    timestamps: true,
  },
);

const courseSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    category: String,
    imageUrl: String,
    creatorId: ObjectId,
  },
  {
    timestamps: true,
  },
);

const purchaseSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    courseId: {
        type: ObjectId,
        required: true
    }
}, {
    timestamps: true
});

purchaseSchema.index(
    { userId: 1, courseId: 1 },
    { unique: true }
);
const progressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    completedLessons: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

progressSchema.index(
  { userId: 1, courseId: 1 },
  { unique: true }
);

const progressModel =mongoose.model("Progress", progressSchema);

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
  progressModel,
};
