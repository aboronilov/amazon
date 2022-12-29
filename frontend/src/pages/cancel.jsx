import Header from "../components/Header";
import { XCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const Cancel = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Header />

      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <XCircleIcon className="text-red-700 h-10" />
            <h1 className="text-3xl">Oops, your order has been declined :(</h1>
          </div>
          <p>
            Thank you for shopping with us. Your payment has been rejected.
            Please check your card payment payment details. <br />
            To test the payment functionality you can use this Stripe{" "}
            <a
              href="https://stripe.com/docs/testing"
              target="_blank"
              className="cursor-pointer text-blue-500 hover:opacity-80 hover:shadow-md transition duration-300"
            >
              test cards
            </a>
          </p>
          <button className="button mt-8" onClick={() => router.push("/")}>
            Go shopping
          </button>
        </div>
      </main>
    </div>
  );
};

export default Cancel;
