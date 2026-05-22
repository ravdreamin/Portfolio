import {
  Code2,
  Database,
  Layers,
  Server,
  Terminal,
  Globe,
  GitBranch,
  Github,
  Linkedin,
  Mail,
  Zap,
  Rocket,
  Sparkles
} from 'lucide-react';

// Data used throughout the portfolio application
// We imported icons from lucide-react to render alongside our text
export const DATA = {
  name: "Gaurav",
  role: "Full Stack Engineer",
  email: "gk4201729@gmail.com",
  location: "Chandigarh, India",
  bio: "I build scalable web applications and intelligent systems. Passionate about clean code, great UX, and solving complex problems with modern technologies.",
  skills: [
    { category: "Languages", items: ["JavaScript", "Python", "Go", "PHP"], icon: Code2 },
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
      title: "QuickScan",
      icon: GitBranch,
      desc: "A robust attendance tracking system with student-driven session joining and hardware device locking.",
      tech: ["React", "FastAPI", "Python", "PostgreSQL", "Device Auth"],
      link: "https://quickscan-s3yj.onrender.com",
      github: "https://github.com/ravdreamin/QuickScan",
      image: "/projects/quickscan.png",
      caseStudy: {
        tagline: "Attendance tracking, redefined.",
        overview: "QuickScan is a comprehensive attendance management system that streamlines classroom check-ins. It empowers students to join sessions autonomously while providing educators with real-time tracking and deep analytics.",
        problem: "Traditional attendance tracking is slow, manual, and prone to buddy-punching. Instructors waste valuable class time taking roll, and conventional digital systems fail to prevent students from sharing credentials to authenticate remotely.",
        solution: "I engineered a secure full-stack platform featuring hardware device locking and session-specific enrollment codes. Students lock their accounts to a specific physical device, fundamentally preventing proxy attendance.",
        features: [
          { title: "Device Locking", desc: "Unique hardware fingerprinting ensures students can only mark attendance from their registered physical device." },
          { title: "Session Joining", desc: "Dynamic, time-limited enrollment codes generated for specific classes to streamline the check-in process." },
          { title: "Student Dashboard", desc: "Dedicated views for students to track their aggregated attendance statistics across all subjects." },
          { title: "Analytics Engine", desc: "Comprehensive management panel allowing teachers to view detailed, session-by-session records and student roll numbers." },
        ],
        results: [
          "Eliminated proxy attendance through strict device-binding",
          "Reduced instructor administrative time significantly per session",
          "Deployed a high-reliability full-stack backend with PostgreSQL",
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
    { name: "Email", icon: Mail, href: "mailto:gk4201729@gmail.com", username: "gk4201729@gmail.com" },
  ],
};
