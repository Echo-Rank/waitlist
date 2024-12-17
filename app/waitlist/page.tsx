"use client"
import EmailForm from "@/components/EmailForm";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaXTwitter, FaInstagram, FaTiktok } from "react-icons/fa6";

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);


  return (
    <>
      <section className="w-screen min-h-dvh grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#e9ecef] relative">
        <div className="md:h-full h-80 bg-[#212529] relative overflow-hidden">
          <Image
            src="/waitlist.png"
            alt="Echo App Screenshots"
            fill
            className="object-contain mt-8 md:mt-0 sm:mt-0 px-14 object-bottom"
          />
        </div>
        <main className="flex flex-col gap-8 justify-center px-6 pb-10">
          <div className="md:hidden flex justify-end space-x-4 mt-4">
          <Link href="https://tiktok.com/@echodotapp" target="_blank">
              <FaTiktok className="text-zinc-900 w-6 h-6" />
            </Link>
            <Link href="https://twitter.com/echodotapp" target="_blank">
              <FaXTwitter className="text-zinc-900 w-6 h-6" />
            </Link>
            <Link href="https://instagram.com/echodotapp" target="_blank">
              <FaInstagram className="text-zinc-900 w-6 h-6" />
            </Link>
          </div>
          <div className="flex flex-row items-center">
            <Image
              style={{ marginLeft: "-20px" }}
              src="/Echo.png"
              alt="Echo Logo"
              width={ 75}
              height={75}
            />
            <h1 className="font-semibold tracking-tight text-zinc-900 text-3xl leading-tight md:text-4xl max-w-lg">
              Rank, Rate, Relisten.
            </h1>
          </div>
          <p className="text-zinc-700">
            Welcome to <strong>Echo</strong>.
            <br />
            Rank your favorite albums, share your ratings with friends, and
            discover new music.
            <br />
            Join our waitlist to be notified when Echo launches.
          </p>
          <EmailForm />
        </main>
        <div className="hidden md:flex justify-end space-x-4 absolute top-4 right-4">
          <Link href="https://twitter.com/echodotapp" target="_blank">
            <FaXTwitter className="text-zinc-900 w-6 h-6" />
          </Link>
          <Link href="https://instagram.com/echodotapp" target="_blank">
            <FaInstagram className="text-zinc-900 w-6 h-6" />
          </Link>
          <Link href="https://tiktok.com/@echodotapp" target="_blank">
            <FaTiktok className="text-zinc-900 w-6 h-6" />
          </Link>
        </div>
      </section>
      <Toaster
        position={isMobile ? "bottom-center" : "top-center"}
      />
    </>
  );
}
