"use client"
import Link from "next/link";
import Image from "next/image";

export default function Privacy() {
  return (
    <section className="w-screen min-h-dvh bg-[#e9ecef]">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-4 mb-8">
          <Image
            src="/Echo.png"
            alt="Echo Logo"
            width={50}
            height={50}
            className="-ml-3"
          />
          <h1 className="font-semibold tracking-tight text-zinc-900 text-3xl">
            Privacy Policy
          </h1>
        </div>

        <div className="prose prose-zinc max-w-none">
          <p className="text-sm text-zinc-600">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">1. Introduction</h2>
          <p className="text-zinc-700">
            Welcome to Echo ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience when using our music ranking and social platform.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">2. Information We Collect</h2>
          <ul className="list-disc pl-5 text-zinc-700">
            <li>Account Information: Name, email, phone number, profile picture, and location</li>
            <li>Music Service Data: Spotify and Apple Music connection data and listening history</li>
            <li>User Content: Rankings, reviews, and other content you create</li>
            <li>Usage Data: How you interact with our app, including features used and time spent</li>
            <li>Device Information: Device type, OS version, and unique identifiers</li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc pl-5 text-zinc-700">
            <li>Provide and improve our services</li>
            <li>Personalize your experience</li>
            <li>Process your music rankings and social interactions</li>
            <li>Send important notifications about your account</li>
            <li>Analyze usage patterns to improve our platform</li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">4. Data Sharing and Disclosure</h2>
          <p className="text-zinc-700">We share your information with:</p>
          <ul className="list-disc pl-5 text-zinc-700">
            <li>Other Echo users (based on your privacy settings)</li>
            <li>Service providers who assist our operations</li>
            <li>Music streaming partners (Spotify/Apple Music) as necessary</li>
            <li>Law enforcement when required by law</li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">5. Your Privacy Rights</h2>
          <p className="text-zinc-700">You have the right to:</p>
          <ul className="list-disc pl-5 text-zinc-700">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Object to data processing</li>
            <li>Export your data</li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">6. Data Security</h2>
          <p className="text-zinc-700">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">7. Children's Privacy</h2>
          <p className="text-zinc-700">
            Our services are not intended for users under the age of 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">8. Changes to This Policy</h2>
          <p className="text-zinc-700">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">9. Contact Us</h2>
          <p className="text-zinc-700">
            If you have any questions about this Privacy Policy, please contact us at:{" "}
            <Link href="mailto:privacy@echorank.app" className="text-zinc-900 underline">
              privacy@echorank.app
            </Link>
          </p>

          <div className="mt-12 pt-8 border-t border-zinc-200">
            <Link href="/" className="text-zinc-900 hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 