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
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Full Stack Developer & Problem Solver</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I transform complex ideas into scalable digital solutions — blending clean code, thoughtful design, and modern technologies to create products that matter.
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
                  <h3 className="text-3xl font-bold">Aarnav Anand</h3>
                  <p className="text-primary font-semibold">Full Stack Engineer | B.Tech CSE, SRM University</p>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                  I'm a full stack developer driven by curiosity and a passion for building things that work beautifully. My expertise spans the modern web stack — from intuitive React frontends to robust Node.js backends — and I specialize in the MERN architecture. Currently, I'm focused on crafting production-grade applications that solve real problems while maintaining clean, maintainable code that scales.
                </p>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="flex items-start gap-3">
                    <Rocket className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Full Stack Development</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Web Architecture</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Code className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">System Design</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Coffee className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">Problem Solving</span>
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
