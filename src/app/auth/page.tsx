"use client";

import SignUp from "@/components/signup";
import SignIn from "@/components/signin";
import { useState } from "react";

export default function Authentication() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  return (
    <div className="flex justify-center w-full max-w-5xl mx-auto p-5">
      <div className="w-full max-w-120 p-5">
        {mode !== "login" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}
