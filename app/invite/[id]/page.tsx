// app/invite/[id]/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function InvitePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    // Check if device is iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    if (isIOS) {
      // Try to open the app with custom URL scheme
      window.location.href = `echo://invite/${id}`;
    }

    // Fallback to App Store after a delay for all devices
    setTimeout(() => {
      window.location.href = 'https://apps.apple.com/us/app/echo-rank-rate-relisten/id6717572746';
    }, 2000);
  }, [id, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-xl font-bold mb-4">Opening Echo...</h1>
      <p>
        If nothing happens,{' '}
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