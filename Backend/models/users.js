const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  mobileNumber: {
    type: String,
  },
  password: {
    type: String,
  },
  createdBy: {
    type: ObjectId,
  },
  updatedBy: {
    type: ObjectId,
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
userSchema.plugin(aggregatePaginate);
module.exports = mongoose.model("users", userSchema);
