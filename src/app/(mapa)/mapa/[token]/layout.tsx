import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function TokenLayout({ children }: { children: ReactNode }) {
  return children;
}
