import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GoHeartFill } from "react-icons/go";

interface AnimateProps {
  trigger: boolean;
  onDone: () => void;
}

const AnimatedHeart: React.FC<AnimateProps> = ({ trigger, onDone }) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (trigger) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onDone();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [trigger, onDone]);

  if (!show) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-20">
      <GoHeartFill className="text-red-500 text-7xl animate-heart-pop" />
    </div>
  );
};

export default AnimatedHeart;
