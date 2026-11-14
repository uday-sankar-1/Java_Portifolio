"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

type Ctx = { go: (href: string) => void };
const VTContext = createContext<Ctx | null>(null);

type VTDocument = Document & { startViewTransition?: (cb: () => Promise<void> | void) => unknown };

/**
 * Wraps router.push in the View Transitions API so route changes cross-fade.
 * Falls back to a normal navigation when unsupported or when reduced motion is requested.
 */
export function ViewTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const resolver = useRef<(() => void) | null>(null);

  useEffect(() => {
    resolver.current?.();
    resolver.current = null;
  }, [pathname]);

  const go = useCallback(
    (href: string) => {
      const doc = document as VTDocument;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!doc.startViewTransition || reduce) return router.push(href);
      doc.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            resolver.current = resolve;
            router.push(href);
            setTimeout(resolve, 1200); // never leave the page frozen
          }),
      );
    },
    [router],
  );

  return <VTContext.Provider value={{ go }}>{children}</VTContext.Provider>;
}

export function TransitionLink({ href, onClick, ...props }: ComponentPropsWithoutRef<typeof Link>) {
  const ctx = useContext(VTContext);
  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        const plain = !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0;
        if (ctx && plain && !e.defaultPrevented && typeof href === "string") {
          e.preventDefault();
          ctx.go(href);
        }
      }}
      {...props}
    />
  );
}
