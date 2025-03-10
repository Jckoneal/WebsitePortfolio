import type { Project } from "../types/project";

export const projects: Project[] = [
  {
      id: 1,
      title: "CAD Skateboard tutorial",
      description: "A tutorial on how to design a skateboard in CAD software. This tutorial covers the basics of CAD design and how to create a 3D model of a skateboard.",
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800&h=400&fit=crop",
      tags: ["OnShape", "CAD", "Tutorial"],
      demoUrl: "https://chat.example.com",
      githubUrl: "https://github.com/example/ai-chat",
      blogUrl: "https://www.example.com/blog/ai-chat",
      featured: true
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A personal portfolio website built with Astro and React. Features a modern design, dark mode support, and optimized performance.",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=400&fit=crop",
      tags: ["Astro", "React", "TailwindCSS"],
      demoUrl: "https://portfolio.example.com",
      githubUrl: "https://github.com/example/portfolio",
      blogUrl: "https://www.example.com/blog/ai-chat",
      featured: false
    }
];

