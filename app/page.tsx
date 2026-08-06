'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  Menu,
  X,
  User,
  FolderKanban,
  Trophy,
  Lightbulb,
  GraduationCap,
  Mail,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpaceBackground } from '@/components/space-background';
import { SpaceObjects } from '@/components/space-objects';
import { AboutSection } from '@/components/sections/about';
import { ProjectsSection } from '@/components/sections/projects';
import { AchievementsSection } from '@/components/sections/achievements';
import { SkillsSection } from '@/components/sections/skills';
import { CertificationsSection } from '@/components/sections/certifications';
import { ContactSection } from '@/components/sections/contact';
import { cn } from '@/lib/utils';
import Footer from '@/components/sections/Footer';
import React from 'react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const handleScroll = useCallback((latest: number) => {
    setIsScrolled(latest > 0);
  }, []);

  useEffect(() => {
    return scrollY.on('change', handleScroll);
  }, [scrollY, handleScroll]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMenuOpen(false);

      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    },
    []
  );

  const navItems: NavItem[] = useMemo(
    () => [
      { href: '#about', label: 'About', icon: User },
      { href: '#projects', label: 'Projects', icon: FolderKanban },
      { href: '#achievements', label: 'Achievements', icon: Trophy },
      { href: '#skills', label: 'Skills', icon: Lightbulb },
      { href: '#certifications', label: 'Certifications', icon: GraduationCap },
      { href: '#contact', label: 'Contact', icon: Mail },
    ],
    []
  );

  return (
    <div className="relative z-50 min-h-screen bg-background text-foreground">
      <SpaceBackground />
      <SpaceObjects className="fixed inset-0 z-0" />

      {/* Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
          isScrolled 
            ? 'glass-effect-strong shadow-premium-md border-primary/10' 
            : 'glass-effect border-transparent'
        )}
      >
        <div className="w-full max-w-6xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <img
                src="/Asset3.svg"
                alt="Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 text-primary"
              />
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 flex items-center gap-2 group"
                >
                  <item.icon className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span>{item.label}</span>
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="md:hidden"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(true)}
              className="relative"
            >
              <Menu className="h-6 w-6" />
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-lg z-50 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Slide-out Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="fixed right-0 top-0 bottom-0 w-[300px] bg-background/95 backdrop-blur-md border-l z-50 md:hidden overflow-hidden"
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border-b"
                >
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="text-lg font-bold">Navigation</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:rotate-90 transition-transform duration-200"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>

                {/* Menu Items */}
                <nav className="flex flex-col p-4 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-between group hover:bg-primary/10"
                        asChild
                      >
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="relative"
                        >
                          <span className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-primary" />
                            {item.label}
                          </span>
                          <motion.div
                            className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary"
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.2 }}
                          />
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="w-full mx-auto max-w-6xl py-16 relative z-10 px-4 sm:px-6 md:px-8 lg:px-10">
        <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
          <motion.div
            className="space-y-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
              style={{
                backgroundImage: `url('/textures/noise.png'), linear-gradient(to right, #6366F1, #9333EA)`,
                backgroundSize: '200px, cover',
                backgroundBlendMode: 'overlay',
              }}
            >
              Hey, I&apos;m Aarnav Anand
            </h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              A full-stack developer and an undergraduate student, crafting immersive digital experiences—one project at a time.
            </motion.p>

            <motion.div
              className="flex justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <Button
                size="lg"
                asChild
                className="hover:shadow-lg hover:shadow-primary/50 transition duration-300"
              >
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, '#projects')}
                >
                  Explore My Universe
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="hover:shadow-lg hover:shadow-purple-500/50 transition duration-300"
              >
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                >
                  Let&apos;s Connect
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <div>
          <div id="about">
            <AboutSection />
          </div>
          <div id="projects">
            <ProjectsSection />
          </div>
          <div id="achievements">
            <AchievementsSection />
          </div>
          <div id="skills">
            <SkillsSection />
          </div>
          <div id="certifications">
            <CertificationsSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
          <Footer />
        </div>
      </main>
    </div>
  );
}
