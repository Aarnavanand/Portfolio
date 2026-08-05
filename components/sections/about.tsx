'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Star, Code, Coffee, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { sharedAnimationVariants } from '@/lib/animation-variants';


const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

// Add intersection observer options
const sectionOptions = {
  threshold: 0.1,
  once: true,
  margin: "-100px"
};

export function AboutSection() {
  // Add error boundary
  const [imageError, setImageError] = useState(false);

  return (
    <section id="about" className="scroll-mt-16 py-16">
      <motion.div
        className={cn("space-y-8")}
        initial="hidden"   // Initially hidden
        whileInView="visible"   // Becomes visible when scrolled into view
        viewport={sectionOptions}
        variants={sharedAnimationVariants.containerVariants}  // Uses defined animation variants
      >
        <motion.div key="about-category" variants={cardVariants}>
          <div className="space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2"
            >
              <User className="h-6 w-6 text-primary" />
              <h2 className="text-4xl font-bold tracking-tight">About Me</h2>
            </motion.div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            As a passionate developer, I craft digital experiences that push the boundaries of web technology.
            </p>
          </div>
        </motion.div>

        <motion.div key="card-category" variants={cardVariants}>
          <Card className="relative overflow-hidden border bg-background/60 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <motion.div variants={cardVariants} className="relative flex flex-col md:flex-row items-center gap-6">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                <img
                  src={imageError ? "/fallback-image.svg" : "/loveu.svg"}
                  alt="Profile"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              </div>
              <div className="flex-1 space-y-4 text-center md:text-left">
                <h3 className="text-2xl font-bold">Journey Through Space & Code</h3>
                <p className="text-muted-foreground">
                Hi, I'm Aarnav Anand, a B.Tech CSE student at SRM University. I'm a fresher with a passion for full-stack development and have built several projects. I specialize in the MERN stack and enjoy crafting innovative digital solutions.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-5 w-5 text-primary" />
                    <span>Fresher, Building Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span>MERN Stack Enthusiast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <span>Full Stack Developer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-primary" />
                    <span>∞ Coffee Consumed</span>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start gap-2 mt-4">
                  <Badge variant="secondary">Full Stack Developer</Badge>
                  <Badge variant="secondary">MERN Stack</Badge>
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
