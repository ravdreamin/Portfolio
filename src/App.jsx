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
  User, Download, Activity, Send, Terminal, Cloud, Phone,
  Monitor, Archive, Shield
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
import cvFile from './assets/CV.pdf';

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
  role: "Backend Engineer & SRE",
  bio: "Backend-focused engineer building production-style services. I specialize in high-concurrency systems using Node.js, TypeScript, and Go, with a strong focus on system reliability and observability.",
  location: "Chandigarh, India",
  phone: "+91 62395 22610",
  phoneRaw: "6239522610",
  skills: [
    {
      category: "Languages",
      icon: Code2,
      items: [
        { name: "Go", color: "text-sky-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
        { name: "JavaScript", color: "text-yellow-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
        { name: "Python", color: "text-emerald-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
      ]
    },
    {
      category: "Backend",
      icon: Server,
      items: [

        { name: "gRPC", color: "text-cyan-500", icon: "https://raw.githubusercontent.com/cncf/artwork/master/projects/grpc/icon/color/grpc-icon-color.svg" },
        { name: "Gin", color: "text-sky-400", icon: "https://raw.githubusercontent.com/gin-gonic/logo/master/color.png" },
      ]
    },
    {
      category: "DevOps & Cloud",
      icon: Cloud,
      items: [
        { name: "Docker", color: "text-blue-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Kubernetes", color: "text-blue-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },

        { name: "Prometheus", color: "text-orange-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prometheus/prometheus-original.svg" },
        { name: "Terraform", color: "text-purple-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" }
      ]
    },
    {
      category: "Database & Store",
      icon: Database,
      items: [
        { name: "PostgreSQL", color: "text-blue-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Redis", color: "text-red-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" }
      ]
    }
  ],
  projects: [
    {
      title: "Aegis | SRE-PILOT",
      status: "running",
      tag: "Featured",
      desc: "A resilient backend service implementing core SRE patterns: circuit breakers, rate limiting, and structured logging.",
      tech: ["Go", "Docker", "REST"],
      link: "https://sre-pilot.onrender.com",
      icon: Shield,
    },
    {
      title: "Sentinel",
      status: "working",
      tag: "Automation",
      desc: "High-throughput concurrent web scraper built with Go, featuring distributed crawling and polite rate limiting.",
      tech: ["Go", "Concurrency", "Colly"],
      link: "#",
      icon: Activity,
    },
    {
      title: "Arbiter L7 LB",
      status: "upcoming",
      tag: "Infrastructure",
      desc: "Custom Layer 7 load balancer exploring advanced routing algorithms (Weighted Round Robin, Least Connections) and health checks.",
      tech: ["Go", "Networking", "Distributed Systems"],
      link: "#",
      icon: Layers,
    }
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
      link.href = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 fill=%22%23a5b4fc%22 rx=%2220%22/><text x=%2250%22 y=%2250%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 fill=%22white%22 font-family=%22sans-serif%22 font-weight=%22bold%22 font-size=%2260%22>G</text></svg>`;
      document.getElementsByTagName('head')[0].appendChild(link);
    };
    setFavicon();
  }, []);
  return null;
};

// 2. SLIME BACKGROUND (OPTIMIZED)
const SlimeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fafafa]">
      {/* Dynamic Flow Elements - Removed backdrop-blur for performance */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/30 border border-white/40 rounded-full"
            style={{
              width: 250 + i * 50,
              height: 250 + i * 50,
              left: `${15 + i * 20}%`,
              top: `${15 + i * 15}%`,
              willChange: "transform"
            }}
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -50, 40, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Truly Vibrant Blobs */}
      <div className="w-full h-full relative" style={{ filter: 'blur(90px)', willChange: 'transform' }}>
        <motion.div
          animate={{ x: [-40, 40, -40], y: [-30, 30, -30], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className="absolute top-[20%] left-[25%] w-[60vw] h-[60vw] md:w-[320px] md:h-[320px] bg-indigo-600/50 rounded-full mix-blend-multiply"
        />
        <motion.div
          animate={{ x: [40, -40, 40], y: [30, -30, 30], scale: [1.2, 0.9, 1.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className="absolute top-[40%] right-[25%] w-[65vw] h-[65vw] md:w-[350px] md:h-[350px] bg-sky-500/50 rounded-full mix-blend-multiply"
        />
        <motion.div
          animate={{ y: [60, -60, 60], scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className="absolute bottom-[20%] left-[40%] w-[60vw] h-[60vw] md:w-[330px] md:h-[330px] bg-rose-500/50 rounded-full mix-blend-multiply"
        />
        <motion.div
          animate={{ x: [-50, 50, -50], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className="absolute top-[50%] left-[20%] w-[55vw] h-[55vw] md:w-[280px] md:h-[280px] bg-violet-600/40 rounded-full mix-blend-multiply"
        />
      </div>

      <div className="absolute inset-0 bg-white/5 pointer-events-none" />
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
      className={`group relative border border-white/60 bg-white/30 backdrop-blur-[24px] backdrop-saturate-[180%] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.04)] ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.4),
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
// 5. NAVBAR
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none">
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 20, mass: 1 }}
      className="pointer-events-auto w-full max-w-5xl flex items-center justify-between bg-white/60 backdrop-blur-xl border border-white/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360, backgroundColor: "#6366f1", scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.6 }}
          className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm cursor-pointer"
        >
          G
        </motion.div>
        <div className="text-slate-800 font-bold text-sm tracking-tight block">
          portfolio<span className="opacity-50">/</span>gaurav
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">


        <motion.a
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.4)", backdropFilter: "blur(10px)" }}
          whileTap={{ scale: 0.95 }}
          href={cvFile}
          download="CV.pdf"
          className="px-3 sm:px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/40 text-slate-800 rounded-full text-xs font-medium tracking-widest hover:border-white/60 hover:shadow-lg transition-all flex items-center gap-2"
          title="Download CV"
        >
          <Download size={14} /> <span className="hidden sm:inline">CV</span>
        </motion.a>
      </div>
    </motion.div>
  </nav>
);

