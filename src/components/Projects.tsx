"use client";

import { useState } from "react";
import Slider from "react-slick";

export default function Projects() {
  // State to manage the active category
  const [activeCategory, setActiveCategory] = useState("AI/Machine Learning");

  // Categories and their projects
  const categories = [
    {
      id: 1,
      name: "AI/Machine Learning",
      projects: [
        {
          id: 1,
          title: "AI-Driven News Intelligence Platform",
          description: "Automated news aggregation and curation system with NLP.",
          image: [],
        },
        {
          id: 2,
          title: "Intelligent Mancala Game",
          description: "AI-powered game using Minimax and Q-Learning.",
          image: [],
        },
        {
          id: 3,
          title: "Medical Basket Analysis",
          description: "Medical test analysis using FP Growth model.",
          image: [],
        },
        {
          id: 4,
          title: "PCR Analysis Project",
          description: "Analysis of PCR test distribution and results during Covid-19.",
          image: [],
        },
        {
          id: 5,
          title: "Lipid Medical Test",
          description: "Predictable system using ANN to evaluate patient risk.",
          image: [],
        },
        {
          id: 6,
          title: "Marketing Campaign Response Prediction",
          description: "Predictable system using ANN for targeted marketing campaigns.",
          image: [],
        },
        {
          id: 7,
          title: "Cyclitic Google Capstone Project",
          description: "Analysis of bike-sharing data to convert casual riders to annual members.",
          image: [],
        },
        {
          id: 8,
          title: "Heart Attack Disease Prediction",
          description: "Predictable model using Random Forest and ANN to evaluate heart disease risk.",
          image: [],
        },
      ],
    },
    {
      id: 2,
      name: "Backend Development",
      projects: [
        {
          id: 9,
          title: "Building News Intelligence Backend with FastAPI and PostgreSQL",
          description: "Backend for AI-powered news platform with FastAPI and PostgreSQL.",
          image: [],
        },
        {
          id: 10,
          title: "Wedding NestJs Application",
          description: "Backend for a wedding app with user authentication and vendor management.",
          image: [],
        },
        {
          id: 11,
          title: "Davedology Course Management System",
          description: "Course management system with lessons, quizzes, and analytics.",
          image: [],
        },
      ],
    },
    {
      id: 3,
      name: "Frontend Development",
      projects: [
        {
          id: 12,
          title: "News Intelligence Platform",
          description: "Frontend for the AI-driven news intelligence platform.",
          image: [],
        },
      ],
    },
    {
      id: 4,
      name: "Mobile Development (Flutter)",
      projects: [
        {
          id: 13,
          title: "Swiftr",
          description: "Swiftr is the training membership that gives you access to various training forms, such as martial arts, gym, CrossFit, dance, yoga, tennis. \n All classes can be booked directly in this app and there is also a wide range of drop-in workouts where you can exercise in the gym whenever you please.",
          image: [],
        },
        {
          id: 14,
          title: "Rayan",
          description: "Rayan is designed to offer optimum care and elite service to its valuable members at Al-Seef Hospital, focusing on improving their well-being through more straightforward and world-class facilities.\n We assign a Personal Health Concierge to every registered member to provide a valuable personal service and an exceptional care to meet the members’ needs with a higher quality and shorter period of time.",
          image: [],
        },
        {
          id: 15,
          title: "Organ Live",
          description: "Organlive is a listener-supported internet audio station with a focus on music of the classical organ. We maintain a growing library of music that currently contains over 29,000 tracks. Our library features classical organ music performed on pipe, electronic, and combination instruments recorded all over the world. \n With our mobile app, enjoy listening to Organlive on the go. The mobile app features extra information about the organist and organ played during the recording (when available), in addition to a history of recently played tracks",
          image: [],
        },
        {
          id: 16,
          title: "Dream Riders",
          description: "Flutter-based mobile app for Android and iOS.",
          image: [],
        },
        {
          id: 17,
          title: "SKODA Cars",
          description: " Authorized Dealer & Service Center. Official ŠKODA dealer. \n Enjoy the strongest Skoda showroom  With official price and the best after-sales service. \n assure, For Maintenance We use exclusive specialized equipment & best technicians.",
          image: [],
        },
        // {
        //   id: 18,
        //   title: "Mr Fix",
        //   description: "Flutter-based mobile app for Android and iOS.",
        //   image: [],
        // },
        // {
        //   id: 19,
        //   title: "Garage Center",
        //   description: "Flutter-based mobile app for Android.",
        //   image: [],
        // },
      ],
    },

    {
        id: 5,
        name: "HubSpot Automation & Workflows",
        projects: [
          {
            id: 12,
            title: "Phone Formater",
            description: "Developed an automated workflow in HubSpot to streamline contact management by dynamically formatting phone numbers based on country codes. This solution integrates seamlessly with HubSpot's CRM, ensuring consistent and accurate phone number formatting across all contacts. By automating this process, the workflow eliminates manual errors, enhances data quality, and improves the efficiency of communication workflows. The system is designed to adapt to various international phone number formats, making it scalable for global use cases. This project demonstrates expertise in HubSpot automation, data standardization, and workflow optimization.",
            image: [],
          },
        ],
      },
  ];

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
  const activeProjects = categories.find(
    (category) => category.name === activeCategory
  )?.projects || [];

  return (
    <section id="projects" className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>

        {/* Category Navigation Bar */}
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.name)}
              className={`px-4 py-2 rounded-lg ${
                activeCategory === category.name
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } hover:bg-blue-500 hover:text-white transition-colors`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects under the active category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-6 rounded-lg shadow-md h-auto"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              {/* Conditional Slider Rendering */}
              {project.image.length > 0 ? (
                <Slider {...settings}>
                  {project.image.map((img, index) => (
                    <div key={index} className="p-4">
                      <img
                        src={img}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div></div>
                // <div className="p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                //   No images available
                // </div>
              )}
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}