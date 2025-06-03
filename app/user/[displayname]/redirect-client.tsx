"use client";

import { useEffect } from "react";

interface ClientRedirectProps {
  userId: string | null;
  displayname: string;
}

export default function ClientRedirect({
  userId,
  displayname,
}: ClientRedirectProps) {
  useEffect(() => {
    if (!userId) {
      // If no user ID found, redirect to App Store after a short delay
      setTimeout(() => {
        window.location.href =
          "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746";
      }, 2000);
      return;
    }

    // Attempt to open the Echo app on both iOS and Android
    window.location.href = `echo://user/${userId}`;

    // Determine device type to choose correct store link
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    // const isAndroid = /Android/.test(navigator.userAgent);

    const storeUrl = isIOS
      ? "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746"
      : // : isAndroid
        // ? "https://play.google.com/store/apps/details?id=app.echo"
        "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746";

    // Redirect to the appropriate store after a short delay
    setTimeout(() => {
      window.location.href = storeUrl;
    }, 2000);
  }, [userId, displayname]);

  // This component doesn't render anything visible
  return null;
}