const getPillStyles = (colorClass) => {
  const colorMap = {
    'text-sky-500': 'bg-sky-50 text-sky-700 border-sky-200',
    'text-yellow-500': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'text-blue-500': 'bg-blue-50 text-blue-700 border-blue-200',
    'text-emerald-500': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'text-green-600': 'bg-green-50 text-green-700 border-green-200',
    'text-gray-600': 'bg-gray-50 text-gray-700 border-gray-200',
    'text-sky-400': 'bg-sky-50 text-sky-700 border-sky-200',
    'text-blue-600': 'bg-blue-50 text-blue-700 border-blue-200',
    'text-orange-500': 'bg-orange-50 text-orange-700 border-orange-200',
    'text-purple-500': 'bg-purple-50 text-purple-700 border-purple-200',
    'text-blue-400': 'bg-blue-50 text-blue-700 border-blue-200',
    'text-green-500': 'bg-green-50 text-green-700 border-green-200',
    'text-red-500': 'bg-red-50 text-red-700 border-red-200',
  };
  return colorMap[colorClass] || 'bg-slate-50 text-slate-700 border-slate-200';
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

const TechItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.2, zIndex: 50, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
      whileTap={{ scale: 0.95 }}
      variants={{
        hidden: { scale: 0, opacity: 0, y: 20 },
        visible: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 12 } }
      }}
      style={{ zIndex: isHovered ? 50 : 1 }}
      className="relative flex flex-col items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 cursor-pointer shrink-0"
    >
      <motion.div
        animate={{
          y: isHovered ? -12 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 flex items-center justify-center p-2 rounded-xl bg-white/0 group-hover:bg-white/40 transition-colors duration-300"
      >
        <img
          src={item.icon}
          alt={item.name}
          className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain drop-shadow-sm filter group-hover:drop-shadow-md transition-all"
        />
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute -bottom-2 flex items-center justify-center pointer-events-none z-50 min-w-max"
          >
            <span className={`text-[10px] font-bold text-center tracking-wide whitespace-nowrap bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.1)] border border-white/50 ${item.color || 'text-slate-700'}`}>
              {item.name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const TechCategory = ({ category, index }) => {
  const Icon = category.icon;
  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="backdrop-blur-[20px] backdrop-saturate-[150%] bg-white/40 border border-white/60 rounded-3xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 h-full relative group/tech flex flex-col justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-3xl" />
      <div className="absolute inset-0 bg-white/0 group-hover/tech:bg-white/20 transition-colors duration-300 pointer-events-none rounded-3xl" />

      <div className="flex items-center gap-2 mb-4 relative z-10 shrink-0">
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          className="p-1.5 bg-white/80 rounded-lg shadow-sm text-slate-400 group-hover/tech:text-indigo-500 group-hover/tech:scale-110 transition-all duration-300"
        >
          <Icon size={16} />
        </motion.div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] group-hover/tech:text-slate-600 transition-colors duration-300">{category.category}</h4>
      </div>

      {/* Horizontal Container (One Line, strictly no scroll) */}
      <motion.div
        layout
        className="flex flex-nowrap items-center gap-2 sm:gap-4 w-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1, delayChildren: index * 0.1 + 0.2 }
          }
        }}
      >
        {category.items.map((item) => (
          <TechItem key={item.name} item={item} />
        ))}
      </motion.div>
    </motion.div>
  );
};

