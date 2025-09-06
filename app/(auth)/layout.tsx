import Image from "next/image";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { ArrowLeftIcon, PlayCircle } from "lucide-react";
import Link from "next/link";
const AuthLayout = async ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="h-full w-full relative lg:p-24 grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-28">
        <Image
          src={"/landing-bg.jpg"}
          alt="Background"
          fill
          priority
          className="object-cover -z-10"
        />
        <div className="hidden relative xl:flex items-center justify-center h-full">
          <div className="w-full h-full flex items-center justify-center">
            <Link href={"/"}>
              <span className="absolute font-bold text-2xl leading-16 text-white top-3 left-3">
                fayidaacademy.com
              </span>
            </Link>
            <div>
              <p className="font-bold text-4xl leading-16 text-white">
                Discover a world of knowledge with Fayida. Learn anytime,
                anywhere, at your own pace, and explore courses designed to help
                you grow, gain valuable insights, and achieve your goals.
              </p>
              <button className="relative text-white bg-yellow-500 mt-5 flex items-center justify-center gap-2 px-6 py-3 font-medium rounded-lg transition">
                <PlayCircle />
                Watch a Demo
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-full">
          <div className="bg-white relative w-full p-6 lg:max-w-3xl h-full flex items-center justify-center lg:rounded-4xl">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
