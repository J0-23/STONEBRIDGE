"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { useMedia } from "react-use";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/nav-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const routes = [
  { href: "/", label: "Overview" },
  { href: "/transactions", label: "Transactions" },
  { href: "/accounts", label: "Accounts" },
  { href: "/categories", label: "Categories" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="font-medium bg-[#1A2A44] hover:bg-[#4C6EF5] hover:text-white border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 transition-colors"
          >
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="bg-white border-r border-[#E2E8F0] px-4 py-6"
        >
          <nav className="flex flex-col gap-y-2">
            {routes.map((route) => (
              <Button
                key={route.href}
                onClick={() => onClick(route.href)}
                variant="ghost"
                className={`w-full justify-start text-[#1E293B] font-medium text-base transition-colors ${
                  pathname === route.href
                    ? "bg-[#EFF4FF] text-[#4C6EF5]"
                    : "hover:bg-[#F1F5F9] hover:text-[#1A2A44]"
                }`}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden lg:flex items-center gap-x-1 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};
