import React, { useRef, useEffect, useState } from 'react';
import 'lenis/dist/lenis.css';
import Lenis from 'lenis';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  ArrowUpRight,
  Download,
  MapPin,
  Copy,
  Check,
  Code2,
  Database,
  Layers,
  Cpu,
  Sparkles,
  Rocket,
  Zap,
  Trophy,
  Terminal,
  Globe,
  Server,
  GitBranch,
} from 'lucide-react';

import pfpImage from './assets/pfp1.jpeg';
import cvFile from './assets/CV-gaurav.pdf';

// --- BORDER BEAM COMPONENT ---
const BorderBeam = ({ duration = 8, size = 200 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: 'conic-gradient(from 0deg, transparent 0%, #3b82f6 10%, #8b5cf6 20%, transparent 30%)',
          left: '50%',
          top: '-50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// --- MAGNETIC HOVER ---
const MagneticHover = ({ children, className = "" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- ANIMATED CARD ---
const AnimatedCard = ({ children, className = "", delay = 0, hover = true }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- DATA ---
const DATA = {
  name: "Gaurav",
  role: "Full Stack Engineer",
  email: "ravcr8r@gmail.com",
  location: "Chandigarh, India",
  bio: "I build scalable web applications and intelligent systems. Passionate about clean code, great UX, and solving complex problems with modern technologies.",
  skills: [
    { category: "Languages", items: ["JavaScript", "Python", "Go"], icon: Code2 },
    { category: "Frameworks", items: ["Next.js", "FastAPI", "Gin"], icon: Layers },
    { category: "Databases", items: ["PostgreSQL", "MongoDB"], icon: Database },
    { category: "Tools", items: ["Docker", "LangGraph", "n8n"], icon: Server },
  ],
  projects: [
    {
      title: "QryPilot",
      icon: Terminal,
      desc: "AI-powered Prometheus query generator. Talk to your infrastructure in plain English.",
      tech: ["Go", "Groq AI", "Prometheus"],
      link: "https://qrypilot.onrender.com/",
      github: "https://github.com/ravdreamin/QryPilot",
    },
    {
      title: "Sentinel",
      icon: Globe,
      desc: "High-throughput concurrent web scraper with distributed crawling capabilities.",
      tech: ["Go", "Concurrency", "Colly"],
      link: "https://sentinel-frontend-76am.onrender.com/",
    },
    {
      title: "BookVault",
      icon: GitBranch,
      desc: "Full-stack online bookstore with authentication and inventory management.",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://rest-ebon.vercel.app/",
    },
  ],
  achievements: [
    {
      icon: Zap,
      title: "High-Performance Scraping",
      desc: "Achieved 20,000-URL concurrent scrape in ~50 seconds with fault-tolerant handling",
    },
    {
      icon: Rocket,
      title: "Production Deployments",
      desc: "Built and deployed multiple full-stack applications serving real users",
    },
    {
      icon: Sparkles,
      title: "AI Integration",
      desc: "Integrated AI-powered features using LangGraph and automation workflows with n8n",
    },
  ],
  socials: [
    { name: "GitHub", icon: Github, href: "https://github.com/ravdreamin", username: "ravdreamin" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/ravdreamin", username: "ravdreamin" },
    { name: "Email", icon: Mail, href: "mailto:ravcr8r@gmail.com", username: "ravcr8r@gmail.com" },
  ],
};

// --- Animation Wrapper ---
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Components ---

const Header = () => (
  <motion.header 
    className="border-b border-zinc-200/50 bg-white/70 backdrop-blur-xl sticky top-0 z-50"
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
      <MagneticHover>
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div 
            className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 flex items-center justify-center shadow-lg shadow-zinc-900/20"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <Cpu size={16} className="text-white" strokeWidth={1.5} />
          </motion.div>
          <span className="font-semibold text-zinc-900 tracking-tight">Gaurav</span>
        </motion.div>
      </MagneticHover>
      <MagneticHover>
        <motion.a
          href={cvFile}
          download="CV.pdf"
          className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors px-4 py-2 rounded-xl bg-white/60 backdrop-blur-sm border border-zinc-200/50 hover:bg-white hover:shadow-lg hover:shadow-zinc-200/50 hover:border-zinc-300/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.span
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Download size={14} strokeWidth={2} />
          </motion.span>
          <span className="font-medium">Resume</span>
        </motion.a>
      </MagneticHover>
    </div>
  </motion.header>
);

const Hero = () => (
  <section className="py-16 border-b border-zinc-200/50">
    <div className="max-w-3xl mx-auto px-6">
      <FadeIn>
        <div className="flex items-start gap-5 mb-8">
          <MagneticHover>
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* Border Beam Container */}
              <div className="relative w-20 h-20 rounded-full p-[2px]">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
                    style={{ background: 'conic-gradient(from 0deg, transparent 0%, #18181b 25%, #3f3f46 50%, transparent 75%)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white bg-white">
                  <img src={pfpImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <motion.div 
                className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-lg shadow-emerald-500/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-xs font-bold">✓</span>
              </motion.div>
            </motion.div>
          </MagneticHover>
          
          <div className="flex-1 pt-1">
            <motion.h1 
              className="text-2xl font-bold text-zinc-900 mb-1 tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {DATA.name}
            </motion.h1>
            <motion.p 
              className="text-zinc-500 mb-3 font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {DATA.role}
            </motion.p>
            <motion.div 
              className="flex items-center gap-4 text-sm text-zinc-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="flex items-center gap-1.5">
                <MapPin size={14} strokeWidth={2} />
                {DATA.location}
              </span>
              <span className="flex items-center gap-1.5">
                <motion.span 
                  className="w-2 h-2 rounded-full bg-emerald-500"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-emerald-600 font-medium">Available</span>
              </span>
            </motion.div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="text-zinc-600 leading-relaxed mb-6">
          {DATA.bio}
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="flex flex-wrap gap-2">
          {DATA.socials.map(({ name, icon: Icon, href }, i) => (
            <MagneticHover key={name}>
              <motion.a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-zinc-200/50 text-zinc-700 text-sm hover:bg-white hover:shadow-lg hover:shadow-zinc-200/50 hover:border-zinc-300/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Icon size={16} strokeWidth={1.5} />
                <span className="font-medium">{name}</span>
              </motion.a>
            </MagneticHover>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

const Skills = () => (
  <section className="py-12 border-b border-zinc-200/50">
    <div className="max-w-3xl mx-auto px-6">
      <FadeIn>
        <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 flex items-center justify-center shadow-lg shadow-zinc-900/20">
            <Code2 size={16} className="text-white" strokeWidth={1.5} />
          </div>
          Tech Stack
        </h2>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {DATA.skills.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.1}>
            <motion.div 
              className="p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-zinc-200/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-300/50 transition-all cursor-default"
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.div
                  className="w-6 h-6 rounded-lg bg-zinc-100 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <group.icon size={12} className="text-zinc-600" strokeWidth={2} />
                </motion.div>
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  {group.category}
                </span>
              </div>
              <div className="space-y-1.5">
                {group.items.map((item, j) => (
                  <motion.div 
                    key={item} 
                    className="text-sm text-zinc-700 font-medium"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.05 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const Projects = () => (
  <section className="py-12 border-b border-zinc-200/50">
    <div className="max-w-3xl mx-auto px-6">
      <FadeIn>
        <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 flex items-center justify-center shadow-lg shadow-zinc-900/20">
            <Rocket size={16} className="text-white" strokeWidth={1.5} />
          </div>
          Projects
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DATA.projects.map((project, i) => (
          <AnimatedCard key={project.title} delay={i * 0.1} className="h-full">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="block relative p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-zinc-200/50 hover:bg-white hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-300/50 transition-all group h-full overflow-hidden"
            >
              {/* Border beam on hover */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0%, #18181b 5%, #3f3f46 10%, transparent 15%, transparent 100%)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="absolute inset-[1px] rounded-2xl bg-white/90 backdrop-blur-sm" />
              
              <div className="flex flex-col h-full relative">
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 flex items-center justify-center shadow-lg shadow-zinc-900/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <project.icon size={18} className="text-white" strokeWidth={1.5} />
                  </motion.div>
                  <div className="flex gap-1">
                    {project.github && (
                      <motion.span
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.github, '_blank');
                        }}
                        className="p-2 rounded-xl bg-zinc-100/80 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-700 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={14} strokeWidth={1.5} />
                      </motion.span>
                    )}
                    <motion.span 
                      className="p-2 rounded-xl text-zinc-400 group-hover:text-zinc-900 transition-colors"
                      initial={{ x: 0, y: 0 }}
                      whileHover={{ x: 2, y: -2 }}
                    >
                      <ArrowUpRight size={14} strokeWidth={2} />
                    </motion.span>
                  </div>
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors">{project.title}</h3>
                <p className="text-sm text-zinc-500 mb-4 flex-1 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-xs rounded-lg bg-zinc-100/80 text-zinc-600 font-medium group-hover:bg-zinc-200 group-hover:text-zinc-900 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </AnimatedCard>
        ))}
      </div>
    </div>
  </section>
);

const Achievements = () => (
  <section className="py-12 border-b border-zinc-200/50">
    <div className="max-w-3xl mx-auto px-6">
      <FadeIn>
        <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 flex items-center justify-center shadow-lg shadow-zinc-900/20">
            <Trophy size={16} className="text-white" strokeWidth={1.5} />
          </div>
          Achievements
        </h2>
      </FadeIn>

      <div className="space-y-3">
        {DATA.achievements.map((achievement, i) => (
          <FadeIn key={achievement.title} delay={i * 0.1}>
            <motion.div 
              className="flex items-center gap-4 py-3 px-4 -mx-4 rounded-2xl hover:bg-white/80 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-zinc-200/50 transition-all cursor-default"
              whileHover={{ x: 4 }}
            >
              <motion.div
                className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <achievement.icon size={14} className="text-zinc-600" strokeWidth={2} />
              </motion.div>
              <span className="text-sm text-zinc-600 leading-relaxed">{achievement.desc}</span>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-lg font-semibold text-zinc-900 mb-6 flex items-center gap-3 tracking-tight">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 flex items-center justify-center shadow-lg shadow-zinc-900/20">
              <Mail size={16} className="text-white" strokeWidth={1.5} />
            </div>
            Get in Touch
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <motion.div 
            className="relative p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-zinc-200/50 overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 transition-all"
            whileHover={{ borderColor: 'rgba(0,0,0,0.08)' }}
          >
            {/* Subtle animated gradient */}
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(24, 24, 27, 0.05), transparent)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative">
              <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
              </p>
              <div className="flex items-center gap-3">
                <motion.div 
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/90 backdrop-blur-sm border border-zinc-200/50 text-sm text-zinc-700 font-mono shadow-inner"
                  whileHover={{ borderColor: 'rgba(0,0,0,0.1)' }}
                >
                  {DATA.email}
                </motion.div>
                <MagneticHover>
                  <motion.button
                    onClick={copyEmail}
                    className="relative px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-sm font-medium flex items-center gap-2 overflow-hidden shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Button shimmer */}
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                    <span className="relative flex items-center gap-2">
                      <motion.span
                        initial={false}
                        animate={{ scale: copied ? [1, 1.2, 1] : 1 }}
                      >
                        {copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={2} />}
                      </motion.span>
                      {copied ? "Copied!" : "Copy"}
                    </span>
                  </motion.button>
                </MagneticHover>
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-8 border-t border-neutral-200">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <p className="text-sm text-neutral-400">
        © {new Date().getFullYear()} Gaurav · Built with React
      </p>
    </div>
  </footer>
);

// --- Main App ---
export default function App() {
  useEffect(() => {
    document.title = "Gaurav — Full Stack Engineer";
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23171717%22 rx=%2220%22/><text x=%2250%22 y=%2250%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22system-ui%22 font-weight=%22600%22 font-size=%2250%22>G</text></svg>`;
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
