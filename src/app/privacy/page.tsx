import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Privacy Policy | Wayfarer",
};

const sections = [
  {
    heading: "Information We Collect",
    body: "When you create an account, we collect your name, email address, and a securely hashed version of your password (or, if you sign in with Google, basic profile information from that provider). When you list an experience, we store the details you submit. When you submit a booking request or contact form, we store what you write so a host or our team can respond to it.",
  },
  {
    heading: "How We Use Your Information",
    body: "We use your information to operate your account, connect you with hosts or travelers, respond to support requests, and improve the platform. We don't sell your personal information to third parties.",
  },
  {
    heading: "Cookies & Sessions",
    body: "Wayfarer uses a session cookie to keep you signed in. This cookie is required for the site to function and isn't used for advertising or cross-site tracking.",
  },
  {
    heading: "Third-Party Services",
    body: "We rely on a small number of third parties to run Wayfarer: a database provider to store account and listing data, and optionally Google for sign-in if you choose that option. These providers only receive the information necessary to perform their function.",
  },
  {
    heading: "Data Security",
    body: "Passwords are hashed before storage and are never stored or transmitted in plain text. Access to the underlying database is restricted and access-controlled.",
  },
  {
    heading: "Your Rights",
    body: "You can request a copy of the personal information we hold about you, ask us to correct it, or ask us to delete your account and associated data, by reaching out through our Contact page.",
  },
  {
    heading: "Children's Privacy",
    body: "Wayfarer is not directed at children under 16, and we don't knowingly collect personal information from them.",
  },
  {
    heading: "Changes to This Policy",
    body: "If this policy changes in a meaningful way, we'll update this page and adjust the date below.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader title="Privacy Policy" subtitle="Last updated: July 2026" />

        <section className="container max-w-3xl py-16">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-semibold text-foreground">
                  {section.heading}
                </h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {section.body}
                </p>
              </div>
            ))}

            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Contact Us
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Questions about this policy can be sent to{" "}
                <a
                  href={`mailto:${siteConfig.supportEmail}`}
                  className="text-primary hover:underline"
                >
                  {siteConfig.supportEmail}
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
