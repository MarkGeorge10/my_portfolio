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
            id: 80,
            title: "Sustainable Energy Marketplace and Societal Readiness",
            description: "This project develops a green energy investment model that examines the impact of societal acceptance on financial returns and investment decisions, particularly in the post-Fukushima era. By analyzing empirical data, it shows that public sentiment significantly influences investment flows, profitability, and job creation. The findings stress the importance of aligning investment strategies with societal values to promote sustainable energy transitions, offering valuable insights for policymakers and investors.",
            image: ['/images/AI/energy.webp','/images/AI/energy.webp'],
            linksmodel:[
              {
                  icons:'https://img.shields.io/badge/-Read more-000000?logo=Read&logoColor=FFFFFF',
                  links:'https://nonnasorokinaphd.org/my-lab'
                }
            ],
               headerIcon: 'https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white'
          },

          {
            id: 81,
            title: "Opioid Epidemic",
            description: "This project focuses on predicting and preventing opioid deaths by analyzing social, economic, and demographic data. Collaborating with faculty, graduate students from Penn State Great Valley and Scranton are using data-driven approaches, leveraging AI and machine learning to identify risk factors and geographic regions with high opioid death rates. The goal is to develop a model for targeted interventions, offering valuable insights to inform community stakeholders and advance research on the opioid crisis.",
            image: ['/images/AI/opioids.png','/images/AI/opioids.png'],
            linksmodel:[
              {
                  icons:'https://img.shields.io/badge/-Read more-000000?logo=Read&logoColor=FFFFFF',
                  links:'https://www.psu.edu/news/great-valley/story/great-valley-grad-students-analyze-opioid-epidemic-data-faculty-project'
                }
            ],
               headerIcon: 'https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white'
          },
        {
          id: 1,
          title: "AI-Driven News Intelligence Platform",
          description: "This project delivers an automated news aggregation and curation system, combining web scraping, natural language processing (NLP), and user feedback mechanisms to streamline information consumption. The platform integrates two primary datapipelines: (1) a third-party integration with Inoreader API, where a Python-based scraper collects and processes news articles before marking them as read, and (2) a user-configurable RSS feed management system. Users can dynamically add or remove RSS feeds via a Next.js dashboard, with all feed metadata stored in PostgreSQL. The scraper service automatically discovers and processes new content from these feeds, ensuring continuous data ingestion.",
          image: [],
          linksmodel:[
            {
                icons:'',
                links:''
              },
              {
                icons:'',
                links:''
              },
          ],
          
          headerIcon: 'https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white'
        },
        {
            id:24,
            title:"AI-Powered Music Transcription Using Deep Learning",
            description:"In this project, I created an AI-powered music transcription system using deep learning to convert audio performances into written musical notation. Focusing on polyphonic music, I addressed challenges like overlapping notes and harmonies by preprocessing the NSynth dataset and extracting features such as MFCCs and spectrograms. I designed a hybrid model combining CNNs for spatial feature extraction and RNNs with LSTM/GRU layers for temporal dependencies. Trained on an HPC system with over 500,000 samples, the model achieved 73.44% accuracy. I also implemented note and chord comparison techniques to provide feedback for musicians. This project showcases my expertise in deep learning, audio processing, and solving complex problems, with applications in music education, composition, and therapy.",
            image: ['/images/medium.webp','/images/medium.webp' ],
            linksmodel:[
                {
                    icons:'https://img.shields.io/badge/-Medium-000000?logo=medium&logoColor=FFFFFF',
                    links:'https://medium.com/@mark.fouad99/ai-powered-music-transcription-using-deep-learning-f33baa589467'
                  }
              ],
            headerIcon: 'https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white'
        },
        {
            id: 2,
            title: "NLP for Sermon Classification and Translation",
            description: "Developed an advanced NLP pipeline to classify and translate church sermon videos. Leveraged OpenAI's Whisper model for speech-to-text transcription, enabling accurate extraction of sermon subtitles from YouTube videos. Built a custom NLP classification model to categorize sermons into one or more predefined categories (e.g., love, Bible study, etc.) from a list of 100+ topics. Additionally, implemented a translation module to convert sermon subtitles from English to multiple languages, including Arabic, Amharic, and Spanish. This project demonstrates expertise in NLP, machine learning, and multilingual text processing, providing a scalable solution for sermon organization and accessibility.",
            image: [],
            linksmodel:[
                {
                    icons:'',
                    links:''
                  },
                  {
                    icons:'',
                    links:''
                  },
              ],
             headerIcon: 'https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white'
          },
        {
          id: 3,
          title: "Intelligent Mancala Game",
          description: "In this project, I explored the game of Mancala and developed an AI to create winning strategies by maximizing stones in the player's home bin. I implemented adversarial search algorithms like DFS, BFS, A*, and Minimax with Alpha-Beta pruning to systematically explore the game's state space and make optimal decisions. Additionally, I integrated Reinforcement Learning (Q-Learning) to enable the AI to adapt and improve its strategies over time by training it against a strong Minimax opponent. This combination of adversarial search and reinforcement learning enhanced the AI's decision-making, providing a robust solution for optimal gameplay. Through this project, I gained hands-on experience in AI algorithms, game theory, and machine learning, showcasing my ability to apply theoretical knowledge to real-world problems.",
          image: ['/images/medium.webp','/images/medium.webp'],
          linksmodel:[
            {
                icons:'https://img.shields.io/badge/-Medium-000000?logo=medium&logoColor=FFFFFF',
                links:'https://medium.com/@mark.fouad99/mancala-game-and-artificial-intelligence-7a922a4a66bc'
              }
          ],
             headerIcon: 'https://img.shields.io/badge/-Python-3776AB?logo=python&logoColor=white'
        },

        // {
        //   id: 4,
        //   title: "Medical Basket Analysis",
        //   description: "Medical test analysis using FP Growth model.",
        //   image: [],
        //   links:[],
        //   icons:[]
        // },
        // {
        //   id: 5,
        //   title: "PCR Analysis Project",
        //   description: "Analysis of PCR test distribution and results during Covid-19.",
        //   image: [],
        //   links:[],
        //   icons:[]
        // },
        // {
        //   id: 6,
        //   title: "Lipid Medical Test",
        //   description: "Predictable system using ANN to evaluate patient risk.",
        //   image: [],
        // },
        // {
        //   id: 7,
        //   title: "Marketing Campaign Response Prediction",
        //   description: "Predictable system using ANN for targeted marketing campaigns.",
        //   image: [],
        //   links:[],
        //   icons:[]
        // },
        // {
        //   id: 8,
        //   title: "Cyclitic Google Capstone Project",
        //   description: "Analysis of bike-sharing data to convert casual riders to annual members.",
        //   image: [],
        // },
        // {
        //   id: 9,
        //   title: "Heart Attack Disease Prediction",
        //   description: "Predictable model using Random Forest and ANN to evaluate heart disease risk.",
        //   image: [],
        //   links:[],
        //   icons:[]
        // },
        
        
      ],
    },
    {
      id: 2,
      name: "Backend Development",
      projects: [
        {
          id: 10,
          title: "Building News Intelligence Backend with FastAPI and PostgreSQL",
          description: "The AI-powered news platform’s backend was built using FastAPI, a high-performance Python framework, to handle API requests, manage data pipelines, and integrate AI models. Its asynchronous capabilities efficiently processed tasks like article scraping, NLP processing, and content delivery, while RESTful endpoints ensured seamless communication between components. PostgreSQL was chosen for data storage, optimized for structured data like article metadata, RSS feeds, and NLP outputs. The pgvector extension enabled semantic search, and Redis caching improved performance. Docker ensured consistent deployment, and AWS provided scalable infrastructure. Together, FastAPI and PostgreSQL formed a robust, scalable foundation supporting real-time data ingestion, NLP, and user feedback, with room for future enhancements like multi-language support and advanced analytics. \n This project is connected 'AI-Driven News Intelligence Platform' under 'AI/Machine Learning' ",
          image: [],
          linksmodel:[
            {
                icons:'',
                links:''
              },
              {
                icons:'',
                links:''
              },
          ],
        headerIcon: 'https://img.shields.io/badge/-FastAPI-009688?logo=fastapi&logoColor=white'
        },
        {
            id: 11,
            title: "FASTAPI Backend for Sermon Management",
            description: "Built a robust backend system using FastAPI to manage church sermons by scraping YouTube videos and processing them through a machine learning pipeline. The backend integrates with YouTube's API to automatically scrape and store sermon videos, while the FastAPI framework ensures efficient handling of video metadata, subtitles, and classification results. The system also supports multilingual translation of sermon subtitles, making content accessible to a global audience. Designed for scalability and performance, the backend leverages asynchronous programming and containerization with Docker for seamless deployment. This project highlights expertise in backend development, API integration, and workflow automation.\n This project is connected to 'NLP for Sermon Classification and Translation' under 'AI/Machine Learning' ",
            image: [],
            linksmodel:[
                {
                    icons:'',
                    links:''
                  },
                  {
                    icons:'',
                    links:''
                  },
              ],
             headerIcon: 'https://img.shields.io/badge/-FastAPI-009688?logo=fastapi&logoColor=white'
          },
        {
          id: 12,
          title: "Wedding NestJs Application",
          description: "Developed a scalable backend for a wedding planning app using NestJS, TypeScript, and Prisma. Features include JWT-based authentication, vendor management with CRUD operations, and wedding planning with budget tracking, expense management, and personalized recommendations. The app also offers advanced search and filtering, a customizable notification system, and seamless integration with Supabase for database management. Built with modern tools like GitHub, Git, and ClickUp, this project showcases expertise in backend development, API design, and database management, delivering a secure and user-friendly solution for wedding planning.",
          image: [],
          linksmodel:[
            {
                icons:'',
                links:''
              },
              {
                icons:'',
                links:''
              },
          ],
          headerIcon: 'https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white'
        },
        {
          id: 13,
          title: "Davedology Course Management System",
          description: "The Course management backend system designed to elevate the teaching and learning experience. Our platform seamlessly integrates lessons with engaging video content and interactive quizzes, empowering educators and students alike. Teachers enjoy a user-friendly dashboard to effortlessly add lessons and quizzes, while also gaining access to insightful analytics for the quiz section. Elevate your educational journey with our innovative course management solution.",
          image: [],
          linksmodel:[
            {
                icons:'',
                links:''
              },
              {
                icons:'',
                links:''
              },
          ],
          headerIcon: 'https://img.shields.io/badge/-ASP.NET-512BD4?logo=.net&logoColor=white'
        },
      ],
    },
    {
      id: 3,
      name: "Frontend Development",
      projects: [
        {
          id: 14,
          title: "News Intelligence Platform",
          description: "Frontend for the AI-driven news intelligence platform",
          image: [],
          linksmodel:[
            {
                icons:'',
                links:''
              },
              {
                icons:'',
                links:''
              },
          ],
             headerIcon: 'https://img.shields.io/badge/-Next.js-000000?logo=next.js&logoColor=white'
        },
      ],
    },
    {
      id: 4,
      name: "Mobile Development",
      projects: [
        {
          id: 15,
          title: "Swiftr",
          description: "Swiftr is the training membership that gives you access to various training forms, such as martial arts, gym, CrossFit, dance, yoga, tennis. \n All classes can be booked directly in this app and there is also a wide range of drop-in workouts where you can exercise in the gym whenever you please.",
          image: ['/images/mobile/swiftr/swiftr 1.webp','/images/mobile/swiftr/swiftr 2.webp','/images/mobile/swiftr/swiftr 3.webp','/images/mobile/swiftr/swiftr 4.webp'],
          linksmodel:[
            {
                icons:'https://img.shields.io/badge/-Android-3DDC84?logo=android&logoColor=white',
                links:'https://play.google.com/store/apps/details?id=se.android.swiftr.swiftr'
              },
          ],
             headerIcon: 'https://img.shields.io/badge/-Flutter-02569B?logo=flutter&logoColor=white'
        },
        {
          id: 16,
          title: "Rayan",
          description: "Rayan is designed to offer optimum care and elite service to its valuable members at Al-Seef Hospital, focusing on improving their well-being through more straightforward and world-class facilities.\n We assign a Personal Health Concierge to every registered member to provide a valuable personal service and an exceptional care to meet the members’ needs with a higher quality and shorter period of time.",
          image: ['/images/mobile/rayan/rayan 1.webp','/images/mobile/rayan/rayan 2.webp','/images/mobile/rayan/rayan 3.webp','/images/mobile/rayan/rayan 4.webp','/images/mobile/rayan/rayan 5.webp'],
          linksmodel:[
            {
                icons:'https://img.shields.io/badge/-Android-3DDC84?logo=android&logoColor=white',
                links:'https://play.google.com/store/apps/details?id=com.skyvision.rayan'
              },
              {
                icons:'https://img.shields.io/badge/-Swift-F05138?logo=swift&logoColor=white',
                links:'https://apps.apple.com/us/app/rayan/id6449189511'
              },
          ],
             headerIcon: 'https://img.shields.io/badge/-Flutter-02569B?logo=flutter&logoColor=white'
        },
        {
          id: 17,
          title: "Organ Live",
          description: "Organlive is a listener-supported internet audio station with a focus on music of the classical organ. We maintain a growing library of music that currently contains over 29,000 tracks. Our library features classical organ music performed on pipe, electronic, and combination instruments recorded all over the world. \n With our mobile app, enjoy listening to Organlive on the go. The mobile app features extra information about the organist and organ played during the recording (when available), in addition to a history of recently played tracks",
          image: ['/images/mobile/organ/organ 1.png','/images/mobile/organ/organ 2.png'],
          linksmodel:[
            {
                icons:'https://img.shields.io/badge/-Swift-F05138?logo=swift&logoColor=white',
                links:'https://apps.apple.com/us/app/organ-live-media-foundation/id1663040569'
              },
          ],
             headerIcon: 'https://img.shields.io/badge/-Flutter-02569B?logo=flutter&logoColor=white'
        },
        // {
        //   id: 18,
        //   title: "Dream Riders",
        //   description: "Flutter-based mobile app for Android and iOS.",
        //   image: [ ],
        //   linksmodel:[
            
        //   ],
        //      headerIcon: 'https://img.shields.io/badge/-Flutter-02569B?logo=flutter&logoColor=white'
        // },
        {
          id: 19,
          title: "SKODA Cars",
          description: " Authorized Dealer & Service Center. Official ŠKODA dealer. \n Enjoy the strongest Skoda showroom  With official price and the best after-sales service. \n assure, For Maintenance We use exclusive specialized equipment & best technicians.",
          image: ['/images/mobile/skoda/skoda 1.webp','/images/mobile/skoda/skoda 2.webp', '/images/mobile/skoda/skoda 3.webp', '/images/mobile/skoda/skoda 4.webp', '/images/mobile/skoda/skoda 5.webp','/images/mobile/skoda/skoda 6.webp','/images/mobile/skoda/skoda 7.webp','/images/mobile/skoda/skoda 8.webp'],
          linksmodel:[
            {
                icons:'https://img.shields.io/badge/-Android-3DDC84?logo=android&logoColor=white',
                links:'https://play.google.com/store/apps/details?id=com.promina.skoda'
              },
          ],
             headerIcon: 'https://img.shields.io/badge/-Flutter-02569B?logo=flutter&logoColor=white'
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
            id: 20,
            title: "Phone Formater",
            description: "Developed an automated workflow in HubSpot to streamline contact management by dynamically formatting phone numbers based on country codes. This solution integrates seamlessly with HubSpot's CRM, ensuring consistent and accurate phone number formatting across all contacts. By automating this process, the workflow eliminates manual errors, enhances data quality, and improves the efficiency of communication workflows. The system is designed to adapt to various international phone number formats, making it scalable for global use cases. This project demonstrates expertise in HubSpot automation, data standardization, and workflow optimization.",
            image: [],
            linksmodel:[
                {
                    icons:'',
                    links:''
                  },
                  {
                    icons:'',
                    links:''
                  },
              ],
             headerIcon: 'https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white'
          },
          {
            id: 21,
            title: "Referral Workflow",
            description: "Designed and implemented a seamless referral workflow connecting HubSpot CRM with First Promoter to automate and optimize referral tracking and management. This integration enables real-time synchronization of contact data, ensuring accurate tracking of referral activities and rewards. The workflow automates the identification of referral sources, tracks customer referrals, and updates HubSpot contact records with referral status and rewards. By streamlining the referral process, this solution enhances customer engagement, improves data accuracy, and drives business growth through incentivized referrals. This project showcases expertise in CRM integration, workflow automation, and referral marketing strategies.",
            image: [],  
            linksmodel:[
                {
                    icons:'',
                    links:''
                  },
                  {
                    icons:'',
                    links:''
                  },
              ],
             headerIcon: 'https://img.shields.io/badge/-NestJS-E0234E?logo=nestjs&logoColor=white'
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
        {/* Projects Grid */}
        <div
          className={`grid gap-6 ${
            activeCategory === "Mobile Development"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" // Adjust column count for mobile
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
          }`}
        >
          {activeProjects.map((project) => (
            <div
              key={project.id}
              className={`bg-white p-6 rounded-lg shadow-md ${
                activeCategory === "Mobile Development"
                  ? "w-auto h-auto" // Mobile screen size
                  : "h-auto"
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-xl font-semibold">{project.title}</h3>
                {project.headerIcon && (
                  <img
                    src={project.headerIcon}
                    alt={`${project.title} badge`}
                    className="h-6"
                  />
                )}
              </div>

              {/* Conditional Slider Rendering */}
              {project.image.length > 0 && project.image[0] !== "" ? (
                <Slider {...settings}>
                  {project.image.map((img, index) => (
                    <div key={index} className="p-2">
                      <img
                        src={img}
                        alt={project.title}
                        className="w-full h-[400] object-contain rounded-lg"
                      />
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="p-2 bg-gray-100 rounded-lg text-center text-gray-500 h-48 flex items-center justify-center">
                  No images available
                </div>
              )}

              <p className="text-gray-600 mt-4 text-sm overflow-y-auto h-auto">
                {project.description}
              </p>

              {/* Links Row */}
              {project.linksmodel.length > 0 && (
                <div className="flex space-x-2 mt-4">
                  {project.linksmodel.map((linkItem, index) =>
                    linkItem.icons && linkItem.links ? (
                      <a
                        key={index}
                        href={linkItem.links}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <img
                          src={linkItem.icons}
                          alt="Link badge"
                          className="h-6"
                        />
                      </a>
                    ) : null
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}