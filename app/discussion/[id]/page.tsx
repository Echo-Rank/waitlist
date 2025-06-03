import { Metadata } from "next";
import ClientRedirect from "./redirect-client";

interface Props {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Echo Discussion",
  description: "echorank.app",
  openGraph: {
    title: "Echo Discussion",
    description: "echorank.app",
    images: [
      {
        url: "https://echorank.app/Echo.png",
        width: 800,
        height: 418,
        alt: "Echo Discussion",
      },
    ],
    siteName: "Echo",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echo Discussion",
    description: "echorank.app",
    images: ["https://echorank.app/Echo.png"],
  },
  other: {
    "theme-color": "#000000",
  },
};

export default function DiscussionPage({ params }: Props) {
  const { id } = params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <ClientRedirect discussionId={id} />
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
