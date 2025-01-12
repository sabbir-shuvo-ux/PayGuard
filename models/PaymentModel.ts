import { Schema, model, models } from "mongoose";

const PaymentSchema = new Schema(
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
  },
  { timestamps: true }
);

const PaymentRequest =
  models.payment_request || model("payment_request", PaymentSchema);

export default PaymentRequest;
