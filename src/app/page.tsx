"use client";


import { FooterV2 } from "@/components/footerv2";
import { Navbar } from "@/components/navbar";
import NeuralNetworkPortfolio from "@/components/NeuralNetworkPortfolio";
import projectsData from "../data/projectsData.json"; // Adjust path as needed
import { ContactSectionLight } from "@/components/contact-section-light";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        {/* <section className="py-20 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Hi, I'm Mark Fahim</h1>
          <p className="mt-4 text-lg">Senior Software Engineer | AI Specialist</p>
          <p className="mt-2">Building intelligent systems and mobile apps.</p>
        </section> */}
{/* <HeaderV2 /> */}

        {/* <HeroSection />
        <AboutSection /> */}
         {/* <WhyMe /> */}

        {/* <Services /> */}
       
       
        {/* <Projects /> */}

         <div className="w-full h-screen">
      <NeuralNetworkPortfolio categories={projectsData} />
    </div>
       
       <ContactSectionLight />
      </main>
      <FooterV2 />
    </div>
  );
}