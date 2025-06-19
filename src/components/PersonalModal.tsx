import React from 'react';
import { Button } from '@/components/ui/button';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Image from "next/image";

interface PersonalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PersonalModal: React.FC<PersonalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-6">
              <Image 
                src="/images/profile.jpg" 
                alt="Mark Fouad" 
                
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-600"
              />
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Mark Fahim</h2>
                <p className="text-lg text-purple-600 font-semibold">Senior Software Engineer | AI Specialist | Master&apos;s Student in AI</p>
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">About Me</h3>
              <p className="text-gray-700">
                Passionate about building intelligent systems and solving complex problems
              </p>

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

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Background</h3>
              <p className="text-gray-700 leading-relaxed">
                I&apos;m currently working as an AI Research Assistant at Pennsylvania State University while pursuing my Master&apos;s Degree in Artificial Intelligence. My research focuses on developing intelligent systems that can understand and process complex data.
              </p>
              <p className="text-gray-700 leading-relaxed mt-3">
                With a strong foundation in software engineering and a passion for AI, I&apos;m constantly exploring new technologies and methodologies to create innovative solutions that make a difference.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Current Focus</h3>
              <div className="space-y-2 text-gray-700">
                <div className="flex items-center gap-2">
                  <span>🔭</span>
                  <span>Working as an AI Research Assistant at Pennsylvania State University</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎓</span>
                  <span>Pursuing a Master&apos;s Degree in Artificial Intelligence</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🌱</span>
                  <span>Enhancing my skills in Algorithms and Programming Automatic Calculus</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💬</span>
                  <span>Specializing in Machine Learning, Backend development, and Mobile Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📫</span>
                  <span>Available at <a href="mailto:mark.fahim50@gmail.com" className="text-purple-600 hover:underline">mark.fahim50@gmail.com</a> for collaborations and opportunities</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-4 mt-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">AI/Machine Learning</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Backend Development</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Frontend Development</span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">Mobile Development</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">HubSpot Automation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalModal;