"use client";

import { useState } from "react";
import { LuMenu } from "react-icons/lu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
        <div className="flex items-center sm:hidden">
          <button onClick={() => setIsMenuOpen(true)}>
            <LuMenu className="text-xl" />
          </button>
        </div>
      </header>
    </>
  );
}
