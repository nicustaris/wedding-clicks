import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface WelcomeModalProps {
  isWelcomeModalOpen: boolean;
}

export default function WelcomeModal(isWelcomeModalOpen: WelcomeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="fixed w-full h-[250px] bottom-0 left-0 right-0">
        <div className="flex flex-col relative items-center h-full space-y-4 bg-white p-3 rounded-t-sm">
          <h2 className="text-black text-xl mt-3">
            Welcome! <span className="text-secondary">What's your name?</span>
          </h2>
          <span className="text-gray-500 text-sm">
            Please enter your name so we can personalize your experience.
          </span>
          <Input
            placeholder="Enter your name"
            className="placeholder-black! text-white text-sm py-6 border-black max-w-[400]"
          />
          <Button variant="outline" className="text-white px-5 py-4">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
