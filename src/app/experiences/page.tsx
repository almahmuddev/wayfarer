import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ExperiencesExplorer } from "@/components/experiences/experiences-explorer";

export const metadata = {
  title: "Explore Experiences | Wayfarer",
};

export default function ExperiencesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="container py-10 min-h-[60vh]">
        <Suspense fallback={null}>
          <ExperiencesExplorer />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
