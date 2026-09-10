import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-ink text-white hover:bg-ink-hover shadow-[0_10px_24px_rgba(23,26,22,0.18)]",
  accent:
    "bg-accent text-ink hover:brightness-105 shadow-[0_10px_24px_rgba(181,231,102,0.35)]",
  secondary:
    "bg-transparent text-ink border border-ink/15 hover:border-ink/30 hover:bg-white",
  ghost: "bg-white/10 text-white border border-white/20 hover:bg-white/16",
};

const sizes = {
  md: "h-11 px-5 text-sm",
  lg: "min-h-12 px-5 py-3 text-[15px] leading-snug md:h-14 md:px-7 md:py-0 md:text-base",
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
        "inline-flex w-full min-w-0 max-w-full items-center justify-center gap-2 rounded-full font-medium text-center transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto",
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
  external = false,
}: {
  className?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: ReactNode;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex w-full min-w-0 max-w-full items-center justify-center gap-2 rounded-full font-medium text-center transition-all duration-200 active:scale-[0.98] lg:w-auto",
        variants[variant],
        sizes[size],
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
