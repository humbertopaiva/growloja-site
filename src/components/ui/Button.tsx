import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-ink text-white hover:bg-[#3a2650] shadow-[0_10px_24px_rgba(41,26,55,0.18)]",
  accent:
    "bg-accent text-ink hover:brightness-105 shadow-[0_10px_24px_rgba(177,119,255,0.28)]",
  secondary:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/30 hover:bg-white",
  ghost: "bg-white/10 text-white border border-white/20 hover:bg-white/16",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px] md:h-14 md:px-7 md:text-base",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  children,
  href,
}: {
  className?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
