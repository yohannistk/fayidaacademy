import { Search } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="h-full relative pt-28">
        <Image
          src={"/landing-bg.jpg"}
          alt="Background"
          fill
          priority
          className="object-cover -z-10"
        />
        <div className="max-w-[90rem] mx-auto">
          <section className="py-16 ">
            <div className="mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-5 items-center">
                <div className="lg:w-1/2 mb-8 md:mb-0">
                  <h1 className="text-5xl md:text-6xl xl:text-8xl font-bold text-white mb-4">
                    let's embark on this knowledge journey!
                  </h1>
                  <p className="text-lg text-white">
                    Learn anytime, anywhere, at your own pace. Explore a wide
                    range of subjects and resources tailored just for you. Gain
                    practical skills and insights that help you grow every day.
                  </p>
                  <div className="w-full h-16 bg-white rounded-full border flex mt-5 max-w-md">
                    <input
                      placeholder="Search over 5000 courses"
                      className="flex-3/4 font-semibold text-gray-600 text-lg h-full outline-none p-5"
                    />
                    <button className="h-full rounded-r-full cursor-pointer px-4 text-white bg-primary flex items-center gap-3 font-bold">
                      Search <Search />
                    </button>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <Image
                    src={"/bannerx01.webp"}
                    alt="Banner"
                    width={1000}
                    height={1000}
                    className="rounded-4xl"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
