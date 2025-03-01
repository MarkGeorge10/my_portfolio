"use client";

import { useState, useEffect } from "react";
import ProjectCard from "../components/ui/ProjectCard"; // Adjust the path as needed
import projectsData from "../data/projectsData.json"; // Adjust the path as needed
import { Analytics } from "@vercel/analytics/react"; // Keep for rendering the Analytics component
import { track } from "@vercel/analytics"; // Import the track function separately

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("AI/Machine Learning");

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Get the active category's projects
  const activeProjects =
    projectsData.find((category) => category.name === activeCategory)
      ?.projects || [];

  // Track project views when they come into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the project card is visible
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const projectId = entry.target.getAttribute("data-project-id");
          if (projectId) {
            // Use the track function from Vercel Analytics
            track("projectView", {
              projectId: projectId,
              projectTitle: entry.target.querySelector("h3")?.textContent || "Unknown",
              category: activeCategory,
              timestamp: new Date().toISOString(),
            });
          }
          // Stop observing after the first view (optional, for single tracking per session)
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each project card
    const projectCards = document.querySelectorAll("[data-project-id]");
    projectCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect(); // Cleanup on unmount
  }, [activeCategory]); // Re-run if the category changes

  return (
    <section id="projects" className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>

        {/* Category Navigation Bar */}
        <div className="flex justify-center space-x-4 mb-8">
          {projectsData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category.name
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-gray-900 hover:text-white transition-colors`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          className={`grid gap-6 ${
            activeCategory === "Mobile Development"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
          }`}
        >
          {activeProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              settings={settings}
              isMobileCategory={activeCategory === "Mobile Development"}
              data-project-id={project.id.toString()} // Add data attribute for tracking
            />
          ))}
        </div>
      </div>
      <Analytics /> {/* Render the Analytics component at the end */}
    </section>
  );
}