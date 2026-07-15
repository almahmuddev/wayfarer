import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { FeaturedExperiences } from "@/components/sections/featured-experiences";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyWayfarer } from "@/components/sections/why-wayfarer";
import { TravelStories } from "@/components/sections/travel-stories";
import { Newsletter } from "@/components/sections/newsletter";
import { CallToAction } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Categories />
        <FeaturedExperiences />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <WhyWayfarer />
        <TravelStories />
        <Newsletter />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}
