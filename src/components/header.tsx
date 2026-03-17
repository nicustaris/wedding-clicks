"use client";

import Link from "next/link";
import MobileNavigation from "./mobile-navigation";

export default function Header() {
  return (
    <>
      <header className="flex w-full justify-between mx-auto max-w-5xl p-5">
        <h1 className="text-2xl text-zinc-800 cursor-pointer">
          weddino
          <span className="text-secondary text-2xl">.</span>
        </h1>

        {/* Desktop navigation */}
        <nav className="text-base hidden sm:flex">
          <ul className="flex gap-3">
            <NavLink href="how-it-works" label="How it works" />
            <NavLink href="how-it-works" label="Pricing" />
            <NavLink href="how-it-works" label="Contact" />
            <NavLink href="/auth" label="Sign in" />
          </ul>
        </nav>

        {/* Mobile navigation */}
        <MobileNavigation />
      </header>
    </>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <li className="cursor-pointer">
      <Link href={href}>{label}</Link>
    </li>
  );
}
