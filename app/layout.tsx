import type { Metadata } from "next";
import { DM_Sans, Roboto_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stone Bridge Dashboard",
  description: "Strong by Design — Stone Bridge Corporate Banking Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="bg-[#F8FAFC] text-[#1E293B]">
        <body
          className={`${dmSans.variable} ${robotoMono.variable} antialiased font-sans bg-[#F8FAFC] min-h-screen`}
        >
          <QueryProvider>
            <SheetProvider />
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#FFFFFF",
                  color: "#1E293B",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  fontFamily: "var(--font-dm-sans)",
                },
              }}
            />
            <main className="min-h-screen">{children}</main>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
