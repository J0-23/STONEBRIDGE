import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

export const NavButton = ({ href, label, isActive }: Props) => {
  return (
    <Button
      asChild
      size="sm"
      variant="ghost"
      className={cn(
        // Base style
        "font-medium text-base rounded-xl transition-colors duration-200 px-4",
        // Colors and states
        "text-white hover:text-black hover:bg-white/10 focus:bg-white/10",
        isActive ? "text-white bg-white/10 shadow-sm" : "bg-transparent",
        // Cleanup focus ring
        "focus-visible:ring-0 focus-visible:ring-offset-0"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
