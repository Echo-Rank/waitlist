import Link from "next/link";
import { PageShell } from "@/components/site";

export default function Terms() {
  return (
    <PageShell title="Terms of Service" meta="Last updated: January 1, 2025">
      <h2>Agreement</h2>
      <p>
        These Terms of Service are an agreement between you and Echo. By
        creating an account or using Echo, you agree to these Terms and to our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Your Account</h2>
      <p>
        You must be at least 13 years old to use Echo. Keep your account
        information accurate and your credentials secure — you&rsquo;re
        responsible for activity on your account.
      </p>

      <h2>Your Content</h2>
      <p>
        You own the content you create on Echo. By sharing content — rankings,
        scores, reviews, comments, lists, images, and anything else you post —
        you grant Echo a worldwide, non-exclusive, royalty-free, transferable,
        and sublicensable license to use, host, store, reproduce, adapt,
        publish, display, distribute, and license that content in connection
        with operating, promoting, and improving Echo and building new products
        and services, including in aggregated or de-identified form. This is
        what lets us do things like show your reviews to other users, include
        your rankings in community charts, and feature standout content.
      </p>

      <h2>Data &amp; Insights</h2>
      <p>
        Echo&rsquo;s community generates unique signals about music. You agree
        that we may collect, use, share, and license information and insights as
        described in our <Link href="/privacy">Privacy Policy</Link>, including
        in aggregated or de-identified form.
      </p>

      <h2>Acceptable Use</h2>
      <p>
        Keep Echo a good place to talk about music. Don&rsquo;t do any of the
        following.
      </p>
      <ul>
        <li>
          <strong>Harass, abuse, or impersonate</strong> other users
        </li>
        <li>
          <strong>Post unlawful content</strong> or content that infringes
          others&rsquo; rights
        </li>
        <li>
          <strong>Scrape, copy, or resell</strong> Echo&rsquo;s data or content
          without permission
        </li>
        <li>
          <strong>Interfere</strong> with the operation or security of the
          service
        </li>
      </ul>

      <h2>Echo+</h2>
      <p>
        Some features are part of Echo+, a paid subscription billed through your
        app store account. Subscriptions renew automatically unless you cancel
        in your app store settings.
      </p>

      <h2>Termination</h2>
      <p>
        You can delete your account anytime in Settings. We may suspend or
        terminate accounts that violate these Terms or harm the community.
      </p>

      <h2>Disclaimers &amp; Liability</h2>
      <p>
        Echo is provided &ldquo;as is.&rdquo; To the fullest extent permitted by
        law, we disclaim warranties and aren&rsquo;t liable for indirect,
        incidental, or consequential damages arising from your use of the
        service.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update these Terms as Echo evolves. We&rsquo;ll post updates here
        and, for significant changes, let you know in the app. Continuing to use
        Echo after an update means you accept the revised Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Contact us at{" "}
        <Link href="mailto:utkarsh@echorank.app">utkarsh@echorank.app</Link>.
      </p>
    </PageShell>
  );
}
