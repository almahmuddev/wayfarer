import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Help & FAQ | Wayfarer",
};

const faqGroups = [
  {
    heading: "Booking",
    items: [
      {
        question: "How do I book an experience?",
        answer:
          "Open any listing on the Explore page, choose a start date and group size, and submit a request. Your host confirms availability and final details directly with you.",
      },
      {
        question: "Do I need an account to browse experiences?",
        answer:
          "No — anyone can browse and view full experience details. You'll need an account to submit a booking request or list your own experience.",
      },
      {
        question: "Is payment handled through Wayfarer?",
        answer:
          "Right now, payment is arranged directly between you and your host after your booking request is confirmed. Wayfarer doesn't process payments itself yet.",
      },
      {
        question: "How do I cancel or change a booking request?",
        answer:
          "Reach out to your host directly, or contact our support team and we'll help coordinate the change.",
      },
    ],
  },
  {
    heading: "Hosting",
    items: [
      {
        question: "How do I list my own experience?",
        answer:
          "Create an account, then choose \"Add Experience\" from the menu. Fill in the details and submit — it goes live immediately unless you choose to save it as a draft.",
      },
      {
        question: "Can I edit an experience after publishing?",
        answer:
          "Not yet from your dashboard — that's on our roadmap. For now, delete the listing from \"My Listings\" and create a new one if details need to change.",
      },
      {
        question: "Who can see my listing?",
        answer:
          "Published experiences are visible to everyone on the Explore page and via direct link. Draft listings are only visible to you.",
      },
    ],
  },
  {
    heading: "Account & Support",
    items: [
      {
        question: "What if I have an issue with a host or traveler?",
        answer:
          "Contact our support team through the Contact page with details, and we'll help sort it out.",
      },
      {
        question: "How do I delete my account?",
        answer:
          "Reach out through the Contact page and we'll take care of it for you.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Help & FAQ"
          subtitle="Answers to the questions we hear most."
        />

        <section className="container max-w-3xl py-16">
          <div className="space-y-10">
            {faqGroups.map((group) => (
              <div key={group.heading}>
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  {group.heading}
                </h2>
                <Accordion items={group.items} />
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center gap-3 rounded-xl border border-dashed border-border py-10 text-center">
            <p className="font-medium text-foreground">Still have questions?</p>
            <p className="text-sm text-muted-foreground">
              Our team is happy to help with anything not covered above.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
