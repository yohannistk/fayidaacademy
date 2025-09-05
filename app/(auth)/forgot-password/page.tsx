import Button from "@/components/fayida-custom-button";
import Input from "@/components/fayida-custom-input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ForgotPasswordPage = () => {
  return (
    <div className="max-w-lg w-full mx-auto">
      <p className="text-base text-gray-500 mb-6">
        Enter your email and we'll send you instructions to reset your password
      </p>
      <h1 className="text-3xl font-bold text-gray-600 mb-2">
        Reset Your Password
      </h1>
      <p className="text-sm text-muted-foreground my-2">
        Back to{" "}
        <Link
          href="/sign-in"
          className="text-yellow-500 hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label className="text-lg text-gray-500 my-1">Email address</label>
          <Input
            className="w-full px-2 outline-none bg-transparent"
            placeholder="your@email.com"
          />
        </div>
        <Button className="w-full text-white transition-all bg-yellow-500">
          Send the instructions
        </Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
