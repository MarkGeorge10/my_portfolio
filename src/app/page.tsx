import Header from "@/components/Header";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import WhoAMI from "@/components/who_am_i";
import WhyMe from "@/components/why_me";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <section className="py-20 text-center bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <h1 className="text-4xl md:text-5xl font-bold">Hi, I&apos;m Mark Fahim</h1>
          <p className="mt-4 text-lg">Senior Software Engineer | AI Specialist</p>
          {/* <p className="mt-2">Building intelligent systems and mobile apps.</p> */}
          <WhoAMI />
        </section>
        
        <Services />
        <Projects />
       
        <WhyMe />
      </main>
      <Footer />
    </div>
  );
}