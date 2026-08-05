'use client';

import { useRef, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight, Globe, Github } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import { motion } from "framer-motion";
import { sharedAnimationVariants } from "@/lib/animation-variants";

// Define the type for project categories
type ProjectCategory = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
};

type ProjectCategories = {
  [key: string]: ProjectCategory[];
};

// Mapping category names to icons
const categoryIcons: { [key: string]: React.ElementType } = {
  "Web Projects": Globe
};

const projectCategories: ProjectCategories = {
  "Web Projects": [ 
    {
      title: "Algorithm Visualizer",
      description: "An interactive platform that brings computer science algorithms to life. Visualize sorting, searching, and pathfinding algorithms in real-time with customizable inputs and step-by-step execution.",
      image: "/Algorithm-Visualizer.png",
      tags: ["React", "Framer Motion", "TypeScript", "Tailwind"],
      demoUrl: "https://visual-algorithm-lab.vercel.app/",
      githubUrl: "#",
    },
    {
      title: "Interactive Web Randomization System",
      description: "A sophisticated system for managing randomized data workflows. Built with scalable architecture to handle complex randomization logic — perfect for applications requiring probabilistic data generation.",
      image: "/IWRSv1.png",
      tags: ["Next.js", "MongoDB", "Tailwind", "Next.js API Routes"],
      demoUrl: "https://interactive-web-randomization-system.vercel.app/",
      githubUrl: "#",
    },
    {
      title: "Enterprise Resource Planner",
      description: "A comprehensive ERP solution designed for educational institutions. Streamlines resource allocation, student management, and administrative workflows with an intuitive interface and powerful backend.",
      image: "/ERPv1.jpg",
      tags: ["Next.js", "PostgreSQL", "Tailwind", "shadcn UI"],
      demoUrl: "https://skoolmate.vercel.app/",
      githubUrl: "#",
    },
    {
      title: "Code Hangman",
      description: "A gamified learning experience that challenges developers to master programming concepts through an engaging hangman-style interface. Perfect for quick skill checks and concept reinforcement.",
      image: "/hangman.png",
      tags: ["React", "Tailwind", "TypeScript", "Framer Motion"],
      demoUrl: "https://hangman-code-game.vercel.app/",
      githubUrl: "#",
    },
  ],
  " AI/ML Projects": [
     {
       title: "Meddy Buddy",
       description: "An intelligent medicine recommendation engine powered by machine learning. Analyzes patient medication history to suggest alternative pharmaceuticals — helping users discover optimal drug alternatives with precision.",
       image: "/meddypuddy.png",
       tags: ["Streamlit", "Pandas", "NumPy", "Scikit-learn", "Pickle"],
       demoUrl: " https://medi-buddy.streamlit.app/",
       githubUrl: "",
     },
     {
       title: "Movie Recommendation System",
       description: "A personalized content discovery platform using collaborative filtering algorithms. Analyzes user preferences and viewing patterns to deliver highly accurate movie recommendations tailored to individual taste.",
       image: "/movie.png",
       tags: ["Streamlit", "Scipy", "Plotly", "Joblib", "Collaborative Filtering"],
       demoUrl: "https://arnavanand.streamlit.app/",
       githubUrl: "#",
     },
     {
       title: "CommandPal",
       description: "Bridge the gap between natural language and terminal commands. This AI-powered tool translates human-readable instructions into precise CLI commands using Google's Gemini API — making command-line interfaces accessible to everyone.",
       image: "/commandpal.png",
       tags: ["Next.js", "TypeScript", "Gemini API", "shadcn UI", "Generative AI"],
       demoUrl: "https://command-pal.vercel.app/",
       githubUrl: "#",
     },
     {
       title: "AI Chatbot",
       description: "A modern conversational interface powered by Google Gemini. Delivers intelligent, context-aware responses with a polished UI — demonstrating sophisticated integration of generative AI within production-grade web applications.",
       image: "/chat-bot.png",
       tags: ["Next.js", "TypeScript", "Gemini API", "shadcn UI", "Generative AI"],
       demoUrl: "https://genai-chatbot-five.vercel.app/",
       githubUrl: "#",
     },
    {
      title: "Text Analytics Platform",
      description: "Advanced text processing and analysis tool leveraging NLP techniques to extract meaningful insights from unstructured data. Transforms raw text into actionable intelligence through machine learning-driven analysis.",
      image: "/text-analytics.png",
      tags: ["Python", "Streamlit", "Scikit-learn", "PyTorch", "NLP"],
      demoUrl: "#",
      githubUrl: "https://github.com/Aarnavanand/text-analytics",
    },
    {
      title: "Image Classification",
      description: "A project that classifies images using machine learning,I used various mdoel but the final pipeline is base on ResNet-18 model. This project demonstrates the use of PyTorch image clf tasks.",
      image: "/imgclassification.png",
      tags: ["Python", "pytorch", "clearml"],
      demoUrl: "#",
      githubUrl: "https://github.com/Aarnavanand/image-classification-ML",
    },
  ],
};

