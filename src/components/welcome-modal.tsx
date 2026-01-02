import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WelcomeModalProps {
  className?: string;
  isWelcomeModalOpen: boolean;
}

export default function WelcomeModal({
  isWelcomeModalOpen,
}: WelcomeModalProps) {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent className="fixed flex flex-col translate-y-0!">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Welcome! What’s your name?
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600 mb-4">
            Please enter your name so we can personalize your experience.
          </DialogDescription>
        </DialogHeader>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <button className="w-full bg-primary text-white p-3 rounded-md hover:bg-secondary transition-colors">
          Save
        </button>
      </DialogContent>
    </Dialog>
  );
}
