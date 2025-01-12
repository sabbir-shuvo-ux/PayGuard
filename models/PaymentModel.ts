import { Document, Schema, Types, model, models } from "mongoose";

// sachema type
export interface IPaymentType extends Document {
  title: string;
  amount: Types.Decimal128;
  status: "pending" | "approved" | "rejected";
  user_id: Types.ObjectId;
  user_email: string;
}

// Payment Schema
const PaymentSchema = new Schema<IPaymentType>(
  {
    title: {
      type: String,
      required: true,
    },
    amount: {
      type: Schema.Types.Decimal128,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "approved", "rejected"],
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user_email: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentRequest =
  models.payment_request ||
  model<IPaymentType>("payment_request", PaymentSchema);

export default PaymentRequest;
