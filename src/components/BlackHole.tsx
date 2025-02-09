import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  MoonStar,
  Rocket,
  Sun,
  Menu,
  X,
  User,
  FolderKanban,
  Trophy,
  Lightbulb,
  GraduationCap,
  Mail,
  ChevronRight,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { SpaceBackground } from '@/components/space-background';
import { SpaceObjects } from '@/components/space-objects';
import { AboutSection } from '@/components/sections/about';
import { ProjectsSection } from '@/components/sections/projects';
import { AchievementsSection } from '@/components/sections/achievements';
import { SkillsSection } from '@/components/sections/skills';
import { CertificationsSection } from '@/components/sections/certifications';
import { ContactSection } from '@/components/sections/contact';
import { cn } from '@/lib/utils';
import './blackHole.css';

interface BlackHoleProps {
  active: boolean;
  position: { x: number; y: number };
  onReset: () => void;
}

export function BlackHole({ active, onReset }: BlackHoleProps) {
  const [rotation, setRotation] = useState(0);
  const [collisionDelay, setCollisionDelay] = useState(false);

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => onReset(), 3000); // Reset after 3 seconds
    return () => clearTimeout(timer);
  }, [active, onReset]);

  // Continuous rotation animation
  useEffect(() => {
    if (!active) return;
    let animationFrame: number;
    const animate = () => {
      setRotation(prev => (prev + 0.2) % 360);
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [active]);

  // Handle collision with delay
  const handleCollision = () => {
    if (!collisionDelay) {
      setCollisionDelay(true);
      // Logic for collision
      setTimeout(() => {
        setCollisionDelay(false); // Reset delay after some time
      }, 2000); // 2 seconds delay
    }
  };

  // Create random star positions
  const stars = useMemo(() => {
    const starElements = [];
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      starElements.push(
        <div
          key={`star-${i}`}
          className="stars"
          style={{ '--x': `${x}%`, '--y': `${y}%` } as React.CSSProperties}
        />
      );
    }
    return starElements;
  }, []);

  // Create star trails
  const starTrails = useMemo(() => {
    const trails = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i * 15) % 360;
      const distance = 100 + Math.random() * 50;
      trails.push(
        <div
          key={`trail-${i}`}
          className="star-trail"
          style={{
            '--angle': `${angle}deg`,
            '--distance': `${distance}px`,
          } as React.CSSProperties}
        />
      );
    }
    return trails;
  }, []);

  if (!active) return null;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="black-hole-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="star-field">{stars}</div>
          {starTrails}
          
          <div className="black-hole-wrapper" onClick={handleCollision}>
            {/* Outer Glow */}
            <div className="outer-glow" />
            
            {/* Gravitational Trails */}
            <div className="gravitational-trails-container" style={{ transform: `rotate(${rotation}deg)` }}>
              {starTrails}
            </div>
            
            {/* Event Horizon */}
            <div className="event-horizon">
              <div className="event-horizon-inner" />
              <div className="event-horizon-glow" />
            </div>
            
            {/* Light Distortion Rings */}
            {[...Array(3)].map((_, i) => (
              <div
                key={`light-ring-${i}`}
                className="light-distortion-ring"
                style={{
                  '--ring': i,
                  '--total-rings': 3,
                } as React.CSSProperties}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Layout() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navItems = [
    { href: '#about', label: 'About', icon: User },
    { href: '#projects', label: 'Projects', icon: FolderKanban },
    { href: '#achievements', label: 'Achievements', icon: Trophy },
    { href: '#skills', label: 'Skills', icon: Lightbulb },
    { href: '#certifications', label: 'Certifications', icon: GraduationCap },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 0);
    });
  }, [scrollY]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <SpaceBackground />
      <SpaceObjects setIsBlackHoleActive={function (_active: boolean): void {
        throw new Error('Function not implemented.');
      } } />
      
      {/* Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isScrolled ? -2 : 0 }}
        className={cn(
          "fixed top-0 w-full border-b z-50 transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur-lg shadow-lg"
            : "bg-background/80 backdrop-blur-sm"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <Rocket className="h-7 w-7 text-primary" />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-primary/20 blur-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">Space Portfolio</span>
              <span className="text-xs text-muted-foreground">Explore the Universe</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="ghost"
                  className="relative group px-4"
                  asChild
                >
                  <a href={item.href}>
                    <item.icon className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
                    {item.label}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.2 }}
                    />
                  </a>
                </Button>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="ml-2 relative"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  {theme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <MoonStar className="h-5 w-5" />
                  )}
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/10"
                  whileHover={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
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
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 md:hidden"
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
                        onClick={handleNavClick}
                      >
                        <a href={item.href} className="relative">
                          <span className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-primary" />
                            {item.label}
                          </span>
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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

                {/* Theme Toggle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-auto p-4 border-t"
                >
                  <Button
                    variant="outline"
                    className="w-full relative overflow-hidden group"
                    onClick={() => {
                      setTheme(theme === 'dark' ? 'light' : 'dark');
                      handleNavClick();
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary/10"
                      whileHover={{ scale: 1.5, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="flex items-center justify-center gap-2">
                      {theme === 'dark' ? (
                        <>
                          <Sun className="h-5 w-5" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <MoonStar className="h-5 w-5" />
                          Dark Mode
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mt-16 py-16 relative z-10">
        <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold sm:text-6xl">
              Welcome to My Space Portfolio
            </h1>
            <p className="text-lg text-muted-foreground sm:text-xl">
              Exploring the universe of web development, one project at a time.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <a href="#projects">View Projects</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>
          </div>
        </section>

        <div className="space-y-32 py-32">
          <AboutSection />
          <ProjectsSection />
          <AchievementsSection />
          <SkillsSection />
          <CertificationsSection />
          <ContactSection />
          <Layout/>
        </div>
      </main>
    </div>
  );
}

export default Layout;