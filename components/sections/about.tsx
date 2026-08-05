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
    <section id="about" className="scroll-mt-20 py-24">
      <motion.div
        className={cn("space-y-12")}
        initial="hidden"
        whileInView="visible"
        viewport={sectionOptions}
        variants={sharedAnimationVariants.containerVariants}
      >
        <motion.div key="about-category" variants={cardVariants}>
          <div className="space-y-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center gap-3 mx-auto"
            >
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
              <User className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">About</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">Software Engineer with System Design Focus</h2>
            <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed font-light">
              I engineer products with architectural rigor and design discipline. My approach balances technical depth with user-centered thinking—building systems that scale cleanly and interfaces that feel intuitive.
            </p>
          </div>
        </motion.div>

        <motion.div key="card-category" variants={cardVariants}>
          <Card className="relative overflow-hidden p-8 md:p-12">
            <motion.div variants={cardVariants} className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="shrink-0 w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden border border-border/40 shadow-premium-lg">
                <img
                  src={imageError ? "/fallback-image.svg" : "/loveu.svg"}
                  alt="Profile"
                  className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
              </div>
              <div className="flex-1 space-y-6 text-center md:text-left">
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold text-foreground">Aarnav Anand</h3>
                  <p className="text-primary font-semibold text-base">Software Engineer | System Designer | B.Tech CSE</p>
                </div>
                <p className="text-base text-foreground leading-relaxed max-w-lg">
                  I'm a software engineer who believes that great products emerge from the intersection of technical excellence and thoughtful design. My work spans full-stack development—with deep expertise in MERN and Next.js architectures—but my focus extends beyond code. I think critically about system design patterns, design systems, product architecture, and how technical decisions impact user experience. I've built production applications handling complex requirements, and I approach each project with rigor around scalability, maintainability, and craft.
                </p>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">Full Stack Engineering</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">System Architecture</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Rocket className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">Design Systems</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Coffee className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">Product Design</span>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start gap-2 pt-2">
                  <Badge variant="secondary">React & Next.js</Badge>
                  <Badge variant="secondary">Node.js & Express</Badge>
                  <Badge variant="secondary">Cloud Deployment</Badge>
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
