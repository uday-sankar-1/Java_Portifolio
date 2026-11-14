"use client";

import { LazyMotion } from "motion/react";
import dynamic from "next/dynamic";
import { ThemeProvider } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { RevealController } from "./reveal-controller";
import { ViewTransitionProvider } from "./view-transition";

// Desktop-only polish is loaded after the page is interactive, so it never competes with LCP/TBT.
const SmoothScroll = dynamic(() => import("./smooth-scroll").then((m) => m.SmoothScroll), {
  ssr: false,
});
const Cursor = dynamic(() => import("./cursor").then((m) => m.Cursor), { ssr: false });

export function Providers({ children }: { children: ReactNode }) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setIdle(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      themes={["dark", "light"]}
      enableSystem={false}
      disableTransitionOnChange
    >
      <LazyMotion features={() => import("@/lib/motion-features").then((r) => r.default)} strict>
        <ViewTransitionProvider>
          <RevealController />
          {idle ? (
            <>
              <SmoothScroll />
              <Cursor />
            </>
          ) : null}
          {children}
        </ViewTransitionProvider>
      </LazyMotion>
    </ThemeProvider>
  );
}
