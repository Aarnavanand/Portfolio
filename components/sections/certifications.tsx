'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Calendar, ExternalLink, GraduationCap } from 'lucide-react'; // Added GraduationCap icon
import { motion } from 'framer-motion';

const certifications = [
  {
    name: 'Frontend (ReactJs)',
    organization: 'Hackerrank',
    date: 'October 2024',
    credential: 'Hackerrank-ReactJS',
    link: 'https://www.hackerrank.com/certificates/06be4281380d',
    badges: ['React', 'Frontend'],
  },
  {
    name: 'Full Stack Web Development',
    organization: 'Udemy',
    date: 'May 2025',
    credential: 'Udemy-ReactJS',
    link: 'https://www.udemy.com/certificate/UC-182602a5-1bc7-4517-a351-996cc2a7cf67/',
    badges: ['JavaScript', 'Frontend Development'],
  },
  {
    name: 'Python',
    organization: 'Hackerrank',
    date: 'september 2024',
    credential: 'Hackerrank-Learning',
    link: 'https://www.hackerrank.com/certificates/f46a68adc6f3',
    badges: ['Python','Artificial Intelligence'],
  },
  {
    name: 'Gen-AI',
    organization: 'Google',
    date: 'March 2024',
    credential: 'Google-cloud-Gen-AI',
    link: 'https://www.linkedin.com/in/aarnav-anand-aa163728a/details/certifications/',
    badges: ['Gen-AI', 'AI'],
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
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">Certifications</h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed font-light">Professional credentials demonstrating expertise and commitment to continuous learning.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert) => (
              <motion.div key={cert.name} variants={cardVariants}>
                <Card className="group relative overflow-hidden p-6 glass-effect-premium shadow-premium-md hover-lift border-primary/5 h-full flex flex-col">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative space-y-4 flex-grow">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-grow">
                        <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">{cert.name}</h3>
                        <p className="text-sm text-foreground/60 font-light">{cert.organization}</p>
                      </div>
                      <Award className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/50">
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
