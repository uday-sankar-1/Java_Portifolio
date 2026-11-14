import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"button"> & {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
};

const variants = {
  primary: "bg-accent text-accent-fg hover:brightness-110",
  secondary: "border border-border bg-card text-fg hover:border-accent hover:text-accent",
  ghost: "text-muted hover:text-fg",
};

export function Button({ asChild, variant = "primary", size = "md", className, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[color,background-color,border-color,filter] duration-200 disabled:pointer-events-none disabled:opacity-60",
        size === "lg" ? "h-12 px-6 text-base" : "h-10 px-4 text-sm",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
