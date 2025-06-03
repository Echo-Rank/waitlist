"use client";

import { useEffect } from "react";

interface ClientRedirectProps {
  discussionId: string;
}

export default function ClientRedirect({ discussionId }: ClientRedirectProps) {
  useEffect(() => {
    // Attempt to open the Echo app using the custom URL scheme
    window.location.href = `echo://discussion/${discussionId}`;

    // Determine device type to choose correct store link
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    const storeUrl = isIOS
      ? "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746"
      : isAndroid
      ? "https://play.google.com/store/apps/details?id=app.echo"
      : "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746";

    // Fallback to the appropriate store after a short delay
    setTimeout(() => {
      window.location.href = storeUrl;
    }, 2000);
  }, [discussionId]);

  return null;
}
