import React from 'react';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {project.featured && (
          <span className="absolute top-4 right-4 bg-jackoneal-yellow-600 text-white px-3 py-1 rounded-full text-sm">
            Featured
          </span>
        )}
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-jackoneal-yellow-900 mb-2">
          {project.title}
        </h3>
        <p className="text-jackoneal-yellow-600 mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              data-tag={tag.toLowerCase()}
              className="px-3 py-1 bg-jackoneal-yellow-50 text-jackoneal-yellow-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 border border-jackoneal-yellow-600 text-jackoneal-yellow-600 rounded-xl hover:bg-jackoneal-yellow-700 transition-colors"
            >
              Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 border border-jackoneal-yellow-600 text-jackoneal-yellow-600 rounded-xl hover:bg-jackoneal-yellow-50 transition-colors"
            >
              View Code
            </a>
          )}
          {project.blogUrl && (
            <a
              href={project.blogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 border border-jackoneal-yellow-600 text-jackoneal-yellow-600 rounded-xl hover:bg-jackoneal-yellow-50 transition-colors"
            >
              View Blog
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
