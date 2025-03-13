"use client";

import { useState, useEffect } from "react";
import ProjectCard from "../components/ui/ProjectCard"; // Adjust the path as needed
import projectsData from "../data/projectsData.json"; // Adjust the path as needed
import { Analytics } from "@vercel/analytics/react";
import { track } from "@vercel/analytics/react";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("AI/Machine Learning");

  // Slider settings for ProjectCard (used for mobile view)
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
    projectsData.find((category) => category.name === activeCategory)?.projects || [];

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
            track("projectView", {
              projectId: projectId,
              projectTitle: entry.target.querySelector("h3")?.textContent || "Unknown",
              category: activeCategory,
              timestamp: new Date().toISOString(),
            });
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const projectCards = document.querySelectorAll("[data-project-id]");
    projectCards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <section id="projects" className="py-6 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
          Projects
        </h2>

        {/* Category Navigation Bar */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          {projectsData.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg transition-colors ${
                activeCategory === category.name
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-900 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          className={`grid gap-4 sm:gap-6 ${
            activeCategory === "Mobile Development"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
          }`}
        >
          {activeProjects.length > 0 ? (
            activeProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                settings={settings}
                isMobileCategory={activeCategory === "Mobile Development"}
                data-project-id={project.id.toString()}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No projects found in this category.
            </p>
          )}
        </div>
      </div>
      <Analytics />
    </section>
  );
}