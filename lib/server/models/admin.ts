import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    firstTime: {
      type: Boolean,
      default: true,
    },
    profilePicture: {
      type: String,
    },
    role: {
      type: String,
      default: "admin",
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema, "Admins");

export default Admin;
