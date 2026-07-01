import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Doctor } from "@/components/sections/Doctor";
import { Treatments } from "@/components/sections/Treatments";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Testimonials } from "@/components/sections/Testimonials";
import { Gallery } from "@/components/sections/Gallery";
import { FAQ } from "@/components/sections/FAQ";
import { Appointment } from "@/components/sections/Appointment";
import { ContactMap } from "@/components/sections/ContactMap";
import { Footer } from "@/components/sections/Footer";
import { MobileCTA } from "@/components/sections/MobileCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-20 lg:pb-0">
        <Hero />
        <WhyChooseUs />
        <Doctor />
        <Treatments />
        <BeforeAfter />
        <Testimonials />
        <Gallery />
        <FAQ />
        <Appointment />
        <ContactMap />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
}
