'use client';

import { Card } from "@/components/ui/card";
import { Trophy, Award, Medal } from "lucide-react"; // Import Medal icon
import { motion } from "framer-motion";
// Star, Target,
const achievements = [
  {
    icon: Trophy,
    title: "Ideathon Champion",
    description: "Won first place at Engineer's Day Ideathon — presented and pitched an innovative full-stack solution to a panel of industry experts.",
    year: "2023",
  },
  {
    icon: Award,
    title: "Web3 Workshop Participant",
    description: "Advanced training at IIT Delhi — deepened knowledge of blockchain architecture and decentralized systems from leading practitioners.",
    year: "2024",
  }
  // {
  //   icon: Star,
  //   title: "Top Contributor",
  //   description: "Most active developer in the community",
  //   year: "2023",
  // },
  // {
  //   icon: Target,
  //   title: "Performance Champion",
  //   description: "Optimized critical systems for 300% improvement",
  //   year: "2022",
  // },
];

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

export function AchievementsSection() {
  return (
    <section id="achievements" className="scroll-mt-20 py-24">
      <motion.div initial="hidden" whileInView="visible" variants={containerVariants}>
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
              <Medal className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Milestones</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Achievements</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Notable accomplishments and recognition throughout my career journey</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;

              return (
                <motion.div key={achievement.title} variants={cardVariants} initial="hidden" whileInView="visible">
                  <Card className="group relative overflow-hidden p-6 hover:shadow-premium-lg transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-glow">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2 flex-grow">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
                        <p className="text-xs font-semibold text-primary pt-1">{achievement.year}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
