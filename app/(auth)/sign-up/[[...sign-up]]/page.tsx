import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F9FAFB] text-[#1E293B]">
      {/* Left: Sign Up Form */}
      <div className="flex flex-col items-center justify-center px-6 lg:px-16">
        <div className="w-full max-w-md bg-white rounded-2xl p-8 space-y-8">
          <div className="text-center space-y-3">
            <h1 className="font-bold text-3xl text-[#1A2A44]">
              Create Your Account
            </h1>
            <p className="text-base text-[#64748B]">
              Join and take control of your financial future
            </p>
          </div>
          <div className="flex items-center justify-center">
            <ClerkLoaded>
              <SignUp path="/sign-up" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin text-[#4C6EF5]" />
            </ClerkLoading>
          </div>
        </div>
      </div>

      {/* Right: Brand Section */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-[#1A2A44] to-[#4C6EF5] relative overflow-hidden">
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Image
            alt="Stone Bridge Logo"
            src="/logo.svg"
            width={400}
            height={400}
            className="mx-auto drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[url('/bridge-pattern.svg')] opacity-10 bg-cover bg-center" />
      </div>
    </div>
  );
}
