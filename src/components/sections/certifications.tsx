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
    name: 'JavaScript',
    organization: 'Hackerrank',
    date: 'October 2024',
    credential: 'Hackerrank-JavaScript',
    link: 'https://www.hackerrank.com/certificates/2b9e2324ae4c',
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
    <section id="certifications" className="scroll-mt-16 py-16">
      <motion.div initial="hidden" whileInView="visible" variants={containerVariants}>
        <div className="space-y-6">
          {/* Title Section with Icon */}
          <div className="flex justify-center items-center gap-3 text-center">
            <GraduationCap className="h-6 w-6 text-primary flex-shrink-0" /> 
            <h2 className="text-4xl font-bold tracking-tighter leading-none">Certifications</h2>
          </div>
          <p className="text-muted-foreground text-center">Professional certifications</p>

          <div className="grid gap-6 md:grid-cols-2">
            {certifications.map((cert) => (
              <motion.div key={cert.name} variants={cardVariants}>
                <Card
                  className="relative overflow-hidden border bg-background/60 p-6 backdrop-blur supports-[backdrop-filter]:bg-background/60"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />
                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold">{cert.name}</h3>
                        <p className="text-sm text-muted-foreground">{cert.organization}</p>
                      </div>
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{cert.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cert.badges.map((badge) => (
                        <Badge key={badge} variant="secondary">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="h-4 w-4" />
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {cert.credential}
                      </a>
                    </div>
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
