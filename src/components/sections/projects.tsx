import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight,  Globe } from "lucide-react";
// BrainCircuit
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";

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

type Sliders = {
  [key: string]: React.RefObject<any>;
};

// Mapping category names to icons
const categoryIcons: { [key: string]: React.ElementType } = {
  // "AI/ML Projects": BrainCircuit,
  "Web Projects": Globe
};

const projectCategories: ProjectCategories = {
  // "AI/ML Projects": [
  //   {
  //     title: "AI Chatbot 1",
  //     description: "A chatbot powered by GPT models",
  //     image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  //     tags: ["Python", "TensorFlow", "ChatGPT API"],
  //     demoUrl: "#",
  //     githubUrl: "#",
  //   },
  //   {
  //     title: "AI Chatbot 1",
  //     description: "A chatbot powered by GPT models",
  //     image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  //     tags: ["Python", "TensorFlow", "ChatGPT API"],
  //     demoUrl: "#",
  //     githubUrl: "#",
  //   },
  //   {
  //     title: "AI Chatbot 1",
  //     description: "A chatbot powered by GPT models",
  //     image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  //     tags: ["Python", "TensorFlow", "ChatGPT API"],
  //     demoUrl: "#",
  //     githubUrl: "#",
  //   },
  //   {
  //     title: "AI Chatbot 1",
  //     description: "A chatbot powered by GPT models",
  //     image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
  //     tags: ["Python", "TensorFlow", "ChatGPT API"],
  //     demoUrl: "#",
  //     githubUrl: "#",
  //   },
  // ],
  "Web Projects": [
    {
      title: "Cosmic Chat 1",
      description: "Real-time chat application with space-themed UI",
      image: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800&auto=format&fit=crop&q=80",
      tags: ["React", "Node.js", "WebSocket", "Tailwind"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Cosmic Chat 1",
      description: "Real-time chat application with space-themed UI",
      image: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800&auto=format&fit=crop&q=80",
      tags: ["React", "Node.js", "WebSocket", "Tailwind"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Cosmic Chat 1",
      description: "Real-time chat application with space-themed UI",
      image: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800&auto=format&fit=crop&q=80",
      tags: ["React", "Node.js", "WebSocket", "Tailwind"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Cosmic Chat 1",
      description: "Real-time chat application with space-themed UI",
      image: "https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=800&auto=format&fit=crop&q=80",
      tags: ["React", "Node.js", "WebSocket", "Tailwind"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ],
};

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

export function ProjectsSection() {
  const sliders: Sliders = Object.keys(projectCategories).reduce((acc, key) => {
    acc[key] = useRef(null);
    return acc;
  }, {} as Sliders);

  return (
    <section id="projects" className="scroll-mt-16">
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
      >
        {Object.entries(projectCategories).map(([category, projects]) => {
          const Icon = categoryIcons[category] || Globe;

          return (
            <div key={category} className="space-y-4">
              <div className="flex items-center justify-between text-center">
                <div className="flex items-center gap-2">
                  <Icon className="h-6 w-6 text-primary" />
                  <h2 className="text-3xl font-bold tracking-tighter">{category}</h2>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => sliders[category].current?.swiper?.slidePrev()}
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => sliders[category].current?.swiper?.slideNext()}
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <Swiper
                ref={sliders[category]}
                spaceBetween={16}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 1.5 },
                  768: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {projects.map((project, index) => (
                  <SwiperSlide key={`${project.title}-${index}`}>
                    <motion.div key={project.title} variants={cardVariants}>
                      <Card className="group relative overflow-hidden border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
                        <div className="relative">
                          <div className="aspect-video w-full overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div className="p-6 space-y-4">
                            <h3 className="text-xl font-bold">{project.title}</h3>
                            <p className="text-muted-foreground">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-4">
                              <Button size="sm" asChild>
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Demo
                                </a>
                              </Button>
                              <Button size="sm" variant="outline" asChild>
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="mr-2 h-4 w-4" />
                                  Code
                                </a>
                              </Button>
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
