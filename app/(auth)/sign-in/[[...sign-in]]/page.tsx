"use client";

import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Page() {
  const [logoGone, setLogoGone] = useState(false);

  return (
    <div className="min-h-screen relative bg-white overflow-hidden">
      {/* Fullscreen Logo fading out */}
      {!logoGone && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-blue-600 z-20"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          onAnimationComplete={() => setLogoGone(true)}
          style={{ pointerEvents: "none" }} // ensures clicks go through
        >
          <Image alt="Logo" src="/logo.svg" width={300} height={300} />
        </motion.div>
      )}

      {/* Login Page fading in faster */}
      <motion.div
        className="min-h-screen grid grid-cols-1 lg:grid-cols-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
      >
        {/* Left: Login */}
        <div className="h-full lg:flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-4 pt-16">
            <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back</h1>
            <p className="text-base text-[#7E8CA0]">
              Log in or Create account to get back to your dashboard
            </p>
          </div>
          <div className="flex items-center justify-center mt-8">
            <ClerkLoaded>
              <SignIn path="/sign-in" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin text-muted-foreground" />
            </ClerkLoading>
          </div>
        </div>

        {/* Right: Logo */}
        <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
          <Image alt="Logo" src="/logo.svg" height={300} width={300} />
        </div>
      </motion.div>
    </div>
  );
}
