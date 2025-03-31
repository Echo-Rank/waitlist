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
      // If no user ID found, redirect to main site after a short delay
      setTimeout(() => {
        window.location.href = "https://echorank.app";
      }, 2000);
      return;
    }

    // Check if device is iOS
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOS) {
      // Try to open the app with custom URL scheme
      window.location.href = `echo://user/${userId}`;
    }

    // Redirect to the web profile after a short delay (for all devices)
    setTimeout(() => {
      window.location.href = `https://echorank.app/user/${userId}`;
    }, 2000);
  }, [userId, displayname]);

  // This component doesn't render anything visible
  return null;
}
