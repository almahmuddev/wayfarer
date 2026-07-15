import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Terms of Service | Wayfarer",
};

const sections = [
  {
    heading: "Acceptance of Terms",
    body: "By creating an account or using Wayfarer, you agree to these terms. If you don't agree with them, please don't use the platform.",
  },
  {
    heading: "Accounts",
    body: "You're responsible for keeping your account credentials secure and for anything that happens under your account. You must provide accurate information when registering.",
  },
  {
    heading: "Listing an Experience",
    body: "If you list an experience as a host, you're responsible for the accuracy of the information you provide, including price, availability, and description. Wayfarer doesn't verify the details of individual listings beyond basic host verification.",
  },
  {
    heading: "Booking Requests",
    body: "Booking requests submitted through Wayfarer are a starting point for coordination between traveler and host — they aren't a guaranteed reservation until the host confirms. Payment and final logistics are arranged directly between traveler and host.",
  },
  {
    heading: "Conduct",
    body: "You agree not to use Wayfarer to post false or misleading listings, harass other users, or attempt to circumvent the platform's security measures.",
  },
  {
    heading: "Content Ownership",
    body: "You retain ownership of the content you submit (listing descriptions, images, messages), but grant Wayfarer the right to display that content on the platform.",
  },
  {
    heading: "Limitation of Liability",
    body: "Wayfarer facilitates connections between travelers and hosts but isn't a party to the arrangements made between them. We aren't liable for the conduct of any host or traveler, or for the outcome of any booked experience.",
  },
  {
    heading: "Termination",
    body: "We may suspend or terminate accounts that violate these terms. You may delete your account at any time by contacting us.",
  },
  {
    heading: "Changes to These Terms",
    body: "We may update these terms from time to time. Continued use of Wayfarer after a change means you accept the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader title="Terms of Service" subtitle="Last updated: July 2026" />

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
                Questions about these terms can be sent to{" "}
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
