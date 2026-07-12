import Link from "next/link";
import { Compass, Mail, Phone, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import {
  siteConfig,
  footerLinkGroups,
  socialLinks,
} from "@/lib/site-config";

const socialIcons = {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-accent/40">
      <div className="container py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Compass className="h-6 w-6 text-primary" />
              {siteConfig.name}
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="flex items-center gap-2 hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.supportEmail}
              </a>
              <a
                href={`tel:${siteConfig.supportPhone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.supportPhone}
              </a>
            </div>
            <div className="mt-4 flex gap-3">
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
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.heading}>
              <h3 className="text-sm font-semibold text-foreground">
                {group.heading}
              </h3>
              <ul className="mt-3 space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </p>
          <p>Built with Next.js &amp; TypeScript.</p>
        </div>
      </div>
    </footer>
  );
}