// --- EXTRACTED CONTENT COMPONENTS ---

const BioContent = () => (
  <div className="w-full relative">
    <ParticleDust count={30} direction="right" />
    <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
      <div className="relative shrink-0 group perspective-1000">

        {/* Rotating Glow Ring - Always Visible for Blending */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/30 via-purple-500/0 to-indigo-500/30 rounded-full blur-xl"
        />

        {/* Animated Dashed Border Container - Subtle */}
        <motion.div
          className="absolute -inset-1 rounded-full border border-dashed border-white/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          whileTap={{ scale: 0.95 }}
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.5)] border-[5px] border-white/30 overflow-hidden relative z-10 cursor-pointer ring-1 ring-white/80 transition-all duration-500"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 mix-blend-overlay"
          />
          <motion.img
            src={pfpImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
            initial={{ scale: 1.15 }}
            whileHover={{ scale: 1.25 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>

        {/* Status Dot */}
        <motion.div
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-5 h-5 bg-emerald-500 border-[3px] border-white rounded-full z-20 flex items-center justify-center pointer-events-none shadow-sm"
        >
          <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
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
              className="inline-block hover:text-indigo-600 transition-colors duration-300 transform hover:scale-110 cursor-default"
            >
              {char}
            </motion.span>
          ))}
        </motion.h2>

        <motion.div
          variants={fadeInUpVariants}
          className="inline-block px-3 py-1 mb-4 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest hover:bg-slate-200 hover:scale-105 transition-all cursor-default"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
            {DATA.role}
          </span>
        </motion.div>

        <motion.h3
          variants={fadeInUpVariants}
          className="text-xl sm:text-2xl font-semibold text-slate-700 mb-4 leading-tight tracking-tight"
        >
          Architecting <span className="text-slate-900 underline decoration-indigo-300/50 underline-offset-4 decoration-2">robust systems</span> with <span className="text-slate-800 font-medium italic">precision</span>.
        </motion.h3>

        <motion.p
          variants={fadeInUpVariants}
          className="text-slate-500 text-sm sm:text-base leading-relaxed sm:leading-loose mb-6 font-normal"
        >
          <span className="font-medium text-slate-800 hover:text-indigo-600 transition-colors">Backend-focused</span> engineer building production-style services. I specialize in <span className="font-medium text-slate-800 hover:text-indigo-600 transition-colors">high-concurrency systems</span> using <span className="font-medium text-slate-800 hover:text-indigo-600 transition-colors">Node.js and Go</span>, with a strong focus on <span className="font-medium text-slate-800 hover:text-indigo-600 transition-colors">system reliability</span>.
        </motion.p>

        <motion.div
          variants={fadeInUpVariants}
          className="flex gap-4 justify-center md:justify-start"
        >
          <SocialButton icon={Github} href="https://github.com/ravdreamin" />
          <SocialButton icon={Linkedin} href="https://linkedin.com/in/ravdreamin" />
          <SocialButton icon={Mail} href="mailto:ravcr8r@gmail.com" />
        </motion.div>
      </motion.div>
    </div>
  </div>
);

