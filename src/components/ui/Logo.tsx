import Link from "next/link";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  inverted = false,
  onClick,
}: {
  className?: string;
  inverted?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/#inicio"
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Growloja, ir para o início"
      onClick={onClick}
    >
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-lg",
          inverted ? "bg-white/10" : "bg-ink",
        )}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <path
            d="M4.5 16.5L9 10.5L12.5 13.5L19 6"
            stroke="#b5e766"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="19" cy="6" r="1.4" fill="#b5e766" />
        </svg>
      </span>
      <span
        className={cn(
          "text-[15px] font-semibold tracking-[0.14em]",
          inverted ? "text-white" : "text-ink",
        )}
      >
        GROWLOJA
      </span>
    </Link>
  );
}
