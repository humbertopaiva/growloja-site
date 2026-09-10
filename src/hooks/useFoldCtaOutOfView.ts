"use client";

import { useEffect, useState } from "react";

export function useFoldCtaOutOfView() {
  const [outOfView, setOutOfView] = useState(false);

  useEffect(() => {
    const target = document.querySelector("[data-fold-cta]");
    if (!target) {
      setOutOfView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setOutOfView(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return outOfView;
}
