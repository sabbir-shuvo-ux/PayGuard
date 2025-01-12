import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "admin" | "user";
}

const UserSchema = new Schema<IUser>(
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

const User = models.user || model<IUser>("user", UserSchema);

export default User;
