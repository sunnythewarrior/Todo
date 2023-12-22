const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
// Define Todo Schema
const todoSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  todo: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});
todoSchema.index(
  { userId: 1, "todo.createdAt": 1, "todo.title": 1 },
  { unique: true }
);
todoSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("todo", todoSchema);
