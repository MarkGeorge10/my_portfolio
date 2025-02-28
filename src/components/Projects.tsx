"use client";

import { useState } from "react";
import Slider from "react-slick";
import ProjectCard from "../components/ui/ProjectCard"; // Adjust the path as needed
import projectsData from "../data/projectsData.json"; // Adjust the path as needed

export default function Projects() {
  // State to manage the active category
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}