import { Mail, Phone, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig, socialLinks } from "@/lib/site-config";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";

export const metadata = {
  title: "Contact | Wayfarer",
  description: "Get in touch with the Wayfarer team.",
};

const socialIcons = { Instagram, Facebook, Twitter, Linkedin } as const;

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          title="Get in Touch"
          subtitle="Questions about a trip, a listing, or partnering with us? We read every message."
        />

        <section className="container py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email</p>
                      <a
                        href={`mailto:${siteConfig.supportEmail}`}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {siteConfig.supportEmail}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Phone</p>
                      <a
                        href={`tel:${siteConfig.supportPhone.replace(/\s/g, "")}`}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {siteConfig.supportPhone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Response time
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Usually within 2 business days
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-foreground">Follow along</p>
                  <div className="mt-3 flex gap-3">
                    {socialLinks.map((social) => {
                      const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          aria-label={social.label}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
