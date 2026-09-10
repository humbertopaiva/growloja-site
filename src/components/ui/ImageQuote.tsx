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
  const overlay = (
    <div
      className="absolute inset-0 bg-gradient-to-t from-[#291a37] from-[12%] via-[#291a37]/75 via-[42%] to-transparent"
      aria-hidden
    />
  );

  const quoteEl = (
    <p className="max-w-3xl text-2xl font-medium leading-tight tracking-tight text-balance text-white [text-shadow:0_2px_24px_rgba(41,26,55,0.45)] md:text-4xl">
      {quote}
    </p>
  );

  if (!children) {
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
        {overlay}
        <figcaption className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          {quoteEl}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className={cn(
        "relative isolate w-full min-w-0 max-w-full overflow-hidden rounded-[28px] bg-ink md:min-h-[32rem]",
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full md:absolute md:inset-0 md:aspect-auto md:h-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
        <div
          className="absolute inset-0 hidden bg-gradient-to-t from-[#291a37] from-[12%] via-[#291a37]/75 via-[42%] to-transparent md:block"
          aria-hidden
        />
      </div>
      <figcaption className="relative flex min-w-0 flex-col justify-end p-6 md:absolute md:inset-0 md:p-10">
        {quoteEl}
        <div className="mt-5 w-full min-w-0 max-w-xl">{children}</div>
      </figcaption>
    </figure>
  );
}
