import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";

import { LuMenu } from "react-icons/lu";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="flex w-full bg-white text-background">
      <div className="w-full flex flex-col">
        <Header />
        <Hero />
        <HowItWorks />
      </div>
    </div>
  );
}
