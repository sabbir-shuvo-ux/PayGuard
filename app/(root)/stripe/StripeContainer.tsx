import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const StripeContainer = () => {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const email = searchParams.get("email");
  const id = searchParams.get("id");

  return (
    <>
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">{email}</h1>
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      {id && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(Number(amount)),
            currency: "usd",
          }}
        >
          <CheckoutPage id={id} amount={Number(amount)} />
        </Elements>
      )}
    </>
  );
};

export default StripeContainer;
