import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ImageQuoteProps = {
  src: string;
  alt: string;
  quote: string;
  children?: ReactNode;
  className?: string;
  objectPosition?: string;
};

export function ImageQuote({
  src,
  alt,
  quote,
  children,
  className,
  objectPosition = "center",
}: ImageQuoteProps) {
  return (
    <figure
      className={cn(
        "relative isolate aspect-[16/10] min-h-[22rem] overflow-hidden rounded-[28px] md:min-h-[28rem]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1152px) 1152px, 100vw"
        className="object-cover"
        style={{ objectPosition }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#291a37] from-[12%] via-[#291a37]/75 via-[42%] to-transparent"
        aria-hidden
      />
      <figcaption className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
        <p className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-balance text-white [text-shadow:0_2px_24px_rgba(41,26,55,0.45)] md:text-4xl">
          {quote}
        </p>
        {children ? <div className="mt-5 max-w-xl">{children}</div> : null}
      </figcaption>
    </figure>
  );
}
