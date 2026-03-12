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
  Moon,
  Sun,
  Sparkles,
  Rocket,
  Zap,
  Trophy,
  Terminal,
  Globe,
  Server,
  GitBranch,
  BriefcaseBusiness,
  Calendar,
  BookOpen,
  ExternalLink,
  Loader2,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { Routes, Route, Link, useLocation, useParams } from 'react-router-dom';

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
      tech: ["Go", "Groq AI", "Prometheus", "PromQL", "REST API"],
      link: "https://qrypilot.onrender.com/",
      github: "https://github.com/ravdreamin/QryPilot",
      image: "/projects/qrypilot.png",
      caseStudy: {
        tagline: "Observability, humanized.",
        overview: "QryPilot is a minimalist CLI and dashboard that translates natural language questions into executable PromQL — connecting your data to your intuition. It bridges the gap between complex monitoring infrastructure and the humans who need to understand it.",
        problem: "Writing PromQL queries requires deep knowledge of Prometheus's query language. Engineers often spend significant time context-switching between documentation and dashboards. This friction slows down incident response and makes observability inaccessible to non-specialist team members.",
        solution: "I built an AI-driven engine powered by Groq that interprets natural English questions and generates precise PromQL queries in real-time. The system is packaged as a single Go binary — lightweight, portable, and deployable anywhere with zero configuration overhead.",
        features: [
          { title: "PromQL Optional", desc: "AI-driven query engine that lets you ask questions in plain English instead of writing complex PromQL syntax." },
          { title: "Lightweight & Portable", desc: "Built as a single Go binary with minimal dependencies, making it trivially easy to deploy on any infrastructure." },
          { title: "Universal Integration", desc: "Works with any Prometheus endpoint out of the box — zero-config overhead, no special setup required." },
          { title: "Live Dashboard", desc: "Built-in web console for real-time query execution and result visualization with interactive charts." },
        ],
        results: [
          "Reduced average query authoring time from minutes to seconds",
          "Deployed as a single binary under 15MB",
          "Works with any Prometheus endpoint with zero configuration",
        ],
      },
    },
    {
      title: "Sentinel",
      icon: Globe,
      desc: "High-throughput concurrent web scraper with distributed crawling capabilities.",
      tech: ["Go", "Concurrency", "Colly", "Worker Pools", "REST API"],
      link: "https://sentinel-frontend-76am.onrender.com/",
      image: "/projects/sentinel.png",
      caseStudy: {
        tagline: "Extract web data in seconds.",
        overview: "Sentinel is a high-performance, distributed web extraction platform designed to scrape and structure data from thousands of URLs simultaneously. It combines Go's concurrency model with a clean web interface for effortless bulk data collection.",
        problem: "Extracting structured data from the web at scale is slow and unreliable with traditional scrapers. Most tools process URLs sequentially, lack fault tolerance, and output messy data that requires significant post-processing.",
        solution: "I engineered a Go-powered distributed architecture using worker pools that fetch and parse pages concurrently. The system processes bulk URL uploads, distributes work across goroutines, and outputs clean, analysis-ready JSON with real-time progress tracking.",
        features: [
          { title: "Bulk Extraction", desc: "Upload a list of URLs via .txt file and process them all in parallel — scraping thousands of pages in seconds." },
          { title: "Distributed Architecture", desc: "Go-powered worker pool system that intelligently distributes crawl tasks across goroutines for maximum throughput." },
          { title: "Structured Output", desc: "Extracts titles, meta descriptions, headers, and all links into clean, analysis-ready JSON format." },
          { title: "Content Verification", desc: "Built-in integrity verification and real-time progress tracking to ensure complete, reliable data extraction." },
        ],
        results: [
          "Achieved 20,000-URL concurrent scrape in ~50 seconds",
          "Fault-tolerant handling with graceful error recovery",
          "Structured JSON output ready for downstream analysis",
        ],
      },
    },
    {
      title: "BookVault",
      icon: GitBranch,
      desc: "A minimalist personal library manager for curating your intellectual journey.",
      tech: ["React", "Node.js", "MongoDB", "JWT Auth", "REST API"],
      link: "https://rest-ebon.vercel.app/",
      image: "/projects/bookvault.png",
      caseStudy: {
        tagline: "Curate your intellectual journey.",
        overview: "BookVault is a typography-focused personal library manager built for readers who want to track their reading habits, organize collections, and reflect on their intellectual journey. Clean design meets powerful collection management.",
        problem: "Most book tracking apps are bloated with social features and cluttered UI. Readers who simply want a clean, personal space to catalog books, track progress, and see meaningful stats are left with overly complex tools.",
        solution: "I designed a minimalist full-stack platform with a React frontend and Node.js/MongoDB backend. The focus is on typography-first design, fast search and filtering, and a personal dashboard that surfaces reading insights without noise.",
        features: [
          { title: "Collection Management", desc: "Easily add, edit, and organize your personal library with status tracking — To Read, Reading, and Finished." },
          { title: "Reading Analytics", desc: "Personal dashboard tracking total books, finished count, and average ratings to visualize your reading progress." },
          { title: "Smart Discovery", desc: "Minimalist search and genre-based filtering to navigate a growing collection effortlessly." },
          { title: "Secure Access", desc: "JWT-based authentication ensures your library is private and accessible only to you, across any device." },
        ],
        results: [
          "Full CRUD operations with real-time UI updates",
          "JWT-based authentication with secure session management",
          "Responsive, typography-first design across all devices",
        ],
      },
    },
  ],
  experience: [
    {
      role: "Full Stack Developer",
      company: "Personal Projects",
      duration: "2023 - 2026",
      desc: "Designed and built production-grade full-stack applications from scratch — AI-powered tools, high-throughput scrapers, and e-commerce platforms. Explored modern stacks like Go, Next.js, FastAPI, and LangGraph while shipping real products.",
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

// --- THEME CONTEXT ---
const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check initial preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (prefersDark) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = (e) => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // Get click position for circular reveal
    const x = e?.clientX ?? window.innerWidth / 2;
    const y = e?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Use View Transitions API if available
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 500,
            easing: 'ease-in-out',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      // Fallback: simple transition
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  return { theme, toggleTheme };
};

// --- Components ---

const Header = ({ theme, toggleTheme }) => (
  <div className="fixed bottom-4 sm:bottom-6 left-2 right-2 sm:left-0 sm:right-0 z-50 flex justify-center pointer-events-none">
    <motion.header
      className="relative rounded-full pointer-events-auto p-[1px] overflow-hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Beam border */}
      <motion.div
        className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
        style={{ background: 'conic-gradient(from 0deg, transparent 0%, #3b82f6 10%, #8b5cf6 20%, transparent 30%, transparent 100%)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner pill */}
      <div className="relative rounded-full bg-white/70 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-none">
        <div className="px-1 py-1 sm:px-1.5 sm:py-1.5 flex items-center justify-between gap-0 sm:gap-1">
          {/* LOGO PILL */}
          <MagneticHover>
            <motion.div
              className="flex items-center justify-center px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full hover:bg-white/80 dark:hover:bg-white/[0.08] transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/"
                className="text-2xl sm:text-2xl font-normal text-slate-900 dark:text-slate-100 pr-1"
                style={{ fontFamily: "'Great Vibes', cursive", letterSpacing: "1px" }}
              >
                gk
              </Link>
            </motion.div>
          </MagneticHover>

          <div className="w-[1px] h-3 sm:h-4 bg-slate-300/50 dark:bg-white/10 mx-0.5 sm:mx-1" />

          {/* NAV PILLS */}
          <nav className="flex items-center gap-0.5 sm:gap-1">
            {["Work", "Blog", "Gallery"].map((item) => {
              const toPath = `/${item.toLowerCase()}`;
              return (
                <MagneticHover key={item}>
                  <Link
                    to={toPath}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/80 dark:hover:bg-white/[0.08] transition-all cursor-pointer pointer-events-auto flex items-center whitespace-nowrap"
                  >
                    {item}
                  </Link>
                </MagneticHover>
              );
            })}
          </nav>

          <div className="w-[1px] h-3 sm:h-4 bg-slate-300/50 dark:bg-white/10 mx-0.5 sm:mx-1" />

          {/* ACTION PILLS */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <MagneticHover>
              <motion.button
                onClick={toggleTheme}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/80 dark:hover:bg-white/[0.08] transition-all cursor-pointer pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'light' ? (
                    <Moon size={14} strokeWidth={2.5} />
                  ) : (
                    <Sun size={14} strokeWidth={2.5} />
                  )}
                </motion.div>
              </motion.button>
            </MagneticHover>

            <MagneticHover>
              <motion.a
                href={cvFile}
                download="CV.pdf"
                className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] sm:text-xs font-semibold hover:bg-slate-800 dark:hover:bg-white transition-all cursor-pointer pointer-events-auto shadow-sm ml-0.5 sm:ml-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-semibold tracking-wide">CV</span>
              </motion.a>
            </MagneticHover>
          </div>
        </div>
      </div>
    </motion.header>
  </div>
);

const Hero = () => (
  <section className="pt-16 sm:pt-20 pb-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 border-b border-slate-200/50 dark:border-white/10 pb-12 sm:pb-16">
      <FadeIn>
        <div className="flex flex-row items-center gap-4 sm:gap-6 mb-6 sm:mb-8 text-left">
          <MagneticHover>
            <motion.div
              className="relative shrink-0"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {/* Border Beam Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2px]">
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2 block dark:hidden"
                    style={{ background: 'conic-gradient(from 0deg, transparent 0%, #000000 25%, #3f3f46 50%, transparent 75%)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2 hidden dark:block"
                    style={{ background: 'conic-gradient(from 0deg, transparent 0%, #ffffff 25%, #d4d4d8 50%, transparent 75%)' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-[#0a0a0a] bg-white dark:bg-[#0a0a0a]">
                  <img src={pfpImage} alt="Profile" className="w-full h-full object-cover" />
                </div>
              </div>
              <motion.div
                className="absolute -bottom-1 sm:bottom-0 -right-1 sm:right-0 w-6 h-6 sm:w-7 sm:h-7 bg-emerald-500 rounded-full border-2 border-white dark:border-black flex items-center justify-center shadow-lg shadow-emerald-500/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white text-[10px] sm:text-xs font-bold">✓</span>
              </motion.div>
            </motion.div>
          </MagneticHover>

          <div className="flex-1 flex flex-col items-start justify-center pt-1 overflow-hidden">
            <motion.h1
              className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-0.5 sm:mb-1 tracking-tight leading-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {DATA.name}
            </motion.h1>
            <motion.p
              className="text-slate-600 dark:text-slate-300 mb-2 sm:mb-4 font-semibold text-[13px] sm:text-lg tracking-tight leading-snug"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {DATA.role}
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-sm text-slate-500 dark:text-slate-400"
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
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 sm:mb-8 text-left text-[13px] sm:text-[16px] max-w-2xl font-medium">
          {DATA.bio}
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-start gap-2 max-w-full">
          {DATA.socials.map(({ name, icon: Icon, href }, i) => (
            <MagneticHover key={name}>
              <motion.a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex justify-center items-center gap-1.5 sm:gap-2 px-1 sm:px-4 py-2 sm:py-2 rounded-[10px] sm:rounded-xl bg-white/80 dark:bg-white/[0.05] backdrop-blur-sm border border-slate-200/50 dark:border-white/10 text-slate-700 dark:text-slate-300 text-[11px] sm:text-sm hover:bg-white dark:hover:bg-white/[0.08] hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none hover:border-slate-300/50 dark:hover:border-white/20 transition-all cursor-pointer pointer-events-auto"
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
  <section className="py-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 border-b border-slate-200/50 dark:border-white/10 pb-12">
      <FadeIn>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 flex items-center justify-center shadow-lg shadow-slate-900/20 dark:shadow-slate-100/10">
            <Code2 size={16} className="text-white dark:text-slate-900" strokeWidth={1.5} />
          </div>
          Tech Stack
        </h2>
      </FadeIn>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
        {DATA.skills.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.1} className="h-full">
            <motion.div
              className="h-full p-4 sm:p-5 rounded-2xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-md border border-white/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/[0.04] shadow-lg shadow-slate-200/20 dark:shadow-none hover:shadow-xl hover:shadow-slate-200/40 transition-all cursor-default flex flex-col group"
              whileHover={{ y: -4 }}
            >
              <div className="flex flex-col xl:flex-row sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                <motion.div
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-[10px] sm:rounded-xl bg-white/80 dark:bg-white/[0.05] shadow-sm border border-slate-200/50 dark:border-white/10 flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <group.icon size={12} className="text-slate-600 dark:text-slate-400 sm:w-3.5 sm:h-3.5" strokeWidth={2} />
                </motion.div>
                <span className="text-[9px] sm:text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider sm:tracking-widest mt-0.5 truncate w-full">
                  {group.category}
                </span>
              </div>
              <div className="space-y-2 sm:space-y-3 flex-1">
                {group.items.map((item, j) => (
                  <motion.div
                    key={item}
                    className="text-[13px] sm:text-[15px] text-slate-800 dark:text-slate-200 font-medium"
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
  <section className="py-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 border-b border-slate-200/50 dark:border-white/10 pb-12">
      <FadeIn>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 flex items-center justify-center shadow-lg shadow-slate-900/20 dark:shadow-slate-100/10">
            <Rocket size={16} className="text-white dark:text-slate-900" strokeWidth={1.5} />
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
              className="block relative p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm border border-slate-200/50 dark:border-white/10 hover:bg-white dark:hover:bg-white/[0.04] hover:shadow-xl hover:shadow-slate-200/50 hover:border-slate-300/50 dark:hover:border-white/20 transition-all group h-full overflow-hidden"
            >
              {/* Border beam on hover */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2 dark:hidden"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0%, #18181b 5%, #3f3f46 10%, transparent 15%, transparent 100%)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2 hidden dark:block"
                  style={{ background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.3) 5%, rgba(255,255,255,0.5) 10%, transparent 15%, transparent 100%)' }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="absolute inset-[1px] rounded-2xl bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-sm" />

              <div className="flex flex-col h-full relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 flex items-center justify-center shadow-lg shadow-slate-900/20 dark:shadow-slate-100/10"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <project.icon size={16} className="text-white dark:text-slate-900" strokeWidth={1.5} />
                  </motion.div>
                  <div className="flex gap-1">
                    {project.github && (
                      <motion.span
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.github, '_blank');
                        }}
                        className="p-2 rounded-xl bg-slate-100/80 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.08] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github size={12} strokeWidth={1.5} />
                      </motion.span>
                    )}
                    <motion.span
                      className="p-1.5 rounded-xl text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors"
                      initial={{ x: 0, y: 0 }}
                      whileHover={{ x: 2, y: -2 }}
                    >
                      <ArrowUpRight size={12} strokeWidth={2} />
                    </motion.span>
                  </div>
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{project.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 flex-1 leading-relaxed line-clamp-3">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-100/80 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 font-medium group-hover:bg-slate-200 dark:group-hover:bg-white/[0.08] group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">
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
  <section className="py-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 border-b border-slate-200/50 dark:border-white/10 pb-12">
      <FadeIn>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 flex items-center justify-center shadow-lg shadow-slate-900/20 dark:shadow-slate-100/10">
            <Trophy size={16} className="text-white dark:text-slate-900" strokeWidth={1.5} />
          </div>
          Achievements
        </h2>
      </FadeIn>

      <div className="space-y-3">
        {DATA.achievements.map((achievement, i) => (
          <FadeIn key={achievement.title} delay={i * 0.1}>
            <motion.div
              className="flex items-center gap-4 py-3 px-4 -mx-4 rounded-2xl hover:bg-white/80 dark:hover:bg-white/[0.04] hover:backdrop-blur-sm hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none transition-all cursor-default"
              whileHover={{ x: 4 }}
            >
              <motion.div
                className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <achievement.icon size={14} className="text-slate-600 dark:text-slate-400" strokeWidth={2} />
              </motion.div>
              <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{achievement.desc}</span>
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <FadeIn>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 flex items-center justify-center shadow-lg shadow-slate-900/20 dark:shadow-slate-100/10">
              <Mail size={16} className="text-white dark:text-slate-900" strokeWidth={1.5} />
            </div>
            Get in Touch
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <motion.div
            className="relative p-5 rounded-2xl bg-white/80 dark:bg-white/[0.02] backdrop-blur-sm border border-slate-200/50 dark:border-white/10 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all"
            whileHover={{ borderColor: 'var(--tw-border-slate-300)' }}
          >
            {/* Subtle animated gradient */}
            <motion.div
              className="absolute inset-0 opacity-30 dark:opacity-10"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(24, 24, 27, 0.05), transparent)' }}
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative">
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <motion.div
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/90 dark:bg-white/[0.05] backdrop-blur-sm border border-slate-200/50 dark:border-white/10 text-[13px] sm:text-sm text-slate-700 dark:text-slate-300 font-mono shadow-inner text-center sm:text-left truncate"
                  whileHover={{ borderColor: 'rgba(0,0,0,0.1)' }}
                >
                  {DATA.email}
                </motion.div>
                <MagneticHover>
                  <motion.button
                    onClick={copyEmail}
                    className="relative px-5 py-3 sm:py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-medium flex items-center justify-center gap-2 overflow-hidden shadow-lg shadow-slate-900/20 dark:shadow-slate-100/20 hover:bg-slate-800 dark:hover:bg-white transition-colors"
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
  <footer className="pb-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center border-t border-slate-200/50 dark:border-white/10 pt-8">
      <p className="text-sm text-slate-400 dark:text-slate-600">
        © {new Date().getFullYear()} Gaurav · Built with React
      </p>
    </div>
  </footer>
);

// --- Pages ---
const Home = () => (
  <>
    <Hero />
    <Projects />
    <Skills />
    <Achievements />
    <Contact />
  </>
);

const Work = () => {
  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Page Title */}
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Work
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-16 leading-relaxed">
            My journey and the projects I've shipped along the way.
          </p>
        </FadeIn>

        {/* Experience Section */}
        <section className="mb-20">
          <FadeIn>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-8">
              Experience
            </h2>
          </FadeIn>

          <div className="relative pl-4 sm:pl-8 border-l border-slate-200/60 dark:border-white/10 space-y-10 sm:space-y-12">
            {DATA.experience.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[21px] sm:-left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20 ring-4 ring-white dark:ring-[#0a0a0a] group-hover:bg-slate-900 dark:group-hover:bg-white transition-colors" />

                  <div className="p-5 sm:p-6 rounded-2xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm hover:bg-white dark:hover:bg-white/[0.04] transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{exp.role}</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-mono bg-slate-100 dark:bg-white/[0.05] border border-slate-200/50 dark:border-white/5 px-2.5 py-1 rounded-md w-fit">
                        <Calendar size={12} />
                        {exp.duration}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Projects / Case Studies Section */}
        <section>
          <FadeIn>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-8">
              Case Studies
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DATA.projects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.06}>
                <Link
                  to={`/work/${project.title.toLowerCase()}`}
                  className="block group h-full"
                >
                  <div className="relative rounded-2xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm border border-slate-200/50 dark:border-white/10 overflow-hidden hover:bg-white/60 dark:hover:bg-white/[0.04] hover:border-slate-300 dark:hover:border-white/20 transition-all h-full flex flex-col">
                    {/* Screenshot */}
                    <div className="aspect-[16/10] overflow-hidden border-b border-slate-200/30 dark:border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{project.title}</h3>
                        <ArrowUpRight size={14} strokeWidth={2} className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[12px] leading-relaxed mb-3 flex-1">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 text-[11px] rounded-md bg-slate-100/80 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

const CaseStudy = () => {
  const { slug } = useParams();
  const project = DATA.projects.find(p => p.title.toLowerCase() === slug);

  if (!project) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Project not found</h1>
          <Link to="/work" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  const cs = project.caseStudy;

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">

        {/* Back */}
        <FadeIn>
          <Link to="/work" className="inline-flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-10">
            ← Back to Work
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 flex items-center justify-center shadow-lg">
              <project.icon size={22} className="text-white dark:text-slate-900" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {project.title}
              </h1>
            </div>
          </div>
          <p className="text-xl text-slate-500 dark:text-slate-400 italic mb-8">
            {cs.tagline}
          </p>
        </FadeIn>

        {/* Action buttons */}
        <FadeIn delay={0.05}>
          <div className="flex flex-wrap gap-3 mb-10">
            <a href={project.link} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all">
              <Globe size={15} /> Live Preview
            </a>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.05] border border-slate-200/50 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-white dark:hover:bg-white/[0.08] transition-all">
                <Github size={15} /> Source Code
              </a>
            )}
          </div>
        </FadeIn>

        {/* Hero Screenshot */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 mb-16 shadow-lg shadow-slate-200/30 dark:shadow-none">
            <img src={project.image} alt={`${project.title} screenshot`} className="w-full object-cover object-top" />
          </div>
        </FadeIn>

        {/* Overview */}
        <FadeIn delay={0.12}>
          <section className="mb-14">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
              Overview
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-[1.8]">
              {cs.overview}
            </p>
          </section>
        </FadeIn>

        {/* Problem & Solution */}
        <FadeIn delay={0.14}>
          <section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/10">
              <h3 className="text-xs font-bold text-red-400 dark:text-red-400/80 uppercase tracking-[0.2em] mb-3">
                Problem
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {cs.problem}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/10">
              <h3 className="text-xs font-bold text-emerald-500 dark:text-emerald-400/80 uppercase tracking-[0.2em] mb-3">
                Solution
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {cs.solution}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Key Features */}
        <FadeIn delay={0.16}>
          <section className="mb-14">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cs.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/[0.04] transition-all"
                >
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{f.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Tech Stack */}
        <FadeIn delay={0.18}>
          <section className="mb-14">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
              Technology
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-4 py-2 text-sm rounded-xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/50 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Results */}
        <FadeIn delay={0.2}>
          <section className="mb-8">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
              Results & Impact
            </h2>
            <div className="space-y-3">
              {cs.results.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/10"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{r}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeIn>

      </div>
    </div>
  );
};


