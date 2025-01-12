"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Login } from "@/actions/auth/Login";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleError } from "@/lib/handleError";
import {
  AuthSchema,
  type AuthSchemaType,
} from "@/schemas/auth-schema/AuthSchema";
import { useEffect } from "react";
import { toast } from "sonner";
import { Signup } from "@/actions/auth/Signup";

const LoginForm = () => {
  // initialize form
  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // handle form submit
  async function onSubmit(
    data: AuthSchemaType,
    event: React.BaseSyntheticEvent<object, any, any>
  ) {
    try {
      const submitEvent = event.nativeEvent as SubmitEvent;
      const actionType = (submitEvent.submitter as HTMLButtonElement)?.value;

      // handle login if actionType is login
      if (actionType === "login") {
        await Login(data);
      }

      // handle Signup if actionType is signup
      if (actionType === "signup") {
        const res = await Signup(data);

        // handle message based on res status
        if (res.success) {
          toast(res?.message);
        } else {
          toast(res?.message);
        }
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
    <div className="max-w-lg w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data, event) =>
            onSubmit(data, event as React.BaseSyntheticEvent<object, any, any>)
          )}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter Your Password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            value={"login"}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Login"}
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            value={"signup"}
          >
            {form.formState.isSubmitting ? "Submitting..." : "Signup"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
