import { Github, Linkedin, Twitter, Inbox } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const Footer = () => {
  return (
    <footer className="relative glass-effect-premium border-primary/10 shadow-premium-lg py-16 px-6 mt-24 rounded-xl">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 opacity-30 rounded-xl" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        {/* Title Section with Icon */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
            <Inbox className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Let's Work Together
          </h2>
        </div>
        <p className="text-foreground/60 mb-8 font-light max-w-md mx-auto">
          Reach out on social media or email. I'm always interested in thoughtful collaboration.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-12">
          <SocialLink
            href="https://github.com/Aarnavanand"
            icon={Github}
            label="GitHub"
          />
          <SocialLink
            href="https://www.linkedin.com/in/aarnav-anand-aa163728a/"
            icon={Linkedin}
            label="LinkedIn"
          />
          <SocialLink
            href="https://x.com/_aarnavthakur_"
            icon={Twitter}
            label="Twitter"
          />
        </div>

        {/* Footer Text */}
        <div className="border-t border-foreground/10 pt-8">
          <p className="text-sm text-foreground/50">
            © {new Date().getFullYear()} Aarnav Anand. Designed and engineered with care.
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const SocialLink = ({ href, icon: Icon, label }: SocialLinkProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center h-12 w-12 border border-primary/30 rounded-full bg-primary/10 hover:bg-primary/20 text-primary hover:text-foreground transition-all duration-300 shadow-premium"
      aria-label={label}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
};

export default Footer;
