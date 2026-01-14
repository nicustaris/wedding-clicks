import { RiCloseFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";

interface WelcomeModalProps {
  isWelcomeModalOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({
  isWelcomeModalOpen,
  onClose,
}: WelcomeModalProps) {
  const [guestName, setGuestName] = useState<string>("");
  const [animateIn, setAnimateIn] = useState<boolean>(false);

  useEffect(() => {
    if (isWelcomeModalOpen) {
      requestAnimationFrame(() => setAnimateIn(true));
    } else {
      setAnimateIn(false);
    }
  }, []);

  const handleSubmit = () => {
    // Check if guest provided the name
    const name = guestName.trim();
    if (!name) {
      toast.error("Error", {
        description: "Please provide your name",
      });
      return;
    }

    // Save to localStore the guest name
    localStorage.setItem("guestName", name);
    onClose();
  };

  if (!isWelcomeModalOpen) return null;
  return (
    <div onClick={onClose} className="fixed inset-0">
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed w-full bottom-0 left-0 right-0"
      >
        <div
          className={`flex flex-col relative items-center h-full py-5 space-y-3 bg-black/85 shadow-xl p-3 rounded-t-sm transform transition-transform duration-1000 ease-out ${
            animateIn ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button onClick={onClose} className="absolute top-2 right-3 p-1">
            <RiCloseFill
              className="text-white hover:text-slate-200"
              size={22}
            />
          </button>
          <h2 className="text-secondary text-xl mt-3">
            Welcome! <span className="text-white">What's your name?</span>
          </h2>
          <span className="text-slate-300 text-sm">
            Please enter your name so we can personalize your experience.
          </span>
          <Input
            onChange={(e) => setGuestName(e.target.value)}
            value={guestName}
            placeholder="Enter your name"
            className="placeholder-white! text-white py-6 border-gray-300 max-w-[400] mt-3"
          />
          <Button
            onClick={handleSubmit}
            variant="outline"
            className="text-white px-7 text-sm font-semibold py-4 bg-slate hover:bg-slate-700 hover:text-white mt-4 mb-3 animate-bounce"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
