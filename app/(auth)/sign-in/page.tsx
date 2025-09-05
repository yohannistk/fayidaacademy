"use client";
import Button from "@/components/fayida-custom-button";
import Input from "@/components/fayida-custom-input";
import { SignInSchema, SignInSchemaT } from "@/app/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

const SigninPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaT>({
    resolver: zodResolver(SignInSchema),
  });
  const onSubmit = async (data: SignInSchemaT) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/sign-in", data, {
        withCredentials: true,
      });
      console.log(res.data.user.role);

      if (res.data.user.role == "STUDENT") {
        router.push("/dashboard");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e.response?.data);
        toast(e.response?.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto">
      <p className="text-base text-gray-500 mb-6">
        Sign in to continue your path to success
      </p>
      <h1 className="text-3xl font-bold text-gray-600 mb-2">Login</h1>
      <p className="text-sm text-muted-foreground my-2">
        Don't have an account?{" "}
        <Link
          href="/sign-up"
          className="text-yellow-500 hover:underline font-medium"
        >
          Sign Up
        </Link>
      </p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label className="text-lg text-gray-500 my-1">Email address</label>
          <Input
            {...register("email")}
            className="w-full px-2 outline-none bg-transparent"
            placeholder="your@email.com"
          />
          {errors.email && (
            <span className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-lg text-gray-500 my-1">Password</label>
          <Input
            {...register("password")}
            className="w-full px-2 outline-none bg-transparent"
            placeholder="your password"
            type="password"
          />
          {errors.password && (
            <span className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
            <input type="checkbox" className="w-4 h-4 accent-primary" />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="text-yellow-500 hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>
        <Button className="w-full flex hover:ring-yellow-500 items-center justify-center text-white transition-all bg-yellow-500">
          {loading ? <Loader className="animate-spin" /> : "Sign in"}
        </Button>
      </form>
    </div>
  );
};

export default SigninPage;
