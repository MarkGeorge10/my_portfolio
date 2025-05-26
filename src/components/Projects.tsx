"use client";

import { useState, useEffect, useRef } from "react";
import { Network } from "vis-network/standalone";
import ProjectCard from "../components/ui/ProjectCard"; // Adjust path as needed
import projectsData from "../data/projectsData.json"; // Adjust path as needed
import { Analytics, track } from "@vercel/analytics/react";

interface Node {
  id: number | string;
  label: string;
  group: string;
  shape: string;
  size: number;
  font: { size: number; color: string };
  title: string;
}

interface Edge {
  from: number | string;
  to: number | string;
  color: { color: string };
  smooth: { enabled: boolean; type: string; roundness: number };
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string[];
  video: string;
  linksmodel: { icons: string; links: string }[];
  headerIcon: string;
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const networkContainerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);

  // Slider settings for ProjectCard (used for image carousel)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Initialize the network graph
  useEffect(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Create category nodes and project sub-nodes
    projectsData.forEach((category) => {
      // Add category node
      nodes.push({
        id: `cat-${category.id}`,
        label: category.name,
        group: category.name,
        shape: "box",
        size: 30,
        font: { size: 16, color: "#1f2937" },
        title: category.name,
      });

      // Add project sub-nodes and connect to category
      category.projects.forEach((project) => {
        nodes.push({
          id: project.id,
          label: project.title,
          group: category.name,
          shape: "dot",
          size: 15,
          font: { size: 12, color: "#1f2937" },
          title: project.description.substring(0, 100) + "...", // Tooltip
        });

        // Connect project to its category
        edges.push({
          from: `cat-${category.id}`,
          to: project.id,
          color: { color: "#9ca3af" },
          smooth: { enabled: true, type: "curvedCW", roundness: 0.2 },
        });
      });
    });

    const data = { nodes, edges };
    const options = {
      nodes: {
        shapeProperties: { borderRadius: 4 },
        scaling: { min: 10, max: 30 },
        font: { size: 14, face: "Inter, sans-serif" },
      },
      edges: {
        width: 1,
        color: { inherit: false },
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -3000,
          springLength: 100,
          springConstant: 0.05,
        },
        stabilization: { iterations: 1000 },
      },
      interaction: {
        hover: true,
        zoomView: false, // Disable zoom in and out
        dragView: true, // Allow panning
      },
    };

    if (networkContainerRef.current && !networkRef.current) {
      networkRef.current = new Network(networkContainerRef.current, data, options);

      // Handle node click to show details
      networkRef.current.on("click", (params) => {
        if (params.nodes.length > 0) {
          const nodeId = params.nodes[0];
          // Only show details for project nodes (not category nodes)
          if (!nodeId.toString().startsWith("cat-")) {
            const project = projectsData
              .flatMap((cat) => cat.projects)
              .find((p) => p.id === nodeId);
            if (project) {
              setSelectedProject(project);

              // Track project view
              track("projectView", {
                projectId: nodeId,
                projectTitle: project.title,
                category: projectsData.find((cat) =>
                  cat.projects.some((p) => p.id === nodeId)
                )?.name || "Unknown",
                timestamp: new Date().toISOString(),
              });
            }
          } else {
            setSelectedProject(null); // Close details if category node is clicked
          }
        } else {
          setSelectedProject(null); // Close details if clicking outside a node
        }
      });
    }

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
        networkRef.current = null;
      }
    };
  }, []);

  // Close details panel
  const closeDetails = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-6 sm:py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
          Projects Network
        </h2>

        {/* Network Graph Container */}
        <div
          ref={networkContainerRef}
          className="w-full h-[900px] bg-transparent"
        />

        {/* Project Details Panel */}
        {selectedProject && (
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl p-6 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out">
            <button
              onClick={closeDetails}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ProjectCard
              project={selectedProject}
              settings={settings}
              isMobileCategory={projectsData.find((cat) =>
                cat.projects.some((p) => p.id === selectedProject.id)
              )?.name === "Mobile Development"}
              data-project-id={selectedProject.id.toString()}
            />
          </div>
        )}
      </div>
      <Analytics />
    </section>
  );
}