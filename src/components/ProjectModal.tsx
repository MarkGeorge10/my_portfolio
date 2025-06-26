import React from 'react';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

import Image from "next/image";


interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h2>
              <Image src={project.headerIcon} alt="Technology" className="mb-4" width={80} height={120}/>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-700 whitespace-pre-line">{project.description}</p>
            
            {project.image && project.image.length > 0 && (
              <div className="w-full">
                <Carousel className="w-full max-w-3xl mx-auto">
                  <CarouselContent>
                    {project.image.map((img, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <Image
                            src={img}
                            alt={`${project.title} screenshot ${index + 1}`}
                            className="w-full rounded-lg"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {project.image.length > 1 && (
                    <>
                      <CarouselPrevious />
                      <CarouselNext />
                    </>
                  )}
                </Carousel>
              </div>
            )}
            
            {project.video && (
              <video
                controls
                className="w-full h-64 rounded-lg"
                src={project.video}
              >
                Your browser does not support the video tag.
              </video>
            )}
            
            {project.linksmodel && project.linksmodel.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {project.linksmodel.map((link, index) => (
                  link.links && (
                    <a
                      key={index}
                      href={link.links}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      {link.icons ? (
                        <Image src={link.icons} alt="Link" width={80} height={120}/>
                      ) : (
                        <Button variant="outline">View Project</Button>
                      )}
                    </a>
                  )
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
