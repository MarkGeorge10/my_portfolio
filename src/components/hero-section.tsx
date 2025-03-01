"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image"; // Import at the top

export function HeroSection() {
  return (
    <section className="bg-gray-900 text-white py-1  min-h-[calc(60vh-6rem)] flex items-center justify-center">
      <div className="container px-4 md:px-6 from-gray-900 to-black opacity-90">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:gap-12 xl:grid-cols-[1fr_auto]">
          <motion.div 
            className="flex flex-col justify-center space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            Hi, I&apos;m Mark Fahim
            </h1>
            <p className="text-xl text-muted-foreground">
            Senior Software Engineer | AI Specialist | Master&apos;s Student in AI
            </p>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-m">
              Building intelligent systems with a passion for machine learning, algorithms, and mobile development. 
              Currently an AI Research Assistant at Pennsylvania State University.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row ">
              <Button asChild size="lg" className="bg-white text-black hover:bg-black hover:text-white">
                <Link href="#contact">
                  Contact Me
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#projects">
                  View Projects
                </Link>
              </Button>
            </div>
            <div className="flex gap-4 mt-4">
              {/* <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </Link> */}
              <Link href="https://www.linkedin.com/in/mark-fahim-48410a153/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href="https://github.com/MarkGeorge10" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="mailto:mark.fahim50@gmail.com">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="flex items-center justify-end ml-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-64 h-64 rounded-full overflow-hidden bg-gray-800">
              <Image
                src="/images/profile.jpg"
                alt="Mark Fahim"
                className="object-contain"
                width={300}
                height={300}
              />
            </div>
          </motion.div>
        </div>
        <div className="flex min-h-[calc(10vh-6rem)]  items-center justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Button variant="ghost" size="icon" asChild>
              <Link href="#about">
                <ArrowDown className="h-6 w-6" />
                <span className="sr-only">Scroll Down</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}