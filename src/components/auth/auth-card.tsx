import Link from "next/link";
import { Compass } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkLabel: string;
  footerLinkHref: string;
}

export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkLabel,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <Link
        href="/"
        className="mb-6 flex items-center justify-center gap-2 text-lg font-bold text-foreground"
      >
        <Compass className="h-6 w-6 text-primary" />
        Wayfarer
      </Link>

      <Card>
        <CardHeader className="items-center text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {footerText}{" "}
        <Link
          href={footerLinkHref}
          className="font-medium text-primary hover:underline"
        >
          {footerLinkLabel}
        </Link>
      </p>
    </div>
  );
}
