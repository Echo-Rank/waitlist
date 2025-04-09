"use client";
import Image from "next/image";
import Link from "next/link";

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
          <p className="text-sm text-zinc-600">Last Updated: March 25, 2025</p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            1. Introduction
          </h2>
          <p className="text-zinc-700">
            Thank you for being a user of Echo ("we," "our," or "us"). We
            prioritize the protection of your data and are committed to
            transparency in our data handling practices. The information we
            collect is used specifically to enhance app functionality, improve
            user experience, and maintain service quality.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            2. Definitions
          </h2>
          <ul className="list-disc pl-5 text-zinc-700">
            <li>
              <strong>Account:</strong> Your unique account created to access
              our Service
            </li>
            <li>
              <strong>Application:</strong> Echo, our music ranking and social
              platform
            </li>
            <li>
              <strong>Device:</strong> Any device that can access the Service
              (computer, mobile phone, tablet)
            </li>
            <li>
              <strong>Personal Data:</strong> Information relating to an
              identified or identifiable individual
            </li>
            <li>
              <strong>Service Provider:</strong> Third parties processing data
              on our behalf (including Supabase and Google Cloud Platform)
            </li>
            <li>
              <strong>Usage Data:</strong> Data collected automatically through
              use of the Service
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            3. Information We Collect
          </h2>
          <ul className="list-disc pl-5 text-zinc-700">
            <li>
              Account Information: Name, email, phone number, profile picture,
              and location
            </li>
            <li>
              Music Service Data: Spotify and Apple Music connection data and
              listening history
            </li>
            <li>
              User Content: Rankings, reviews, and other content you create
            </li>
            <li>
              Usage Data: How you interact with our app, including features used
              and time spent
            </li>
            <li>
              Device Information: Device type, OS version, and unique
              identifiers
            </li>
            <li>
              With your permission: Location data, contacts (phone book), and
              photos
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            4. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 text-zinc-700">
            <li>Provide and improve our services</li>
            <li>Personalize your experience</li>
            <li>Process your music rankings and social interactions</li>
            <li>Send important notifications about your account</li>
            <li>Analyze usage patterns to improve our platform</li>
            <li>Maintain and optimize our infrastructure</li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            5. Data Storage and Processing
          </h2>
          <p className="text-zinc-700">
            We use Supabase for database services and Google Cloud Platform
            (GCP) for our backend infrastructure. Your data may be processed or
            stored in countries outside your own. We ensure all transfers are
            protected using appropriate safeguards and security measures.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            6. Data Sharing and Disclosure
          </h2>
          <p className="text-zinc-700">We share your information with:</p>
          <ul className="list-disc pl-5 text-zinc-700">
            <li>Other Echo users (based on your privacy settings)</li>
            <li>Service providers (Supabase, GCP) who assist our operations</li>
            <li>Music streaming partners (Spotify/Apple Music) as necessary</li>
            <li>Law enforcement when required by law</li>
            <li>Business partners (with your explicit consent)</li>
            <li>During business transfers or acquisitions</li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            7. Your Privacy Rights
          </h2>
          <p className="text-zinc-700">You have the right to:</p>
          <ul className="list-disc pl-5 text-zinc-700">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Delete your account and data</li>
            <li>Object to data processing</li>
            <li>Export your data</li>
            <li>Withdraw consent at any time</li>
          </ul>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            8. Data Security
          </h2>
          <p className="text-zinc-700">
            We implement industry-standard security measures through our service
            providers (Supabase and GCP) to protect your personal information
            against unauthorized access, alteration, disclosure, or destruction.
            However, no method of transmission over the internet is 100% secure.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            9. Data Retention
          </h2>
          <p className="text-zinc-700">
            We retain your data only as long as necessary to fulfill the
            purposes outlined in this policy or to comply with legal
            obligations. You can request deletion of your account and associated
            data at any time.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            10. Children's Privacy
          </h2>
          <p className="text-zinc-700">
            Our services are not intended for users under the age of 13. We do
            not knowingly collect personal information from children under 13.
            If we become aware of such data, we will delete it immediately.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            11. Changes to This Policy
          </h2>
          <p className="text-zinc-700">
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes via email or in-app notification and
            update the "Last Updated" date at the top of this page.
          </p>

          <h2 className="text-xl font-semibold text-zinc-900 mt-8 mb-4">
            12. Contact Us
          </h2>
          <p className="text-zinc-700">
            If you have any questions about this Privacy Policy, please contact
            us at:{" "}
            <Link
              href="mailto:utkarsh@echorank.app"
              className="text-zinc-900 underline"
            >
              utkarsh@echorank.app
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
