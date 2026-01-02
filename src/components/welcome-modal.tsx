import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface WelcomeModalProps {
  isWelcomeModalOpen: boolean;
}

export default function WelcomeModal(isWelcomeModalOpen: WelcomeModalProps) {
  return (
    <div className="fixed inset-0">
      <div className="fixed w-full h-[200px] bottom-0 left-0 right-0">
        <div className="flex flex-col relative items-center h-full space-y-4 bg-black/90">
          <h2 className="text-secondary text-xl mt-3">
            Welcome! <span className="text-white">What's your name?</span>
          </h2>
          <span className="text-gray-400 text-sm">
            Please enter your name so we can personalize your experience.
          </span>
          <Input
            placeholder="Enter your name"
            className="placeholder-gray-300! text-white"
          />
          <Button variant="outline" className="text-white">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
