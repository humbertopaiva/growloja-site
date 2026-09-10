import Image from "next/image";
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
      className={cn("inline-flex items-center", className)}
      aria-label="Growloja, ir para o início"
      onClick={onClick}
    >
      <Image
        src={inverted ? "/logo-white.png" : "/logo.png"}
        alt="Growloja"
        width={160}
        height={40}
        priority
        className="h-8 w-auto md:h-9"
      />
    </Link>
  );
}
