import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog | Wayfarer",
  description: "Trip reports and planning guides from the Wayfarer team.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageHeader
          title="Stories from the Trail"
          subtitle="Trip reports and planning guides for the experiences you'll find on Wayfarer."
        />

        <section className="container py-16">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
                  <div className="relative aspect-[3/2] w-full">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 33vw, 100vw"
                    />
                  </div>
                  <CardContent className="p-5">
                    <h2 className="line-clamp-2 font-semibold text-foreground">
                      {post.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {formatDate(post.publishedAt)} &middot; {post.readTime}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
