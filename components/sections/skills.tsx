'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
// import { progressVariants } from '@/components/ui/progress';
import {
  Code2,
  Layout,
  Database,
  Terminal,
  Sparkles,
} from 'lucide-react';
import { debounce } from 'lodash';

const skills = [
  {
    category: 'Frontend Development',
    icon: Layout,
    description: 'Crafting pixel-perfect, responsive interfaces with modern tools',
    items: [
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'JavaScript/ES6+', level: 92 },
      { name: 'React & Next.js', level: 88 },
    ],
  },
  {
    category: 'Backend Development',
    icon: Code2,
    description: 'Engineering scalable, performant server architectures',
    items: [
      { name: 'Node.js & Express', level: 90 },
      { name: 'Next.js Full Stack', level: 92 },
      { name: 'Python', level: 70 },
      { name: 'API Design & REST', level: 88 },
    ],
  },
  {
    category: 'Database & Cloud',
    icon: Database,
    description: 'Designing data systems and deploying at scale',
    items: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'AWS Services', level: 80 },
      { name: 'Database Design', level: 88 },
    ],
  },
  {
    category: 'Developer Tools',
    icon: Terminal,
    description: 'Mastering workflows and modern development practices',
    items: [
      { name: 'Git & GitHub', level: 95 },
      { name: 'Vercel & Deployment', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'Dev Tools & Debugging', level: 90 },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const progressVariants = {
  hidden: { width: 0 },
  visible: (value: number) => ({
    width: `${value}%`,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  }),
};

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  // Memoize skill items to prevent unnecessary re-renders
  const skillItems = useMemo(() => skills.map(category => ({
    ...category,
    items: category.items.map(skill => ({
      ...skill,
      isHovered: hoveredSkill === skill.name
    }))
  })), [hoveredSkill]);

  // Debounced hover handler
  const debouncedSetHoveredSkill = useCallback(
    debounce((skillName: string | null) => {
      setHoveredSkill(skillName);
    }, 50),
    []
  );

  return (
    <section id="skills" className="scroll-mt-20 py-24">
      <motion.div
        className="space-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-3 mx-auto"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-widest">Expertise</span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Technical Skills</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise across frontend, backend, database, and cloud technologies.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillItems.map((category) => (
            <motion.div key={category.category} variants={cardVariants}>
              <Card className="relative overflow-hidden group h-full hover:shadow-premium-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative space-y-6 p-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-glow">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold">{category.category}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {category.items.map((skill) => (
                      <motion.div
                        key={skill.name}
                        className="space-y-2.5"
                        onHoverStart={() => debouncedSetHoveredSkill(skill.name)}
                        onHoverEnd={() => debouncedSetHoveredSkill(null)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold">{skill.name}</span>
                          <span className={`text-xs font-medium transition-all duration-200 ${
                            skill.isHovered ? 'text-primary scale-110' : 'text-muted-foreground'
                          }`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-border/30 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={progressVariants}
                            custom={skill.level}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
