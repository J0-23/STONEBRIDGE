"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import { Navigation } from "@/components/navigation";
import { HeaderLogo } from "@/components/header-logo";
import { WelcomeMsg } from "@/components/welcome-msg";
import { Filters } from "@/components/filters";

export const Header = () => {
  const { isLoaded } = useUser(); // Checks if user session is ready

  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>

          {/* Show loader until user session is ready */}
          {!isLoaded ? (
            <Loader2 className="size-8 animate-spin text-slate-400" />
          ) : (
            <UserButton afterSwitchSessionUrl="/" />
          )}
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  );
};
