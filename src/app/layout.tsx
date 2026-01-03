import type { Metadata } from "next";
import { Lato, Allura } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: "400",
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} ${allura.variable} antialiasedd`}>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast: "bg-slate-800 border border-slate-700",
              title: "text-white font-bold",
              description: "text-gray-300",
            },
          }}
        />
      </body>
    </html>
  );
}
