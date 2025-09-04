"use client";

import Button from "@/app/components/fayida-custom-button";
import Input from "@/app/components/fayida-custom-input";
import Image from "next/image";
import React from "react";

const SigninPage = () => {
  const handleSubmt = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
      <div className="hidden lg:flex items-center justify-center bg-[#07705D]">
        <h1 className="text-3xl text-white/80">
          Wellcome To Fayida Academy 👋
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-md w-full mx-auto">
          <Image
            alt="Fayida Academy"
            width={100}
            height={200}
            src={"/fayida-academy-logo.png"}
            className="mx-auto"
          />
          <form className="space-y-4" onSubmit={handleSubmt}>
            <Input className="w-full" placeholder="Email" />
            <Input className="w-full" placeholder="Password" />
            <Button className="w-full">Sign in </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
