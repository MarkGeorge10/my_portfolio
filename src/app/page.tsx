// import Header from "@/components/Header";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
// import WhoAMI from "@/components/who_am_i";
import WhyMe from "@/components/why_me";
import HeaderV2 from "@/components/Header_v2";
import Headers from "@/components/Header";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { FooterV2 } from "@/components/footerv2";

export default function Home() {
  return (
    <div>
      <Headers />
      <main>
        {/* <section className="py-20 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Hi, I'm Mark Fahim</h1>
          <p className="mt-4 text-lg">Senior Software Engineer | AI Specialist</p>
          <p className="mt-2">Building intelligent systems and mobile apps.</p>
        </section> */}
{/* <HeaderV2 /> */}

        <HeroSection />
        <AboutSection />
         <WhyMe />

        {/* <Services /> */}
       
       
        <Projects />
       
       <ContactSection />
      </main>
      <FooterV2 />
    </div>
  );
}