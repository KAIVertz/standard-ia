import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhyUs />
      <Services />
      <Process />
      <CtaBanner />
      <Footer />
    </main>
  );
}
