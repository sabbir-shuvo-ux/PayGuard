"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// ui components
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// utility function
import { handleError } from "@/lib/handleError";

// types and schema
import {
  PaymentRequestSchema,
  type PaymentRequestSchemaType,
} from "@/schemas/payment-schema/PaymentSchema";
import { RequtestPayment } from "@/actions/payments/RequtestPayment";

const RequestForm = () => {
  // initialize form
  const form = useForm<PaymentRequestSchemaType>({
    resolver: zodResolver(PaymentRequestSchema),
    defaultValues: {
      title: "",
      amount: 0,
    },
  });

  // handle form submit
  async function onSubmit(data: PaymentRequestSchemaType) {
    try {
      const res = await RequtestPayment(data);

      if (res.success) {
        toast("Payment Request Successfull");
      }
    } catch (err: unknown) {
      // handle error using utility function "handleError"
      const res = handleError(err);
      toast(res.error);
    }
  }

  // reset form state if client side validation is successfull
  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [form, form.formState.isSubmitSuccessful]);

  return (
    <div className="max-w-lg w-full mt-6">
      <h2>Request A Payment</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormInput
            form={form}
            name="title"
            placeholder="Enter a Title"
            label="Title"
          />

          <FormInput
            form={form}
            name="amount"
            placeholder="Enter Your Amount"
            label="Amount"
            type="number"
          />

          <Button disabled={form.formState.isSubmitting} type="submit">
            {form.formState.isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RequestForm;
