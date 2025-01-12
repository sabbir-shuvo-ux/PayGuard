import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please Provide Email Address"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Provide Password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = models.user || model("user", UserSchema);

export default User;
