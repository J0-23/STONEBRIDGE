"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 my-6 mt-[-30px]">
      <h2 className="text-3xl lg:text-5xl font-semibold text-white tracking-tight">
        Welcome back{isLoaded ? ", " : " "}
        <span className="text-[#BFD8FF]">{user?.firstName}</span>
      </h2>
      <p className="text-base lg:text-lg text-[#C6D9FF]/90 font-light">
        Here’s your financial overview report
      </p>
    </div>
  );
};
