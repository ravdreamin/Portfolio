import React, { useState, useRef, useEffect } from 'react';
import 'lenis/dist/lenis.css'
import Lenis from 'lenis';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate
} from 'framer-motion';
import {
  Github, Linkedin, Mail, ArrowUpRight,
  Server, Database, Code2, Layers, Wrench,
  User, Download, Activity, Terminal, Cloud,
  Monitor, Archive, Shield, Book, Film
} from 'lucide-react';

// --- UTILS ---
const RevealOnScroll = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
    className={className}
    style={{ willChange: "opacity, transform, filter" }}
  >
    {children}
  </motion.div>
);

// --- ASSETS ---
import pfpImage from './assets/pfp1.jpeg';
import cvFile from './assets/CV-gaurav.pdf';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
  visible: {
    y: 0, opacity: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 70, damping: 20, mass: 1 }
  }
};

// --- DATA ---
const DATA = {
  name: "Gaurav",
  role: "Full Stack Engineer",
  bio: "Full Stack engineer building scalable web applications and services. I specialize in both frontend and backend technologies, delivering production-ready solutions with Go, Node.js, and React.",
  location: "Chandigarh, India",
  phone: "+91 62395 22610",
  phoneRaw: "6239522610",
  skills: [
    {
      category: "Frontend",
      icon: Monitor,
      items: [
        { name: "React", color: "text-blue-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "JavaScript", color: "text-yellow-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
      ]
    },
    {
      category: "Backend",
      icon: Server,
      items: [
        { name: "Node.js", color: "text-green-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", color: "text-gray-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Go", color: "text-sky-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
        { name: "Gin", color: "text-sky-600", icon: "https://raw.githubusercontent.com/gin-gonic/logo/master/color.png" }
      ]
    },
    {
      category: "Database",
      icon: Database,
      items: [
        { name: "PostgreSQL", color: "text-blue-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", color: "text-green-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" }
      ]
    },
    {
      category: "DevOps & Tools",
      icon: Layers,
      items: [
        { name: "Docker", color: "text-blue-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },

        { name: "Git", color: "text-red-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" }
      ]
    }
  ],
  projects: [
    {
      title: "BookVault",
      status: "running",
      tag: "Full Stack",
      desc: "A comprehensive online bookstore with secure user authentication, inventory management, and a seamless shopping experience.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      link: "https://rest-ebon.vercel.app/",
      icon: Book,
    },
    {
      title: "Cinovies",
      status: "running",
      tag: "Frontend",
      desc: "Interactive movie discovery platform featuring real-time search, dynamic filtering, and immersive UI design.",
      tech: ["React", "CSS", "API"],
      link: "https://cinovies-8au8.vercel.app/",
      icon: Film,
    },
    {
      title: "QryPilot",
      status: "running",
      tag: "Featured",
      desc: "Prometheus queries, humanized. Talk to your infrastructure in plain English and get PromQL back powered by Groq AI.",
      tech: ["Go", "Groq AI", "Prometheus"],
      link: "https://qrypilot.onrender.com/",
      github: "https://github.com/ravdreamin/QryPilot",
      icon: Terminal,
    },
    {
      title: "Sentinel",
      status: "running",
      tag: "Automation",
      desc: "High-throughput concurrent web scraper built with Go, featuring distributed crawling and polite rate limiting.",
      tech: ["Go", "Concurrency", "Colly"],
      link: "https://sentinel-frontend-76am.onrender.com/",
      icon: Activity,
    },

  ],
  achievements: [
    "Built and deployed multiple full-stack applications",
    "Achieved 20,000-URL concurrent scrape in ~50 seconds with fault-tolerant handling of dead endpoints"
  ]
};

// --- UTILITIES / HOOKS ---

function useMousePosition() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const updateMouse = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [x, y]);

  return { x, y };
}

// --- COMPONENTS ---

const HeadManager = () => {
  useEffect(() => {
    document.title = "Gaurav | Portfolio";
    const setFavicon = () => {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'icon';
      // Pastel Blue Box with White G
      link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%232563eb%22 rx=%2220%22/><text x=%2250%22 y=%2250%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22sans-serif%22 font-weight=%22bold%22 font-size=%2260%22>G</text></svg>`;
      document.getElementsByTagName('head')[0].appendChild(link);
    };
    setFavicon();
  }, []);
  return null;
};

const Navbar = () => {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex items-center gap-6 px-6 py-3 bg-white/70 backdrop-blur-xl border border-neutral-200/60 rounded-full shadow-lg"
      >
        <div className="flex items-center gap-2 group cursor-default">
          <motion.div
            className="w-2 h-2 rounded-full bg-blue-600"
            whileHover={{ scale: 1.5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          />
          <span className="mono text-sm font-medium text-neutral-900 tracking-tight">
            rav<span className="text-blue-600">.</span>dev
          </span>
        </div>
        <div className="h-4 w-px bg-neutral-200" />
        <motion.a
          href={cvFile}
          download="CV.pdf"
          whileHover={{ scale: 1.05, y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-blue-600 transition-colors"
        >
          <Download size={14} />
          <span>CV</span>
        </motion.a>
      </motion.div>
    </nav>
  );
};

// 2. MINIMAL BACKGROUND
const MinimalBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-neutral-50">
      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: `
            linear-gradient(to right, #e5e5e5 1px, transparent 1px),
            linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
          `
        }}
      />

      {/* Subtle gradient orbs - very minimal */}
      <div className="absolute inset-0" style={{ filter: 'blur(100px)' }}>
        <motion.div
          animate={{ x: [-20, 20, -20], y: [-15, 15, -15] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-blue-500/10 rounded-full"
        />
        <motion.div
          animate={{ x: [20, -20, 20], y: [15, -15, 15] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] bg-neutral-400/10 rounded-full"
        />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

// 3. SPOTLIGHT CARD
const SpotlightCard = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-neutral-200/80 bg-white/70 backdrop-blur-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(37, 99, 235, 0.06),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// 4. FLOATING WRAPPER
const FloatingCard = ({ children, className, delay = 0 }) => {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 4.1 PARTICLE DUST
const ParticleDust = ({ count = 40, direction = 'right' }) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.2
    }));
  }, [count]);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white/60 rounded-full z-0 pointer-events-none"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
          }}
          initial={{ opacity: 0 }}
          exit={{
            opacity: [0, 1, 0],
            x: direction === 'right' ? Math.random() * 100 + 50 : -(Math.random() * 100 + 50),
            y: (Math.random() - 0.5) * 60,
            scale: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: p.delay
          }}
        />
      ))}
    </>
  );
};

// 5. NAVBAR


const getPillStyles = (colorClass) => {
  const colorMap = {
    'text-sky-500': 'bg-sky-100 text-sky-800 border-sky-300 font-medium',
    'text-yellow-500': 'bg-amber-100 text-amber-800 border-amber-300 font-medium',
    'text-blue-500': 'bg-blue-100 text-blue-800 border-blue-300 font-medium',
    'text-emerald-500': 'bg-emerald-100 text-emerald-800 border-emerald-300 font-medium',
    'text-green-600': 'bg-green-100 text-green-800 border-green-300 font-medium',
    'text-gray-600': 'bg-slate-100 text-slate-800 border-slate-300 font-medium',
    'text-sky-400': 'bg-sky-100 text-sky-800 border-sky-300 font-medium',
    'text-blue-600': 'bg-blue-100 text-blue-800 border-blue-300 font-medium',
    'text-orange-500': 'bg-orange-100 text-orange-800 border-orange-300 font-medium',
    'text-purple-500': 'bg-purple-100 text-purple-800 border-purple-300 font-medium',
    'text-blue-400': 'bg-blue-100 text-blue-800 border-blue-300 font-medium',
    'text-green-500': 'bg-emerald-100 text-emerald-800 border-emerald-300 font-medium',
    'text-red-500': 'bg-red-100 text-red-800 border-red-300 font-medium',
    'text-sky-600': 'bg-sky-100 text-sky-800 border-sky-300 font-medium',
  };
  return colorMap[colorClass] || 'bg-slate-100 text-slate-800 border-slate-300 font-medium';
};

// 4.2 MINI PARTICLE DUST (For Icons)
const MiniParticleDust = ({ count = 12 }) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      angle: (i / count) * 360,
      radius: Math.random() * 20 + 10,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 0.1
    }));
  }, [count]);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-slate-300 rounded-full z-0 pointer-events-none"
          style={{
            left: "50%",
            top: "50%",
            width: p.size,
            height: p.size,
            x: "-50%",
            y: "-50%",
          }}
          initial={{ opacity: 0, scale: 0 }}
          exit={{
            opacity: [1, 0],
            x: `calc(-50% + ${Math.cos(p.angle * (Math.PI / 180)) * p.radius}px)`,
            y: `calc(-50% + ${Math.sin(p.angle * (Math.PI / 180)) * p.radius}px)`,
            scale: 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: p.delay
          }}
        />
      ))}
    </>
  );
};

// --- COMPONENTS REMOVED (TechItem, TechCategory) ---
// Replaced by SkillBadge and SkillCategory in SkillsContent


// --- EXTRACTED CONTENT COMPONENTS ---

const BioContent = () => (
  <div className="w-full relative">
    <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
      <div className="relative shrink-0 group">
        {/* Simple Status Ring */}
        <motion.div
          className="absolute -inset-1 rounded-full border-2 border-dashed border-neutral-200"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white shadow-lg border-4 border-white overflow-hidden relative z-10 cursor-pointer transition-all duration-300"
        >
          <motion.img
            src={pfpImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
            initial={{ scale: 1.1 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>

        {/* Status Dot */}
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-4 h-4 bg-blue-600 border-2 border-white rounded-full z-20 shadow-sm"
        >
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-60" />
        </motion.div>
      </div>

      <motion.div
        className="flex-1 text-center md:text-left"
        variants={textContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          variants={fadeInUpVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-2 sm:mb-4 tracking-tight"
        >
          {DATA.name.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 + 0.5 }}
              className="inline-block hover:text-blue-600 transition-colors duration-300 transform hover:scale-110 cursor-default"
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          variants={fadeInUpVariants}
          className="inline-block px-3 py-1 mb-4 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest hover:bg-slate-200 hover:scale-105 transition-all cursor-default"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
            {DATA.role}
          </span>
        </motion.div>

        <motion.h3
          variants={fadeInUpVariants}
          className="text-xl sm:text-2xl font-semibold text-slate-700 mb-4 leading-tight tracking-tight"
        >
          Architecting <span className="text-slate-900 underline decoration-blue-300/50 underline-offset-4 decoration-2">robust systems</span> with <span className="text-slate-800 font-medium italic">precision</span>.
        </motion.h3>

        <motion.p
          variants={fadeInUpVariants}
          className="text-slate-500 text-sm sm:text-base leading-relaxed sm:leading-loose mb-6 font-normal"
        >
          <span className="font-medium text-slate-800 hover:text-blue-600 transition-colors">Full Stack</span> engineer passionate about building seamless web experiences. I specialize in modern technologies like <span className="font-medium text-slate-800 hover:text-blue-600 transition-colors">React, Node.js, and Go</span>, delivering <span className="font-medium text-slate-800 hover:text-blue-600 transition-colors">high-performance</span> and scalable solutions.
        </motion.p>

        <motion.div
          variants={fadeInUpVariants}
          className="flex flex-wrap gap-4 justify-center md:justify-start items-center"
        >
          <div className="flex gap-4">
            <SocialButton icon={Github} href="https://github.com/ravdreamin" />
            <SocialButton icon={Linkedin} href="https://linkedin.com/in/ravdreamin" />
            <SocialButton icon={Mail} href="mailto:ravcr8r@gmail.com" />
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block mx-2" />
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={cvFile}
            download="CV.pdf"
            className="px-6 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-medium tracking-wide hover:bg-black transition-all flex items-center gap-2.5 shadow-sm hover:shadow-md"
          >
            <Download size={14} /> <span>Resume / CV</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  </div>
);

const SkillBadge = ({ item }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    }}
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2.5 px-3 py-2.5 bg-white border border-neutral-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-300 group cursor-default"
  >
    <div className="w-6 h-6 flex items-center justify-center bg-neutral-50 rounded-lg p-1 group-hover:bg-white transition-colors">
      <img src={item.icon} alt={item.name} className="w-full h-full object-contain" />
    </div>
    <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">{item.name}</span>
  </motion.div>
);

const SkillCategory = ({ category, index }) => {
  const Icon = category.icon;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <Icon size={18} />
        </div>
        <h3 className="font-medium text-neutral-900 tracking-tight">{category.category}</h3>
      </div>
      <motion.div
        className="flex flex-wrap gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.05, delayChildren: index * 0.1 } }
        }}
      >
        {category.items.map((item) => (
          <SkillBadge key={item.name} item={item} />
        ))}
      </motion.div>
    </div>
  );
};

const SkillsContent = () => (
  <div className="w-full relative">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
      {DATA.skills.map((cat, i) => (
        <SkillCategory key={cat.category} category={cat} index={i} />
      ))}
    </div>
  </div>
);



const AchievementsContent = () => (
  <div className="w-full relative">
    <div className="p-8 sm:p-12 bg-white/60 backdrop-blur-md border border-dashed border-neutral-300 rounded-2xl flex flex-col items-center justify-center text-center gap-4 group hover:bg-white/80 transition-colors duration-300">
      <div className="p-4 bg-neutral-100 rounded-full group-hover:scale-110 transition-transform duration-300">
        <Activity size={24} className="text-neutral-400 group-hover:text-blue-600 transition-colors" />
      </div>
      <div>
        <h3 className="text-lg font-medium text-neutral-900">Achievements & contributions</h3>
        {DATA.achievements.length > 0 ? (
          <ul className="text-neutral-600 text-sm max-w-2xl mx-auto mt-4 text-left space-y-3">
            {DATA.achievements.map((item, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="text-blue-600 font-bold mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0"></span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-neutral-500 text-sm max-w-xs mx-auto mt-1">
            I'm currently working on some exciting open-source contributions. Stay tuned!
          </p>
        )}
      </div>
    </div>
  </div>
);

const SocialButton = ({ icon: Icon, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    whileHover={{ scale: 1.15, rotate: 5, backgroundColor: "#f1f5f9" }}
    whileTap={{ scale: 0.95 }}
    variants={{ hidden: { opacity: 0, scale: 0 }, visible: { opacity: 1, scale: 1 } }}
    className="p-3 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-slate-700 hover:border-slate-300 hover:shadow-lg transition-all shadow-sm"
  >
    <Icon size={18} />
  </motion.a>
);

// 7. HORIZONTAL SCROLL SECTION (Sticky)
const HorizontalScrollSection = ({ projects }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh] -mx-6 md:hidden">
      <div className="sticky top-20 flex h-[60vh] items-center overflow-hidden">
        <motion.div style={{ x, willChange: "transform" }} className="flex gap-6 px-6">
          {projects.map((p, i) => (
            <div key={i} className="min-w-[85vw]">
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// 7. PARALLAX HORIZONTAL ITEM for Mobile
const HorizontalScrollItem = ({ children, className, containerRef }) => {
  const ref = useRef(null);

  // Track scroll progress of this item relative to the container
  const { scrollXProgress } = useScroll({
    target: ref,
    container: containerRef,
    axis: "x",
    offset: ["center end", "center start"]
  });

  // Parallax Transformations
  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.6, 1, 0.6]);
  const rotateY = useTransform(scrollXProgress, [0, 0.5, 1], [15, 0, -15]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        opacity,
        rotateY,
        perspective: 1000
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 7.1 STATUS BADGE
const StatusBadge = ({ status }) => {
  const styles = {
    running: {
      bg: "bg-emerald-100",
      text: "text-emerald-800",
      border: "border-emerald-300",
      dot: "bg-emerald-600",
      label: "Running"
    },
    working: {
      bg: "bg-amber-100",
      text: "text-amber-800",
      border: "border-amber-300",
      dot: "bg-amber-600",
      label: "In Progress"
    },
    complete: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      border: "border-blue-300",
      dot: "bg-blue-600",
      label: "Completed"
    },
    upcoming: {
      bg: "bg-slate-100",
      text: "text-slate-800",
      border: "border-slate-300",
      dot: "bg-slate-500",
      label: "Upcoming"
    }
  };

  const config = styles[status] || styles.upcoming;

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${config.bg} ${config.border} ${config.text} text-[10px] font-bold uppercase tracking-wider shadow-sm`}>
      <div className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'working' ? 'animate-pulse' : ''}`} />
      {config.label}
    </div>
  );
};

// 7.2 PROJECT CARD WITH FLOATING ANIMATION
// 7.1 PROJECT CARD WITH FLOATING ANIMATION
const ProjectCard = ({ project, index }) => {
  const Icon = project.icon || Server; // Default to Server if no icon
  return (
    <FloatingCard delay={index * 0.5} className="h-full">
      <SpotlightCard className="h-full rounded-2xl p-6 sm:p-8 transition-all duration-300">
        <div className="block h-full flex flex-col relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-neutral-100 rounded-xl group-hover:bg-neutral-200 transition-all duration-300 border border-neutral-200/60">
                <Icon size={18} className="text-neutral-500 group-hover:text-neutral-900 transition-colors" />
              </div>
              {project.status && <StatusBadge status={project.status} />}
            </div>
            <div className="flex gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-full text-neutral-300 hover:text-neutral-900 hover:bg-neutral-100 transition-all z-20"
                  title="View Code"
                >
                  <Github size={18} />
                </a>
              )}
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-neutral-300 hover:text-blue-600 hover:bg-neutral-100 transition-all z-20"
                title="Live Demo"
              >
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <a href={project.link} target="_blank" rel="noreferrer" className="block group/title">
            <h3 className="text-lg font-semibold text-neutral-900 mb-2 tracking-tight group-hover/title:text-blue-600 transition-colors">{project.title}</h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-6">{project.desc}</p>
          </a>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((t) => (
              <span key={t} className="mono text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-md uppercase tracking-wide border border-neutral-200/60 group-hover:text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
                {t}
              </span>
            ))}
          </div>
        </div>
      </SpotlightCard>
    </FloatingCard>
  );
};



export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const projectsContainerRef = useRef(null);

  return (
    <div
      className="min-h-screen text-slate-800 selection:bg-slate-100 selection:text-slate-900 relative"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <HeadManager />
      <Navbar />
      <MinimalBackground />
      <main className="max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-4xl mx-auto mb-16 sm:mb-20 p-6 sm:p-8 md:p-12 bg-white/90 backdrop-blur-xl border border-neutral-200/60 rounded-2xl sm:rounded-3xl shadow-sm relative z-10"
        >
          <BioContent />
        </motion.div>
        <section className="mb-24">
          <RevealOnScroll className="flex items-center gap-4 mb-10 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <h2 className="mono text-sm font-medium text-neutral-900 tracking-tight">projects<span className="text-blue-600">()</span></h2>
            <div className="h-px flex-1 bg-neutral-200" />
          </RevealOnScroll>

          {/* Mobile: Sticky Horizontal Scroll */}
          <HorizontalScrollSection projects={DATA.projects} />

          {/* Desktop: Standard Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.projects.map((p, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                <ProjectCard project={p} index={i} />
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <RevealOnScroll className="flex items-center gap-4 mb-10 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <h2 className="mono text-sm font-medium text-neutral-900 tracking-tight">
              skills<span className="text-blue-600">()</span>
            </h2>
            <div className="h-px flex-1 bg-neutral-200" />
          </RevealOnScroll>

          <div className="p-6 sm:p-8 md:p-12 bg-white/90 backdrop-blur-xl border border-neutral-200/60 rounded-2xl sm:rounded-3xl shadow-sm">
            <SkillsContent />
          </div>
        </section>

        <section className="mb-24">
          <RevealOnScroll className="flex items-center gap-4 mb-10 px-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <h2 className="mono text-sm font-medium text-neutral-900 tracking-tight">
              achievements<span className="text-blue-600">()</span>
            </h2>
            <div className="h-px flex-1 bg-neutral-200" />
          </RevealOnScroll>
          <AchievementsContent />
        </section>



        <footer className="pt-8 border-t border-neutral-200/60 flex flex-col md:flex-row justify-between items-center text-xs gap-4 mb-4">
          <div className="mono text-neutral-400">
            &copy; {new Date().getFullYear()} <span className="font-medium text-neutral-600">rav</span><span className="text-blue-600">.</span>dev
          </div>
          <div className="flex gap-6 mono text-neutral-400">
            <a href="mailto:ravcr8r@gmail.com" className="hover:text-blue-600 transition-colors">email</a>
            <a href="https://github.com/ravdreamin" className="hover:text-blue-600 transition-colors">github</a>
            <a href="https://linkedin.com/in/ravdreamin" className="hover:text-blue-600 transition-colors">linkedin</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
