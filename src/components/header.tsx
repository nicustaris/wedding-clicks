"use client";

import MobileNavigation from "./mobile-navigation";

export default function Header() {
  return (
    <>
      <header className="flex w-full justify-between mx-auto max-w-5xl p-5">
        <h1 className="text-2xl">
          weddino
          <span className="text-secondary text-2xl">.</span>
        </h1>

        {/* Desktop navigation */}
        <nav className="text-base hidden sm:flex">
          <ul className="flex gap-3">
            <li>How it works</li>
            <li>Pricing</li>
            <li>Contanct</li>
            <li>Sign in</li>
          </ul>
        </nav>

        {/* Mobile navigation */}
        <MobileNavigation />
      </header>
    </>
  );
}
