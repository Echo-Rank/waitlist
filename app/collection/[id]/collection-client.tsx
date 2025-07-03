"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CollectionClientRedirectProps {
  collectionId: string;
}

export default function CollectionClientRedirect({
  collectionId,
}: CollectionClientRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    // Attempt to open the Echo app on both iOS and Android
    window.location.href = `echo://collection/${collectionId}`;

    // Determine device type to select appropriate store link
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    const storeUrl = isIOS
      ? "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746"
      : isAndroid
      ? "https://play.google.com/store/apps/details?id=com.utkarshuppal.Echo"
      : "https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746";

    // Fallback to the appropriate store after a delay
    setTimeout(() => {
      window.location.href = storeUrl;
    }, 2000);
  }, [collectionId, router]);

  return null;
}
