import EmailForm from "@/components/EmailForm";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Toaster />
      <section className="w-screen min-h-dvh grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#e9ecef]">
        <div className="md:h-full h-80 bg-[#212529] relative overflow-hidden">
          <Image
            src="/waitlist.png"
            alt="Echo App Screenshots"
            fill
            className="object-contain mt-8 md:mt-24 px-14 object-bottom"
          />
        </div>
        <main className="flex flex-col gap-8 justify-center px-6 pb-10">
          <div className="flex flex-row items-center">
            <Image
              style={{ marginLeft: "-20px" }}
              src="/Echo.png"
              alt="Echo Logo"
              width={75}
              height={75}
            />
            <h1 className="font-semibold tracking-tight text-zinc-900 text-3xl leading-tight md:text-4xl max-w-lg">
              Rank, Rate, Relive.
            </h1>
          </div>
          <p className="text-zinc-700">
            Welcome to <strong>Echo</strong>. <br />
            Rank your favorite albums, share your ratings with friends, and
            discover new music. <br />
            Join our waitlist to be notified when Echo launches.
          </p>
          <EmailForm />
        </main>
      </section>
    </>
  );
}