import Slider, { Settings as SliderSettings } from "react-slick"; // Import SliderSettings
import Image from "next/image";

interface LinkModel {
  icons: string;
  links: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string[];
  video?: string; // Optional video field
  linksmodel: LinkModel[];
  headerIcon?: string;
}

interface ProjectCardProps {
  project: Project;
  settings: SliderSettings; // Use SliderSettings type from react-slick
  isMobileCategory: boolean; // To adjust layout for mobile category
}

export default function ProjectCard({
  project,
  settings,
  isMobileCategory,
}: ProjectCardProps) {
  const isYouTubeVideo =
    project.video?.includes("youtube.com") || project.video?.includes("youtu.be");

  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md ${
        isMobileCategory ? "w-auto h-auto" : "h-auto"
      }`}
    >
      <div className="flex items-center space-x-3 mb-4">
        <h3 className="text-xl font-semibold">{project.title}</h3>
        {project.headerIcon && (
          <Image
            src={project.headerIcon}
            alt={`${project.title} badge`}
            className="h-6"
            width={80} // Example width
            height={50} // Example height
          />
        )}
      </div>

      {/* Video Widget */}
      {project.video && project.video !== "" && (
        <div className="mb-4">
          {isYouTubeVideo ? (
            <iframe
              width="100%"
              height="315"
              src={project.video}
              title={`${project.title} video`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            />
          ) : (
            <video
              width="100%"
              height="315"
              controls
              src={project.video}
              className="rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}

      {/* Conditional Image Rendering */}
      {project.image.length > 0 && project.image[0] !== "" ? (
        project.image.length === 1 ? (
          <div className="p-2">
            <Image
              src={project.image[0]}
              width={400}
              height={400}
              alt={project.title}
              className="w-full h-[400px] object-contain rounded-lg"
            />
          </div>
        ) : (
          <Slider {...settings}>
            {project.image.map((img, index) => (
              <div key={index} className="p-2">
                <Image
                  src={img}
                  width={400}
                  height={400}
                  alt={project.title}
                  className="w-full h-[400px] object-contain rounded-lg"
                />
              </div>
            ))}
          </Slider>
        )
      ) : (
        !project.video && (
          <div className="p-2 bg-gray-100 rounded-lg text-center text-gray-500 h-48 flex items-center justify-center">
            No images available
          </div>
        )
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
                <Image
                  src={linkItem.icons}
                  alt="Link badge"
                  className="h-6"
                  width={80} // Example width
                  height={50} // Example height
                />
              </a>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}