const SkillsContent = () => (
  <div className="w-full relative">
    <ParticleDust count={30} direction="left" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full content-center">
      {DATA.skills.map((cat, i) => (
        <motion.div
          key={cat.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 + 0.1 }}
        >
          <TechCategory category={cat} index={i} />
        </motion.div>
      ))}
    </div>
  </div>
);

// 6. MAIN HUB
const InteractiveHub = () => {
  const [activeTab, setActiveTab] = useState('bio');
  const [containerHeight, setContainerHeight] = useState('auto');
  const measureRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (measureRef.current) {
        setContainerHeight(measureRef.current.offsetHeight);
      }
    };

    // Initial update
    updateHeight();

    // Re-calculate on resize
    window.addEventListener('resize', updateHeight);

    // Observer for smoother height updates
    const observer = new ResizeObserver(updateHeight);
    if (measureRef.current) observer.observe(measureRef.current);

    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, [activeTab]);

  const isFlipped = activeTab === 'stack';

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl mx-auto mb-16 sm:mb-20 relative z-10"
    >
      <motion.div variants={itemVariants} className="flex justify-center mb-6 sm:mb-8">
        <div className="flex p-1 bg-white/40 backdrop-blur-md rounded-full border border-white/50 shadow-sm overflow-hidden w-full max-w-[300px] sm:w-auto">
          {[
            { id: 'bio', label: 'Profile', icon: User },
            { id: 'stack', label: 'Skills', icon: Wrench }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full text-sm font-bold tracking-tight transition-all duration-300 outline-none flex items-center justify-center gap-2
                ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100"
                  transition={{ type: "spring", stiffness: 250, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon size={14} /> {tab.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Hidden Measure Container */}
      <div
        ref={measureRef}
        className="absolute top-0 left-0 w-full opacity-0 pointer-events-none p-6 sm:p-8 md:p-12 border border-transparent"
        aria-hidden="true"
      >
        {activeTab === 'bio' ? <BioContent /> : <SkillsContent />}
      </div>

      {/* 3D FLIP CONTAINER */}
      <div style={{ perspective: "1200px" }}>
        <motion.div
          animate={{
            height: containerHeight,
            rotateY: isFlipped ? 180 : 0
          }}
          transition={{
            height: { type: "spring", stiffness: 100, damping: 20 },
            rotateY: { duration: 0.6, ease: "easeInOut" }
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="w-full relative rounded-[2rem] sm:rounded-[3rem]"
        >
          {/* FRONT FACE (Bio) */}
          <div
            className="absolute inset-0 p-6 sm:p-8 md:p-12 w-full h-full bg-white/30 backdrop-blur-3xl backdrop-saturate-[180%] border border-white/50 rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] ring-1 ring-white/40"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none rounded-[2rem] sm:rounded-[3rem]" />
            <BioContent key={activeTab} />
          </div>

          {/* BACK FACE (Skills) */}
          <div
            className="absolute inset-0 p-6 sm:p-8 md:p-12 w-full h-full bg-white/30 backdrop-blur-3xl backdrop-saturate-[180%] border border-white/50 rounded-[2rem] sm:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] ring-1 ring-white/40"
            style={{ backfaceVisibility: 'hidden', transform: "rotateY(180deg)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none rounded-[2rem] sm:rounded-[3rem]" />
            <SkillsContent key={activeTab} />
          </div>
        </motion.div>
      </div>
    </motion.div >
  );
};

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
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
      label: "Running"
    },
    working: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      dot: "bg-amber-500",
      label: "In Progress"
    },
    upcoming: {
      bg: "bg-slate-50",
      text: "text-slate-600",
      border: "border-slate-200",
      dot: "bg-slate-400",
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
      <SpotlightCard className="h-full rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-[32px] hover:shadow-2xl transition-all duration-500 border-white/40">
        <a href={project.link} target="_blank" className="block h-full flex flex-col relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-slate-100 group-hover:text-slate-900 transition-all duration-300 border border-slate-100">
                <Icon size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
              </div>
              <StatusBadge status={project.status} />
            </div>
            <div className="p-2 rounded-full text-slate-300 group-hover:text-slate-900 group-hover:bg-slate-100 transition-all">
              <ArrowUpRight size={20} />
            </div>
          </div>
          <h3 className="text-xl font-medium text-slate-800 mb-2 tracking-tight transition-colors">{project.title}</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">{project.desc}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((t) => (
              <span key={t} className="text-[10px] font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-md uppercase tracking-wide border border-slate-100 group-hover:border-slate-300 group-hover:text-slate-800 group-hover:bg-white transition-colors">
                {t}
              </span>
            ))}
          </div>
        </a>
      </SpotlightCard>
    </FloatingCard>
  );
};

