"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function MobileNavigation() {
  return (
    <div className="sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="rounded-full border border-zinc-200 bg-white shadow-sm hover:bg-zinc-50"
          >
            {/* override shadcn icon sizing */}
            <Menu className="!h-6 !w-6 text-zinc-900" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-80 border-r border-zinc-200dsa bg-white p-0 text-zinc-900"
        >
          <SheetHeader className="border-b border-zinc-200 px-5 py-4">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>

            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-zinc-900 text-white grid place-items-center font-semibold">
                w
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">weddino</div>
                <div className="text-xs text-zinc-500">Menu</div>
              </div>
            </div>
          </SheetHeader>

          <nav className="px-3 py-3">
            <MobileLink href="/" label="Home" />
            <MobileLink href="/about" label="About" />
            <MobileLink href="/contact" label="Contact" />

            <div className="my-3 h-px bg-zinc-200" />

            <MobileLink href="/pricing" label="Pricing" />
            <MobileLink href="/signin" label="Sign in" />
          </nav>

          <div className="mt-auto border-t border-zinc-200 px-5 py-4 text-xs text-zinc-500">
            Share photos. Keep memories.
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-100 active:bg-zinc-200"
    >
      {label}
      <span className="text-zinc-400">→</span>
    </Link>
  );
}
