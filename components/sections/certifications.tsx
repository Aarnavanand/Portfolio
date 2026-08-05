'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, ExternalLink, GraduationCap } from 'lucide-react'; // Added GraduationCap icon
import { motion } from 'framer-motion';

const certifications = [
  {
    name: 'Frontend Development with React',
    organization: 'HackerRank',
    date: 'October 2024',
    credential: 'Verified Credential',
    link: 'https://www.hackerrank.com/certificates/06be4281380d',
    badges: ['React', 'JavaScript', 'Advanced'],
  },
  {
    name: 'Full Stack Web Development Specialization',
    organization: 'Udemy',
    date: 'May 2025',
    credential: 'Verified Credential',
    link: 'https://www.udemy.com/certificate/UC-182602a5-1bc7-4517-a351-996cc2a7cf67/',
    badges: ['MERN Stack', 'Backend', 'Databases'],
  },
  {
    name: 'Python Programming Mastery',
    organization: 'HackerRank',
    date: 'September 2024',
    credential: 'Verified Credential',
    link: 'https://www.hackerrank.com/certificates/f46a68adc6f3',
    badges: ['Python', 'Backend', 'Scripting'],
  },
  {
    name: 'Generative AI Fundamentals',
    organization: 'Google Cloud',
    date: 'March 2024',
    credential: 'Verified Credential',
    link: 'https://www.linkedin.com/in/aarnav-anand-aa163728a/details/certifications/',
    badges: ['AI/ML', 'LLMs', 'Cloud'],
  }
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

export function CertificationsSection() {
  return (
    <section id="certifications" className="scroll-mt-20 py-24">
      <motion.div initial="hidden" whileInView="visible" variants={containerVariants}>
        <div className="space-y-12">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary" />
              <GraduationCap className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-widest">Credentials</span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Certifications</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">Professional credentials from industry-leading organizations</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert) => (
              <motion.div key={cert.name} variants={cardVariants}>
                <Card className="group relative overflow-hidden p-6 hover:shadow-premium-lg transition-all duration-300 h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative space-y-4 flex-grow">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-grow">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.organization}</p>
                      </div>
                      <Award className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{cert.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {cert.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs pt-4 border-t border-border/30 mt-4 pt-4">
                    <ExternalLink className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline truncate font-medium"
                    >
                      View Credential
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
