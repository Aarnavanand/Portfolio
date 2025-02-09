import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import {
  // Rocket,
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
import { SpaceBackground } from '@/components/space-background';
import { SpaceObjects } from '@/components/space-objects';
import { AboutSection } from '@/components/sections/about';
import { ProjectsSection } from '@/components/sections/projects';
import { AchievementsSection } from '@/components/sections/achievements';
import { SkillsSection } from '@/components/sections/skills';
import { CertificationsSection } from '@/components/sections/certifications';
import { ContactSection } from '@/components/sections/contact';
import { BlackHole } from '@/components/BlackHole';
import { cn } from '@/lib/utils';
import Footer from '@/components/sections/Footer';

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [isBlackHoleActive, setIsBlackHoleActive] = useState(false);

  const navItems = [
    { href: '#about', label: 'About', icon: User },
    { href: '#projects', label: 'Projects', icon: FolderKanban },
    { href: '#achievements', label: 'Achievements', icon: Trophy },
    { href: '#skills', label: 'Skills', icon: Lightbulb },
    { href: '#certifications', label: 'Certifications', icon: GraduationCap },
    { href: '#contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 0);
    });
  }, [scrollY]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative z-50 min-h-screen bg-background text-foreground">
      <SpaceBackground />
      <SpaceObjects setIsBlackHoleActive={setIsBlackHoleActive} className="fixed inset-0 z-0" />
      
      {/* Black Hole Component */}
      <BlackHole active={isBlackHoleActive} onReset={() => setIsBlackHoleActive(false)} position={{
        x: 0,
        y: 0
      }} />

      {/* Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isScrolled ? -2 : 0 }}
        className={cn(
          "fixed top-0 w-full border-b z-50 transition-all duration-300 px-6 md:px-20 rounded-full backdrop-filter",
          isScrolled
            ? "bg-background/95 backdrop-blur-2xl shadow-lg"
            : "bg-background/80 backdrop-blur-xl"
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              {/* <img  /> */}
              <img src="/Asset3.svg" alt="" className="h-14 w-14 text-primary"/>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full bg-primary/20 blur-sm"
              />
            </div>
            {/* <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">Aarnav Anand</span>
            </div> */}
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="container mt-16 py-16 relative z-10 px-6 md:px-20">
      <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
      <motion.div
      className="space-y-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <h1
        className="text-4xl font-bold sm:text-6xl bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent"
        style={{
          backgroundImage: `url('/textures/noise.png'), linear-gradient(to right, #6366F1, #9333EA)`,
          backgroundSize: "200px, cover",
          backgroundBlendMode: "overlay",
        }}
      >
        Hey, I'm Aarnav Anand
      </h1>

      <motion.p
        className="text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto"
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
          <a href="#projects">Explore My Universe</a>
        </Button>
        <Button
          size="lg"
          variant="outline"
          asChild
          className="hover:shadow-lg hover:shadow-purple-500/50 transition duration-300"
        >
          <a href="#contact">Let's Connect</a>
        </Button>
        </motion.div>
        </motion.div>
        </section>

        <div className="space-y-28">
          <AboutSection />
          <ProjectsSection />
          <AchievementsSection />
          <SkillsSection />
          <CertificationsSection />
          <ContactSection />
          <Footer/>
        </div>
      </main>
    </div>
  );
}

export default Layout;
