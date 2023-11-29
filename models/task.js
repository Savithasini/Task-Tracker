const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskid: {
      type: Number,
    },
    taskname: {
      type: String,
      trim: true,
      required: [true, "taskname is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "description is required"],
    },
    assignto: {
      type: String,
    },
    priority: {
      type: String,
      trim: true,
      required: [true, "priority is required"],
    },
    status: {
      type: String,
      trim: true,
      required: [true, "status is required"],
    },
    duration: {
      type: String,
      trim: true,
      required: [true, "duration is required"],
    },
    assigntime: {
      type: Date,
    },
    notification: {
      type: Number,
    },
    comment: {
      type: String,
    }

  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);


module.exports = mongoose.model("task", taskSchema);
