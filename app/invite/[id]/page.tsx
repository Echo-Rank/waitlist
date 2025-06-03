// app/invite/[id]/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function InvitePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    // Attempt to open the Echo app on both iOS and Android
    window.location.href = `echo://invite/${id}`;

    // Determine device type to select appropriate store link
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    const storeUrl = isIOS
      ? "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746"
      : isAndroid
      ? "https://play.google.com/store/apps/details?id=app.echo"
      : "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746";

    // Fallback to the appropriate store after a delay
    setTimeout(() => {
      window.location.href = storeUrl;
    }, 2000);
  }, [id, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-xl font-bold mb-4">Opening Echo...</h1>
      <p>
        If nothing happens,{" "}
        <a
          href="https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746"
          className="text-blue-600 underline"
        >
          download Echo from the App Store
        </a>
      </p>
    </div>
  );
}
