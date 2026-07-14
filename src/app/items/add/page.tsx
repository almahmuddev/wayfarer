import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ExperienceForm } from "@/components/experiences/experience-form";

export const metadata = {
  title: "Add an Experience | Wayfarer",
};

export default async function AddExperiencePage() {
  // Middleware already protects this route - this is a second, server-side
  // check so the page never renders its form without a valid session.
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/items/add");
  }

  return (
    <>
      <Navbar />
      <main className="container max-w-3xl py-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Add a New Experience
        </h1>
        <p className="mt-2 text-muted-foreground">
          List an adventure for other travelers to discover and book.
        </p>

        <div className="mt-8">
          <ExperienceForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