export function ProjectsSection() {
  // 1. First, declare all hooks at the top level
  const swiperRefs = useRef<{ [key: string]: SwiperClass | null }>({});

  // 2. Memoize the categories
  const categories = useMemo(() => Object.keys(projectCategories), []);

  // 3. Memoize slide navigation handler
  const handleSlideNav = useCallback((direction: 'prev' | 'next', category: string) => {
    const swiper = swiperRefs.current[category];
    if (!swiper) return;
    
    if (direction === 'prev') {
      swiper.slidePrev();
    } else {
      swiper.slideNext();
    }
  }, []);

  // 4. Memoize swiper initialization handler
  const handleSwiperInit = useCallback((swiper: SwiperClass, category: string) => {
    swiperRefs.current[category] = swiper;
  }, []);

  return (
    <section id="projects" className="scroll-mt-20 py-24">
      <motion.div
        className="space-y-16"
        initial="hidden"
        whileInView="visible"
        variants={sharedAnimationVariants.containerVariants}
      >
        <div className="space-y-6 text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            <Globe className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Case Studies</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">Selected Work</h2>
          <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Projects that demonstrate thoughtful engineering, solid architecture, and attention to both technical and user experience details.
          </p>
        </div>

        {categories.map((category) => {
          const projects = projectCategories[category];
          const Icon = categoryIcons[category] || Globe;

          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">{category}</h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSlideNav('prev', category)}
                    className="hover:bg-primary/10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleSlideNav('next', category)}
                    className="hover:bg-primary/10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <Swiper
                onSwiper={(swiper) => handleSwiperInit(swiper, category)}
                spaceBetween={24}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 1.5 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 2.5 },
                  1440: { slidesPerView: 3 },
                }}
              >
                {projects.map((project, index) => (
                  <SwiperSlide key={`${project.title}-${index}`}>
                    <motion.div variants={sharedAnimationVariants.cardVariants}>
                      <Card className="group relative overflow-hidden flex flex-col h-full hover:shadow-premium-lg transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative flex flex-col h-full">
                          <div className="aspect-video w-full overflow-hidden bg-background/50">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>
                          <div className="p-6 space-y-4 flex flex-col flex-grow">
                            <div className="space-y-2 flex-grow">
                              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{project.title}</h3>
                              <p className="text-sm text-foreground/70 leading-relaxed">{project.description}</p>
                            </div>
                            <div className="space-y-4 pt-2">
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-3 pt-2">
                                {project.demoUrl && project.demoUrl !== "#" && (
                                  <Button size="sm" asChild className="flex-1">
                                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      Demo
                                    </a>
                                  </Button>
                                )}
                                {project.githubUrl && project.githubUrl !== "#" && (
                                  <Button size="sm" variant="outline" asChild className="flex-1">
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                      <Github className="mr-2 h-4 w-4" />
                                      Code
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
