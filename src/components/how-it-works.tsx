import Image from "next/image";
import home_link1 from "../../public/images/unnamed.webp";

export default function HowItWorks() {
  return (
    <section className="w-full mx-auto bg-zinc-800 text-white">
      <div className="flex flex-col max-w-5xl mx-auto p-5 gap-5">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-sm font-medium tracking-widest text-secondary mb-3">
              STEP 1
            </h2>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
              Create an album
            </h2>
            <span className="text-sm md:text-md text-zinc-400 leading-relaxed">
              In just a few clicks, create a wedding album, add photos and
              videos, and let guests join via QR code to upload and contribute.
            </span>
          </div>
          <div className="flex-1 mt-4">
            <Image src={home_link1} width={600} height={600} alt="" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-sm font-medium tracking-widest text-secondary mb-3">
              STEP 2
            </h2>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
              Share it with others
            </h2>
            <span className="text-sm md:text-md text-zinc-400 leading-relaxed">
              Share a link to your album or print a QR code for others to scan
              and open it. No registration or app download required!
            </span>
          </div>
          <div className="flex-1 mt-4">
            <Image src={home_link1} width={600} height={600} alt="" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-sm font-medium tracking-widest text-secondary mb-3">
              STEP 3
            </h2>
            <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4">
              See all uploads in your album
            </h2>
            <span className="text-sm md:text-md text-zinc-400 leading-relaxed">
              View all photos and videos in one place, read captions, and
              download individual files whenever you need them.
            </span>
          </div>
          <div className="flex-1 mt-4">
            <Image src={home_link1} width={600} height={600} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
