"use client";

import { Suspense } from "react";
import StripeContainer from "./StripeContainer";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="">
        <Suspense>
          <StripeContainer />
        </Suspense>
      </div>
    </main>
  );
}
