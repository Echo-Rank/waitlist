// app/invite/[id]/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InvitePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isAndroid = /android/i.test(userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;

    if (isIOS) {
      // Attempt to open the app using Universal Link
      window.location.href = `https://echorank.app/invite/${id}`;

      // Fallback to App Store after a delay
      setTimeout(() => {
        window.location.href = 'https://apps.apple.com/app/your-app-id';
      }, 2000);
    } else if (isAndroid) {
      // Attempt to open the app using App Link
      window.location.href = `intent://echorank.app/invite/${id}#Intent;scheme=https;package=com.utkarshuppal.Echo;end`;

      // Fallback to Play Store after a delay
      setTimeout(() => {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.utkarshuppal.Echo';
      }, 2000);
    } else {
      // For other platforms, redirect or show a message
      router.push('/waitlist');
    }
  }, [id, router]);

  return (
    <div>
      <h1>Loading...</h1>
      <p>If nothing happens, <a href="https://apps.apple.com/app/your-app-id">click here</a> to download the app.</p>
    </div>
  );
}