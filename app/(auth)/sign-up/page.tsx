import Link from "next/link";
import React from "react";
import SignupForm from "./components/signup-form";

const SignUpPage = async () => {
  return (
    <div className="max-w-lg w-full mx-auto">
      <p className="text-base text-gray-500 mb-6">
        Join our community of learners and access educational content
      </p>
      <h1 className="text-3xl font-bold text-gray-600 mb-2">
        Create your Fayida account
      </h1>
      <p className="text-sm text-muted-foreground my-2">
        Alredy have an account{" "}
        <Link
          href="/sign-in"
          className="text-yellow-500 hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
      <SignupForm />
    </div>
  );
};

export default SignUpPage;
