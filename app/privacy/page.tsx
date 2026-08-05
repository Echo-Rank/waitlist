import Link from "next/link";
import { PageShell } from "@/components/site";

export default function Privacy() {
  return (
    <PageShell title="Privacy Policy" meta="Last updated: March 25, 2025">
      <h2>Introduction</h2>
      <p>
        Welcome to Echo (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or
        &ldquo;us&rdquo;). Echo is a social platform for ranking, reviewing, and
        discovering music. This policy explains what information we collect, how
        we use it, and the choices you have. By using Echo, you agree to the
        practices described here.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>
          <strong>Account Information:</strong> name, username, email, phone
          number, profile picture, and general location
        </li>
        <li>
          <strong>Music Data:</strong> your Apple Music connection, listening
          activity, and library details you choose to sync
        </li>
        <li>
          <strong>Content You Create:</strong> rankings, scores, reviews,
          comments, lists, collections, photos, and anything else you share on
          Echo
        </li>
        <li>
          <strong>Activity &amp; Usage Data:</strong> how you use the app,
          including features used, content you interact with, searches, and time
          spent
        </li>
        <li>
          <strong>Device Information:</strong> device type, OS version,
          language, and identifiers
        </li>
        <li>
          <strong>Information from Partners:</strong> information we receive
          from services you connect to Echo or from partners we work with
        </li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>Provide, personalize, and improve Echo</li>
        <li>Power rankings, recommendations, charts, and community features</li>
        <li>Build new features, products, and services</li>
        <li>
          Create insights and trends from community activity, such as charts and
          listening statistics
        </li>
        <li>Keep Echo safe, secure, and free of spam</li>
        <li>
          Communicate with you about your account and what&rsquo;s new on Echo
        </li>
      </ul>

      <h2>How We Share &amp; License Information</h2>
      <p>
        Music is better shared — that&rsquo;s the whole idea behind Echo.
      </p>
      <p>Here&rsquo;s how information moves through the platform:</p>
      <ul>
        <li>
          <strong>With other users:</strong> your profile, rankings, reviews,
          and activity, based on your privacy settings
        </li>
        <li>
          <strong>With service providers:</strong> companies that help us run
          Echo, like hosting, analytics, and communications
        </li>
        <li>
          <strong>With partners:</strong> we may share or license information
          collected on Echo and insights derived from it — such as charts,
          rankings, and listening trends — to improve Echo, support how we
          operate, and build new music experiences; where practical, we use
          aggregated or de-identified data that doesn&rsquo;t identify you
          personally
        </li>
        <li>
          <strong>For legal reasons:</strong> when required by law or to protect
          Echo and our users
        </li>
        <li>
          <strong>As part of a business change:</strong> if Echo is involved in
          a merger, acquisition, or sale, information may transfer as part of
          that transaction
        </li>
      </ul>

      <h2>Your Content</h2>
      <p>
        You own what you create on Echo. By posting, you give us permission to
        host, display, adapt, and share your content and license it as part of
        operating, promoting, and improving Echo — for example, showing your
        review to friends, featuring a great ranking, or including your scores
        in community charts. The full license is in our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>

      <h2>Your Choices &amp; Rights</h2>
      <p>You can:</p>
      <ul>
        <li>
          <strong>Access and update</strong> your profile and account
          information anytime
        </li>
        <li>
          <strong>Control visibility</strong> of your activity through your
          privacy settings
        </li>
        <li>
          <strong>Delete</strong> your account and associated data from Settings
        </li>
        <li>
          <strong>Ask us</strong> to access, correct, or export your data by
          contacting us
        </li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>
        Echo connects with Apple Music to search music, sync your listening, and
        power playback features. Apple&rsquo;s own terms and privacy policy
        apply to their services. We also rely on trusted providers for things
        like infrastructure, analytics, and notifications.
      </p>

      <h2>Data Retention &amp; Security</h2>
      <p>
        We keep your information while your account is active and as long as
        needed to run Echo, comply with the law, and resolve disputes. We use
        industry-standard safeguards to protect your data. Aggregated or
        de-identified information may be retained and used after your account is
        deleted.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this policy as Echo evolves. We&rsquo;ll post updates here
        and, for significant changes, let you know in the app. Continuing to use
        Echo after an update means you accept the revised policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Contact us at{" "}
        <Link href="mailto:utkarsh@echorank.app">utkarsh@echorank.app</Link>.
      </p>
    </PageShell>
  );
}
