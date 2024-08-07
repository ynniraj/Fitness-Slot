const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: false,
    },
    capacity: {
      type: String,
      required: false,
    },
    bookedSlots: {
      type: Number,
      required: false,
    },
    waitlist: {
      type: [String],
      required: true,
    },
    bookedBy: {
      type: [String],
      required: false,
    },
    startTime: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Class", classSchema);
