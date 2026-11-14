"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { NavItem } from "./header";

export function MobileNav({
  nav,
  resumeHref,
  resumeName,
}: {
  nav: NavItem[];
  resumeHref: string;
  resumeName: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted lg:hidden"
      >
        <Menu className="size-4" aria-hidden />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <Dialog.Content
          data-lenis-prevent
          className="fixed inset-y-0 right-0 z-50 flex w-72 max-w-[85vw] flex-col gap-2 border-l border-border bg-elevated p-6"
        >
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <Dialog.Description className="sr-only">
            Jump to a section of the page.
          </Dialog.Description>
          <Dialog.Close
            aria-label="Close menu"
            className="mb-4 ml-auto inline-flex size-10 items-center justify-center rounded-full border border-border"
          >
            <X className="size-4" aria-hidden />
          </Dialog.Close>
          {nav.map((n) => (
            <Link
              key={n.id}
              href={`/#${n.id}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-lg text-fg hover:bg-accent-soft"
            >
              {n.label}
            </Link>
          ))}
          <Button asChild className="mt-4">
            <a href={resumeHref} download={resumeName}>
              <Download className="size-4" aria-hidden /> Download resume
            </a>
          </Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
