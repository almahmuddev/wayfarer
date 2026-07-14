import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Plus } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ManageExperiencesTable } from "@/components/experiences/manage-experiences-table";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models/Experience";
import { User } from "@/models/User";
import type { ManageExperienceItem } from "@/types/experience";

export const metadata = {
  title: "Manage Experiences | Wayfarer",
};

export default async function ManageExperiencesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/items/manage");
  }

  await connectDB();

  const isAdmin = session.user.role === "admin";

  const docs = await Experience.find(isAdmin ? {} : { host: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  let hostNameById = new Map<string, string>();
  if (isAdmin) {
    const hostIds = Array.from(new Set(docs.map((d) => d.host.toString())));
    const hosts = await User.find({ _id: { $in: hostIds } })
      .select("name")
      .lean();
    hostNameById = new Map(hosts.map((h) => [h._id.toString(), h.name]));
  }

  const items: ManageExperienceItem[] = docs.map((doc) => ({
    id: doc._id.toString(),
    slug: doc.slug,
    title: doc.title,
    image: doc.images?.[0] ?? "",
    price: doc.price,
    currency: doc.currency,
    category: doc.category,
    isPublished: doc.isPublished,
    createdAt: new Date(doc.createdAt).toISOString(),
    hostName: isAdmin ? hostNameById.get(doc.host.toString()) : undefined,
  }));

  return (
    <>
      <Navbar />
      <main className="container py-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {isAdmin ? "Manage All Experiences" : "My Listings"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isAdmin
                ? "Every experience on the platform, across all hosts."
                : "The experiences you've listed on Wayfarer."}
            </p>
          </div>
          <Button asChild>
            <Link href="/items/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Link>
          </Button>
        </div>

        <div className="mt-8">
          <ManageExperiencesTable initialItems={items} isAdmin={isAdmin} />
        </div>
      </main>
      <Footer />
    </>
  );
}
