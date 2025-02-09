import { Github, Linkedin, Twitter, Inbox } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const Footer = () => {
  return (
    <footer className="relative bg-background/50 border border-gray-700 shadow-lg rounded-xl py-16 px-6 backdrop-blur-md">
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Title Section with Icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Inbox className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Let's Connect
          </h2>
        </div>
        <p className="text-gray-400 mb-6">
          Follow me on social media or drop me an eInbox!
        </p>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-6">
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
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Aarnav Anand. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

const SocialLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center h-12 w-12 border-2 border-gray-600 rounded-full bg-gray-800 hover:bg-primary hover:border-primary transition-all duration-300 transform hover:scale-110 shadow-md"
      aria-label={label}
    >
      <Icon className="h-6 w-6 text-white" />
    </a>
  );
};

export default Footer;
