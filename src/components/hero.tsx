import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="w-full mx-auto">
      <div className="flex flex-col md:flex-row mx-auto max-w-5xl p-5 my-15">
        <div className="flex flex-col items-center justify-center space-y-5 md:flex-1">
          <h1 className="text-4xl font-bold md:text-5xl">
            Easily Collect & Share Event Photos and Videos
          </h1>
          <p className="text-gray-600">
            We made collecting photos and videos easy & simple. No app, no
            hassle! Just set up an album and let others contribute!
          </p>
          <Button className="w-full max-w-xl cursor-pointer h-10 rounded-2xl">
            Create Your Album
          </Button>
        </div>
        <div className="md:flex-1">image</div>
      </div>
    </section>
  );
}
