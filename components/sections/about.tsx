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
    <section id="about" className="scroll-mt-20 py-20 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
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
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Software Engineer & System Designer</h2>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light">
              Designing scalable systems and thoughtful user experiences. I combine technical rigor with design discipline to build products that feel inevitable.
            </p>
          </div>
        </motion.div>

        <motion.div key="card-category" variants={cardVariants}>
          <Card className="relative overflow-hidden p-8 md:p-12 glass-effect-premium shadow-premium-lg border-primary/5 hover-lift">
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
                  <h3 className="text-4xl font-bold text-foreground">Aarnav Anand</h3>
                  <p className="text-primary font-semibold text-base">Software Engineer & Systems Designer</p>
                </div>
                <p className="text-base text-foreground/70 leading-relaxed max-w-lg font-light">
                  I engineer products at the intersection of technical depth and design sophistication. My background spans full-stack development, system architecture, and design systems. I think deeply about how engineering decisions ripple through user experiences.
                </p>
                <div className="grid grid-cols-2 gap-6 py-6 border-t border-foreground/5 pt-8">
                  <div className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-foreground block">Full Stack Engineering</span>
                      <span className="text-xs text-foreground/50">React, Node.js, Systems</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-foreground block">System Architecture</span>
                      <span className="text-xs text-foreground/50">Design & Scale</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Rocket className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-foreground block">Design Systems</span>
                      <span className="text-xs text-foreground/50">Components & Patterns</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Coffee className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-foreground block">Product Thinking</span>
                      <span className="text-xs text-foreground/50">User-Centered</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Full Stack</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">System Design</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">Product Engineering</Badge>
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  );
}
