"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {FaLinkedin, FaGithub } from "react-icons/fa"; // Using react-icons for social media icons

export default function HeaderV2() {
    
    const [isVisible, setIsVisible] = useState(false);

    const [stats, setStats] = useState({
        years: 0,
        projects: 0,
        technologies: 0,
        commits: 0,
      });
    
      const targetStats = {
        years: 5,
        projects: 26,
        technologies: 8,
        commits: 500,
      };
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setIsVisible(true); // Trigger visibility for fade-in and count animations
      
          // Array to store interval IDs for cleanup
          const intervals: NodeJS.Timeout[] = [];
      
          // Animate numbers over 2 seconds
          const duration = 3000;
          const stepTime = 20;
          const steps = duration / stepTime;
      
          const animateCount = (key: keyof typeof stats, target: number) => {
            let current = 0;
            const increment = Math.ceil(target / steps);
            const interval = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(interval);
              }
              setStats((prev) => ({ ...prev, [key]: current }));
            }, stepTime);
            intervals.push(interval); // Store interval ID for cleanup
          };
      
          animateCount("years", targetStats.years);
          animateCount("projects", targetStats.projects);
          animateCount("technologies", targetStats.technologies);
          animateCount("commits", targetStats.commits);
      
          // Cleanup all intervals when the component unmounts
          return () => {
            clearTimeout(timer);
            intervals.forEach((intervalId) => clearInterval(intervalId));
          };
        }, 500); // Delay for 0.5 seconds to sync with page load
      
        // Initial cleanup in case the effect runs again
        return () => clearTimeout(timer);
      }, [targetStats.commits, targetStats.projects, targetStats.technologies, targetStats.years]);
    
      return (
        <header className="bg-gray-900 text-white py-16 relative overflow-hidden">
          {/* Background overlay or decoration (optional) */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-90"></div>
    
          <div className="container mx-auto px-4 relative z-10">
            {/* Main content layout */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Left section: Text and button */}
              <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                  Hello I’m Mark Fahim
                </h1>
                <h5 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-green-400">
                Senior Software Engineer | AI Specialist
                </h5>
                
                <p className="text-gray-300 mb-6 max-w-md mx-auto md:mx-0">
                    Building intelligent systems and mobile apps.
                </p>
                {/* <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                  Download CV ↓
                </button> */}
                {/* Social media icons */}
                <div className="mt-6 flex justify-center md:justify-start space-x-4">
                  {/* <a
                    href="https://twitter.com/markfouad12"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <FaTwitter className="text-gray-300 hover:text-green-400 w-6 h-6" />
                  </a> */}
                  <a
                    href="https://www.linkedin.com/in/mark-fahim-48410a153/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="text-gray-300 hover:text-green-400 w-6 h-6" />
                  </a>
                  <a
                    href="https://github.com/markgeorge10"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FaGithub className="text-gray-300 hover:text-green-400 w-6 h-6" />
                  </a>
                </div>
              </div>
    
              {/* Right section: Profile image with dashed border and circulating dots */}
              <div className="relative">
                <div className="w-64 h-64 rounded-full overflow-hidden border-2 border-dashed border-green-400 bg-gray-800">
                  <Image
                    src="/images/profile.jpg" // Replace with your profile image path in public/images/
                    alt="Mark Fahim"
                    width={256} // Matches w-64 (64 * 4px = 256px in Tailwind)
                    height={256} // Matches h-64
                    className="object-cover"
                  />
                </div>
                {/* Dashed circle animation */}
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-green-400 animate-pulse-slow"></div>
              
              </div>
            </div>
    
            {/* Animated Stats at the bottom */}
            <div className="mt-12 text-center text-white space-y-4">
              <div
                className={`flex justify-center gap-8 text-xl ${
                  isVisible ? "animate-fadeInUp" : "opacity-0"
                }`}
              >
                <span>{stats.years} Years of Experience</span>
                <span>{stats.projects} Projects Completed</span>
                <span>{stats.technologies} Technologies Mastered</span>
                <span>{stats.commits} Code Commits</span>
              </div>
              
            </div>
          </div>
        </header>
      );
    }
