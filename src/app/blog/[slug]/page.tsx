import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { blogPosts } from "@/lib/data/blog";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found | Wayfarer" };
  return { title: `${post.title} | Wayfarer`, description: post.excerpt };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  return (
    <>
      <Navbar />
      <main id="main-content" className="container max-w-3xl py-10">
        <Link
          href="/blog"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden rounded-xl">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          {post.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          By {post.author} &middot; {formatDate(post.publishedAt)} &middot;{" "}
          {post.readTime}
        </p>

        <div className="mt-8 space-y-4">
          {post.content.map((block, i) => {
            if (block.type === "heading") {
              return (
                <h2
                  key={i}
                  className="pt-2 text-xl font-semibold text-foreground"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="space-y-1.5">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {block.text}
              </p>
            );
          })}
        </div>

        <div className="mt-14 border-t border-border pt-8">
          <p className="text-sm font-medium text-foreground">Read next</p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherPosts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-lg border border-border p-4 transition-colors hover:border-primary"
              >
                <p className="line-clamp-2 text-sm font-medium text-foreground">
                  {p.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.readTime}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
