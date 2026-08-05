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
    description: 'Building beautiful, responsive user interfaces',
    items: [
      { name: 'HTML/CSS', level: 95 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'ReactJS', level: 75 },
      // { name: 'Streamlit', level: 60 },
    ],
  },
  {
    category: 'Backend Development',
    icon: Code2,
    description: 'Creating robust server-side applications',
    items: [
      { name: 'Node.js', level: 90 },
      { name: 'ExpressJS', level: 85 },
      { name: 'Python', level: 65 },
      { name: 'Nextjs', level: 90 },
    ],
  },
  {
    category: 'Database & Cloud',
    icon: Database,
    description: 'Managing data and cloud infrastructure',
    items: [
      { name: 'PostgreSQL', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'MySQL', level: 75 },
    ],
  },
  {
    category: 'Tools & Others',
    icon: Terminal,
    description: 'Development tools and practices',
    items: [
      { name: 'Git', level: 95 },
      { name: 'Vercel', level: 85 },
      { name: 'Github Copilot', level: 90 },
      { name: 'AI Editor', level: 85 },
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
    <section id="skills" className="scroll-mt-16 py-16">
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        // viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2"
          >
            <Sparkles className="h-6 w-6 text-primary" />
            <h2 className="text-4xl font-bold tracking-tight">Skills & Expertise</h2>
          </motion.div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiencies across different domains
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2  mx-auto ">
          {skillItems.map((category) => (
            <motion.div key={category.category} variants={cardVariants}>
              <Card className="relative overflow-hidden border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 group hover:shadow-lg transition-shadow duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity" />
                <div className="relative space-y-6 p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">{category.category}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {category.items.map((skill) => (
                      <motion.div
                        key={skill.name}
                        className="space-y-2"
                        onHoverStart={() => debouncedSetHoveredSkill(skill.name)}
                        onHoverEnd={() => debouncedSetHoveredSkill(null)}
                      >
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{skill.name}</span>
                          <span className={`transition-colors duration-200 ${
                            skill.isHovered ? 'text-primary' : 'text-muted-foreground'
                          }`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-primary/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-primary"
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