const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'medium', 'hashnode'

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const allArticles = [];

      // Fetch Hashnode articles via GraphQL
      try {
        const hnRes = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `{ publication(host: "ravdreamin.hashnode.dev") { posts(first: 20) { edges { node { title brief url publishedAt readTimeInMinutes coverImage { url } tags { name } } } } } }`
          }),
        });
        if (hnRes.ok) {
          const hnData = await hnRes.json();
          const edges = hnData?.data?.publication?.posts?.edges || [];
          edges.forEach(({ node: a }) => {
            allArticles.push({
              title: a.title,
              desc: a.brief?.slice(0, 160) + (a.brief?.length > 160 ? '...' : ''),
              url: a.url,
              date: new Date(a.publishedAt),
              readTime: a.readTimeInMinutes,
              tags: a.tags?.map(t => t.name)?.slice(0, 3) || [],
              cover: a.coverImage?.url || null,
              platform: 'hashnode',
            });
          });
        }
      } catch (e) { /* silently skip */ }

      // Fetch Medium articles via RSS (with CORS proxy + XML parsing)
      try {
        const medRes = await fetch('https://api.codetabs.com/v1/proxy?quest=https://medium.com/feed/@ravdreamin');
        if (medRes.ok) {
          const xmlText = await medRes.text();
          const parser = new DOMParser();
          const xml = parser.parseFromString(xmlText, 'text/xml');
          const items = xml.querySelectorAll('item');
          items.forEach(item => {
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const contentEncoded = item.getElementsByTagNameNS('*', 'encoded')[0]?.textContent || '';
            const categories = [...item.querySelectorAll('category')].map(c => c.textContent);
            // Extract cover image
            const imgMatch = contentEncoded.match(/<img[^>]+src="([^"]+)"/);
            const cover = imgMatch ? imgMatch[1] : null;
            // Extract plain text
            const plainText = contentEncoded.replace(/<[^>]+>/g, '').trim();
            const desc = plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
            const wordCount = plainText.split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(wordCount / 200));

            allArticles.push({
              title,
              desc,
              url: link,
              date: new Date(pubDate),
              readTime,
              tags: categories.slice(0, 3),
              cover,
              platform: 'medium',
            });
          });
        }
      } catch (e) { /* silently skip */ }

      // Sort by date (newest first)
      allArticles.sort((a, b) => b.date - a.date);
      setArticles(allArticles);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const filtered = filter === 'all' ? articles : articles.filter(a => a.platform === filter);

  const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Hero header */}
        <FadeIn>
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Blog
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Thoughts on engineering, systems design, and building things that work.
            </p>
          </div>
        </FadeIn>

        {/* Filter tabs + article count */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex overflow-x-auto snap-x gap-1.5 p-1 rounded-xl bg-white/50 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] w-full sm:w-auto self-start">
              {[
                { key: 'all', label: 'All Posts' },
                { key: 'medium', label: 'Medium' },
                { key: 'hashnode', label: 'Hashnode' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`snap-start whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === key
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {!loading && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium tabular-nums">
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
              </span>
            )}
          </div>
        </FadeIn>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 dark:from-violet-400/10 dark:to-indigo-400/10 flex items-center justify-center">
              <Loader2 size={20} className="text-violet-500 dark:text-violet-400 animate-spin" />
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Fetching articles...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <FadeIn>
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center mx-auto mb-5">
                <BookOpen size={24} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                {filter === 'all' ? 'No articles yet' : `No ${filter === 'medium' ? 'Medium' : 'Hashnode'} articles`}
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs">
                Articles will appear here once published.
              </p>
            </div>
          </FadeIn>
        )}

        {/* Articles */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-5">
            {/* Featured (first) article — large card */}
            {filtered.slice(0, 1).map((article, i) => (
              <FadeIn key={article.url} delay={0.08}>
                <a href={article.url} target="_blank" rel="noreferrer" className="block group">
                  <motion.div
                    className="rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Cover image — full width hero */}
                    {article.cover ? (
                      <div className="relative aspect-[2.4/1] overflow-hidden">
                        <img
                          src={article.cover}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-sm ${article.platform === 'medium'
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-500/30 text-blue-100'
                              }`}>
                              {article.platform === 'medium' ? 'Medium' : 'Hashnode'}
                            </span>
                            <span className="text-white/60 text-[11px]">{formatDate(article.date)}</span>
                            {article.readTime && <span className="text-white/60 text-[11px]">· {article.readTime} min read</span>}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight group-hover:text-white/90 transition-colors">
                            {article.title}
                          </h2>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[2.4/1] overflow-hidden bg-gradient-to-br from-violet-500/5 via-indigo-500/5 to-purple-500/5 dark:from-violet-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 flex items-end">
                        <div className="absolute top-6 right-6">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400/20 to-indigo-400/20 blur-2xl" />
                        </div>
                        <div className="p-6 w-full">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${article.platform === 'medium'
                              ? 'bg-slate-900/10 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                              : 'bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400'
                              }`}>
                              {article.platform === 'medium' ? 'Medium' : 'Hashnode'}
                            </span>
                            <span className="text-slate-400 dark:text-slate-500 text-[11px]">{formatDate(article.date)}</span>
                            {article.readTime && <span className="text-slate-400 dark:text-slate-500 text-[11px]">· {article.readTime} min read</span>}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1 leading-tight">
                            {article.title}
                          </h2>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 pt-4">
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {article.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {article.tags.map(t => (
                            <span key={t} className="px-2.5 py-0.5 text-[11px] rounded-lg bg-slate-100/80 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 font-medium">
                              #{t}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
                          Read article <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </FadeIn>
            ))}

            {/* Remaining articles — compact grid */}
            {filtered.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {filtered.slice(1).map((article, i) => (
                  <FadeIn key={article.url} delay={0.1 + i * 0.05}>
                    <a href={article.url} target="_blank" rel="noreferrer" className="block group h-full">
                      <motion.div
                        className="h-full rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm flex flex-col"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Cover */}
                        {article.cover ? (
                          <div className="aspect-[16/9] overflow-hidden">
                            <img src={article.cover} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          </div>
                        ) : (
                          <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/[0.03] dark:to-white/[0.01] flex items-center justify-center">
                            <BookOpen size={24} className="text-slate-300 dark:text-slate-700" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${article.platform === 'medium' ? 'bg-slate-900 dark:bg-white' : 'bg-blue-500'
                              }`} />
                            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium">
                              {article.platform === 'medium' ? 'Medium' : 'Hashnode'}
                            </span>
                            <span className="text-slate-300 dark:text-slate-600 text-[11px]">·</span>
                            <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                              {formatDate(article.date)}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 leading-snug line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors flex-1">
                            {article.title}
                          </h3>
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                            <div className="flex gap-1.5">
                              {article.tags.slice(0, 2).map(t => (
                                <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-slate-100/80 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 font-medium">
                                  #{t}
                                </span>
                              ))}
                            </div>
                            {article.readTime && (
                              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                {article.readTime} min
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://res.cloudinary.com/dgdabkabu/image/list/portfolio.json');

        if (!res.ok) {
          throw new Error('Could not fetch images.');
        }

        const data = await res.json();

        if (data.resources && data.resources.length > 0) {
          const formattedImages = data.resources.map(img => {
            const baseUrl = `https://res.cloudinary.com/dgdabkabu/image/upload`;
            return {
              id: img.public_id,
              src: `${baseUrl}/w_600,q_auto,f_auto/v${img.version}/${img.public_id}.${img.format}`,
              fullSrc: `${baseUrl}/q_auto,f_auto/v${img.version}/${img.public_id}.${img.format}`,
              width: img.width,
              height: img.height,
              aspectRatio: img.width / img.height
            };
          });
          setImages(formattedImages);
        }
      } catch (err) {
        console.error('Gallery fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const openLightbox = (index) => {
    setActiveImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-6">

        <FadeIn>
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Gallery
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              A visual collection of my work, life, and aesthetic explorations.
            </p>
          </div>
        </FadeIn>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-teal-500/10 dark:from-emerald-400/10 dark:to-teal-400/10 flex items-center justify-center">
              <Loader2 size={20} className="text-emerald-500 dark:text-emerald-400 animate-spin" />
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Loading gallery...</p>
          </div>
        )}

        {!loading && images.length === 0 && (
          <FadeIn>
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center mx-auto mb-5">
                <ImageIcon size={24} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">No images found</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs max-w-sm mx-auto">
                Unable to fetch images. Make sure you have uploaded images to Cloudinary with the tag 'portfolio' and un-restricted the Resource List.
              </p>
            </div>
          </FadeIn>
        )}

        {!loading && images.length > 0 && (
          <div className="columns-2 md:columns-3 gap-2 sm:gap-4 space-y-2 sm:space-y-4">
            {images.map((img, i) => (
              <FadeIn key={img.id} delay={i * 0.05} className="break-inside-avoid">
                <motion.div
                  className="relative rounded-2xl overflow-hidden cursor-zoom-in group border border-slate-200/50 dark:border-white/[0.06] bg-slate-100/50 dark:bg-white/[0.02]"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => openLightbox(i)}
                  style={{ aspectRatio: img.aspectRatio || 1 }}
                >
                  <img
                    src={img.src}
                    alt="Gallery item"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-colors duration-300" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && images[activeImageIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white/95 dark:bg-black/95 backdrop-blur-xl"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-900 dark:text-white transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>

          <div
            className="absolute left-0 top-0 bottom-0 w-1/4 cursor-w-resize z-40"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
            }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-1/4 cursor-e-resize z-40"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
            }}
          />

          <div className="w-full h-full p-4 sm:p-12 flex items-center justify-center relative">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              key={images[activeImageIndex].id}
              src={images[activeImageIndex].fullSrc}
              alt="Gallery fullscreen view"
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl relative z-30"
              style={{ maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-white/10 text-slate-800 dark:text-white text-xs font-medium tracking-widest z-50">
            {activeImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};


// --- Main App ---
export default function App() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    document.title = "Gaurav — Full Stack Engineer";
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'icon';
    link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23171717%22 rx=%2220%22/><text x=%2250%22 y=%2250%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22system-ui%22 font-weight=%22600%22 font-size=%2250%22>G</text></svg>`;
    document.head.appendChild(link);

    if (!document.getElementById('cormorant-font')) {
      const fontLink = document.createElement('link');
      fontLink.id = 'cormorant-font';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;1,600&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);
    }

    if (!document.getElementById('greatvibes-font')) {
      const gvLink = document.createElement('link');
      gvLink.id = 'greatvibes-font';
      gvLink.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
      gvLink.rel = 'stylesheet';
      document.head.appendChild(gvLink);
    }
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-transparent dark:bg-black text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