const ContactSection = () => (
  <section id="contact" className="max-w-4xl mx-auto mb-20 sm:mb-24 scroll-mt-24">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 md:p-12 shadow-sm overflow-hidden relative"
    >
      <div className="grid md:grid-cols-2 gap-6 md:gap-12 relative z-10">
        <div>
          <h2 className="text-xl sm:text-3xl font-medium text-slate-800 mb-2 sm:mb-4 tracking-tight">Let's connect.</h2>
          <p className="text-slate-500 text-sm sm:text-base mb-6 md:mb-8 leading-relaxed">
            I'm always interested in hearing about new projects and opportunities.
          </p>

          {/* Mobile: Horizontal Icons / Desktop: Vertical List */}
          <div className="flex md:flex-col gap-4 mb-6 md:mb-0">
            <motion.a
              href={`tel:${DATA.phoneRaw}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm sm:text-base"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-slate-50 group-hover:border-slate-200 transition-all">
                <Phone size={18} />
              </div>
              <span className="hidden md:inline group-hover:font-semibold transition-all">{DATA.phone}</span>
            </motion.a>
            <motion.a
              href="mailto:ravcr8r@gmail.com"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm sm:text-base"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-slate-50 group-hover:border-slate-200 transition-all">
                <Mail size={18} />
              </div>
              <span className="hidden md:inline">ravcr8r@gmail.com</span>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/ravdreamin"
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm sm:text-base"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-slate-50 group-hover:border-slate-200 transition-all">
                <Linkedin size={18} />
              </div>
              <span className="hidden md:inline">linkedin.com/in/ravdreamin</span>
            </motion.a>
          </div>
        </div>
        <form className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-4">
            {['Name', 'Email'].map((placeholder, i) => (
              <motion.div
                key={placeholder}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.input
                  whileFocus={{ scale: 1.01, backgroundColor: "#ffffff" }}
                  type={placeholder === 'Email' ? 'email' : 'text'}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-300 transition-all hover:bg-white/80 text-sm"
                />
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.textarea
              whileFocus={{ scale: 1.01, backgroundColor: "#ffffff" }}
              rows={3}
              placeholder="Message"
              className="w-full px-4 py-3 bg-white/50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-300 transition-all resize-none hover:bg-white/80 text-sm"
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 shadow-lg shadow-slate-400/20 flex items-center justify-center gap-2 text-sm"
          >
            <Send size={18} /> Send Message
          </motion.button>
        </form>
      </div>
    </motion.div>
  </section>
);

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
      <SlimeBackground />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-24 md:pt-32 pb-20 relative z-10">
        <div className="hidden md:block h-10"></div>
        <InteractiveHub />
        <section className="mb-24">
          <RevealOnScroll className="flex items-center gap-4 mb-10 px-2">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Selected Systems</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
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

        <RevealOnScroll>
          <ContactSection />
        </RevealOnScroll>

        <footer className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 gap-4 mb-4">
          <div>
            &copy; {new Date().getFullYear()} <span className="font-medium text-slate-600">Gaurav</span>
          </div>
          <div className="flex gap-6">
            <a href="mailto:ravcr8r@gmail.com" className="hover:text-slate-800 transition-colors">Email</a>
            <a href="https://github.com/ravdreamin" className="hover:text-slate-800 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/ravdreamin" className="hover:text-slate-800 transition-colors">LinkedIn</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
