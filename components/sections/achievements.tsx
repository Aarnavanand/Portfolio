'use client';

import { Card } from "@/components/ui/card";
import { Trophy, Award, Medal } from "lucide-react"; // Import Medal icon
import { motion } from "framer-motion";
// Star, Target,
const achievements = [
  {
    icon: Trophy,
    title: "Ideathon Winner",
    description: "Ideathon - Engineer's Day Event at SRM University",
    year: "2023",
  },
  {
    icon: Award,
    title: "Attended Web3 Workshop",
    description: "Web3 Workshop at IIT Delhi",
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
    <section id="achievements" className="scroll-mt-16 py-16">
      <motion.div initial="hidden" whileInView="visible" variants={containerVariants}>
        <div className="space-y-6">
          {/* Title Section with Icon */}
          <div className="flex items-center justify-center gap-3 text-center mb-4">
          <div className="flex h-10 w-10 items-center justify-center">
            <Medal className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-4xl font-bold tracking-tight">Achievements</h2>
        </div>
          <p className="text-muted-foreground text-center">Milestones reached in my journey</p>

          <div className="grid gap-6 md:grid-cols-2">
            {achievements.map((achievement) => {
              const Icon = achievement.icon; // Ensure icon component is capitalized

              return (
                <motion.div key={achievement.title} variants={cardVariants} initial="hidden" whileInView="visible">
                  <Card className="relative overflow-hidden border bg-background/60 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
                    <div className="relative flex gap-4">
                      {/* Icon */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary" />
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <p className="text-sm font-medium text-primary">{achievement.year}</p>
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
