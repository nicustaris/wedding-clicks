import { Lato, Allura } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/header";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/providers";

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
        <Providers>
          <Header />
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
        </Providers>
      </body>
    </html>
  );
}
