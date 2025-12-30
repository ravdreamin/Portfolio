import React, { useState, useRef, useEffect } from 'react';
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
  User, Download, Activity, Send, Terminal, Cloud, Phone
} from 'lucide-react';

// --- ASSETS ---
import pfpImage from './assets/pfp.jpeg';

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
  visible: {
    y: 0, opacity: 1, filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100 }
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
        { name: "TypeScript", color: "text-blue-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Python", color: "text-emerald-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
      ]
    },
    {
      category: "Backend",
      icon: Server,
      items: [
        { name: "Node.js", color: "text-green-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", color: "text-gray-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
        { name: "Gin", color: "text-sky-400", icon: "https://raw.githubusercontent.com/gin-gonic/logo/master/color.png" },
      ]
    },
    {
      category: "DevOps & Cloud",
      icon: Cloud,
      items: [
        { name: "Docker", color: "text-blue-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Kubernetes", color: "text-blue-600", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
        { name: "AWS", color: "text-orange-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Terraform", color: "text-purple-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" }
      ]
    },
    {
      category: "Database & Store",
      icon: Database,
      items: [
        { name: "PostgreSQL", color: "text-blue-400", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MongoDB", color: "text-green-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Redis", color: "text-red-500", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" }
      ]
    }
  ],
  projects: [
    {
      title: "SRE-Pilot",
      tag: "Featured",
      desc: "A production-grade backend service implementing core SRE patterns: circuit breakers, structured logging, and graceful degradation.",
      tech: ["Go", "Docker", "REST"],
      link: "https://sre-pilot.onrender.com",
    },
    {
      title: "System Monitor",
      tag: "Observability",
      desc: "Real-time distributed system visualizer. Aggregates metrics from multiple microservices into a single pane of glass.",
      tech: ["TS", "React", "Go"],
      link: "#",
    },
    {
      title: "Hyper-LB",
      tag: "Infrastructure",
      desc: "Custom application-layer load balancer exploring advanced routing algorithms beyond round-robin.",
      tech: ["Go", "Networking"],
      link: "#",
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

// 2. SLIME BACKGROUND (VIBRANT GLASS)
const SlimeBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fafafa]">
      {/* Dynamic Glass Flow Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/20 backdrop-blur-[25px] border border-white/40 rounded-full"
            style={{
              width: 250 + i * 50,
              height: 250 + i * 50,
              left: `${15 + i * 20}%`,
              top: `${15 + i * 15}%`,
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

      {/* Truly Vibrant Blobs (Small & Saturated) */}
      <div className="w-full h-full relative" style={{ filter: 'blur(90px)' }}>
        <motion.div
          animate={{ x: [-40, 40, -40], y: [-30, 30, -30], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[25%] w-[60vw] h-[60vw] md:w-[320px] md:h-[320px] bg-indigo-600/50 rounded-full mix-blend-multiply"
        />
        <motion.div
          animate={{ x: [40, -40, 40], y: [30, -30, 30], scale: [1.2, 0.9, 1.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] right-[25%] w-[65vw] h-[65vw] md:w-[350px] md:h-[350px] bg-sky-500/50 rounded-full mix-blend-multiply"
        />
        <motion.div
          animate={{ y: [60, -60, 60], scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] left-[40%] w-[60vw] h-[60vw] md:w-[330px] md:h-[330px] bg-rose-500/50 rounded-full mix-blend-multiply"
        />
        <motion.div
          animate={{ x: [-50, 50, -50], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
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

// 5. NAVBAR
const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none">
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="pointer-events-auto w-full max-w-5xl flex items-center justify-between bg-white/60 backdrop-blur-xl border border-white/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 360, backgroundColor: "#6366f1" }}
          transition={{ duration: 0.6 }}
          className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold text-sm"
        >
          G
        </motion.div>
        <div className="text-slate-800 font-bold text-sm tracking-tight block">
          portfolio<span className="opacity-50">/</span>gaurav
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <a href="#contact" className="text-sm font-medium tracking-tight text-slate-500 hover:text-slate-900 transition-colors">Contact</a>
        <motion.a
          whileHover={{ scale: 1.05, backgroundColor: "#0f172a" }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="px-3 sm:px-4 py-1.5 bg-slate-800 text-white rounded-full text-xs font-medium tracking-widest hover:bg-slate-900 transition-colors flex items-center gap-2 shadow-sm"
          title="Download CV"
        >
          <Download size={14} /> <span className="hidden sm:inline">CV</span>
        </motion.a>
      </div>
    </motion.div>
  </nav>
);

const TechCategory = ({ category }) => {
  const Icon = category.icon;
  return (
    <div className="backdrop-blur-[20px] backdrop-saturate-[150%] bg-white/40 border border-white/60 rounded-3xl p-4 sm:p-6 shadow-sm h-full relative overflow-hidden group/tech">
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 mb-4 sm:mb-6 relative z-10">
        <div className="p-1.5 bg-white/80 rounded-lg shadow-sm text-slate-400">
          <Icon size={16} />
        </div>
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{category.category}</h4>
      </div>
      <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-8 items-center justify-start px-1 sm:px-2 relative z-10">
        {category.items.map((item) => (
          <motion.div
            key={item.name}
            className="group relative flex flex-col items-center"
            whileHover="hover"
            initial="initial"
            whileTap="hover"
          >
            <motion.div
              variants={{
                hover: { y: -8, scale: 1.15 }
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-10 h-10 flex items-center justify-center transition-all duration-300"
            >
              <img src={item.icon} alt={item.name} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
            </motion.div>

            <motion.span
              variants={{
                initial: { opacity: 0, y: 5, scale: 0.9 },
                hover: { opacity: 1, y: 12, scale: 1 }
              }}
              className="absolute whitespace-nowrap text-[10px] font-bold text-slate-700 tracking-wider pointer-events-none bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded shadow-sm border border-slate-100 z-20"
            >
              {item.name}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// 6. MAIN HUB
const InteractiveHub = () => {
  const [activeTab, setActiveTab] = useState('bio');
  const [containerHeight, setContainerHeight] = useState('auto');
  const bioRef = useRef(null);
  const stackRef = useRef(null);

  useEffect(() => {
    // Update container height based on active tab
    const updateHeight = () => {
      if (activeTab === 'bio' && bioRef.current) {
        setContainerHeight(bioRef.current.offsetHeight);
      } else if (activeTab === 'stack' && stackRef.current) {
        setContainerHeight(stackRef.current.offsetHeight);
      }
    };

    // Initial update
    updateHeight();

    // Re-calculate on resize
    window.addEventListener('resize', updateHeight);
    // Also use a timeout to let animations/rendering settle
    const tm = setTimeout(updateHeight, 100);
    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(tm);
    };
  }, [activeTab]);

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
            { id: 'stack', label: 'Tech Stack', icon: Wrench }
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
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <tab.icon size={14} /> {tab.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      <div className="relative" style={{ perspective: "2000px" }}>
        <motion.div
          animate={{
            rotateY: activeTab === 'stack' ? 180 : 0,
            height: containerHeight
          }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 40,
            damping: 15
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full"
        >
          {/* FRONT SIDE: Profile */}
          <div
            ref={bioRef}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute top-0 left-0 w-full"
            aria-hidden={activeTab === 'stack'}
          >
            <div className="bg-white/40 backdrop-blur-[32px] backdrop-saturate-[200%] border border-white/80 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
              <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center relative z-10">
                <div className="relative shrink-0 group">
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={{ scale: 1.05, rotate: 3 }}
                    className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full p-1 bg-white border border-slate-100 shadow-xl overflow-hidden relative z-10"
                  >
                    <img src={pfpImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  </motion.div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-light text-slate-900 mb-2 sm:mb-4 tracking-tight"
                  >
                    {DATA.name}
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="inline-block px-3 py-1 mb-4 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-widest"
                  >
                    {DATA.role}
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="text-xl sm:text-2xl font-semibold text-slate-700 mb-4 leading-tight tracking-tight"
                  >
                    Architecting <span className="text-slate-900">robust systems</span> with <span className="text-slate-800 font-medium">precision</span>.
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="text-slate-500 text-sm sm:text-base leading-relaxed sm:leading-loose mb-6 font-normal"
                  >
                    <span className="font-medium text-slate-800">Backend-focused</span> engineer building production-style services. I specialize in <span className="font-medium text-slate-800">high-concurrency systems</span> using <span className="font-medium text-slate-800">Node.js, TypeScript, and Go</span>, with a strong focus on <span className="font-medium text-slate-800">system reliability</span>.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="flex gap-4 justify-center md:justify-start"
                  >
                    <SocialButton icon={Github} href="https://github.com/ravdreamin" />
                    <SocialButton icon={Linkedin} href="https://linkedin.com/in/ravdreamin" />
                    <SocialButton icon={Mail} href="mailto:ravcr8r@gmail.com" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* BACK SIDE: Tech Stack */}
          <div
            ref={stackRef}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute top-0 left-0 w-full"
            aria-hidden={activeTab === 'bio'}
          >
            <div className="bg-white/40 backdrop-blur-[32px] backdrop-saturate-[200%] border border-white/80 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] h-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full content-center">
                {DATA.skills.map((cat, i) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeTab === 'stack' ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ delay: i * 0.1 + 0.4 }}
                  >
                    <TechCategory category={cat} index={i} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const SocialButton = ({ icon: Icon, href }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noreferrer"
    whileHover={{ scale: 1.15, rotate: 5, color: "#334155", borderColor: "#94a3b8" }}
    whileTap={{ scale: 0.95 }}
    className="p-3 bg-white border border-slate-100 rounded-full text-slate-400 hover:shadow-lg transition-all shadow-sm"
  >
    <Icon size={18} />
  </motion.a>
);

// 7. PROJECT CARD WITH FLOATING ANIMATION
const ProjectCard = ({ project, index }) => (
  <FloatingCard delay={index * 0.5} className="h-full">
    <SpotlightCard className="h-full rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-[32px] hover:shadow-2xl transition-all duration-500 border-white/40">
      <a href={project.link} target="_blank" className="block h-full flex flex-col relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-slate-100 group-hover:text-slate-900 transition-all duration-300 border border-slate-100">
            <Server size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
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

const ContactSection = () => (
  <section id="contact" className="max-w-4xl mx-auto mb-20 sm:mb-24 scroll-mt-24">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/30 backdrop-blur-xl border border-white/60 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-sm overflow-hidden relative"
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative z-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-medium text-slate-800 mb-4 tracking-tight">Let's connect.</h2>
          <p className="text-slate-500 text-sm sm:text-base mb-8 leading-relaxed">
            I'm always interested in hearing about new projects and opportunities.
          </p>
          <div className="flex flex-col gap-4">
            <motion.a
              href={`tel:${DATA.phoneRaw}`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors font-medium text-sm sm:text-base"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-slate-50 group-hover:border-slate-200 transition-all">
                <Phone size={18} />
              </div>
              <span className="group-hover:font-semibold transition-all">{DATA.phone}</span>
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
              ravcr8r@gmail.com
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
              linkedin.com/in/ravdreamin
            </motion.a>
          </div>
        </div>
        <form className="space-y-4">
          {['Name', 'Email'].map((placeholder, i) => (
            <motion.div
              key={placeholder}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-2"
            >
              <motion.input
                whileFocus={{ scale: 1.01, backgroundColor: "#ffffff" }}
                type={placeholder === 'Email' ? 'email' : 'text'}
                placeholder={placeholder}
                className="w-full px-5 py-3.5 bg-white/50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-300 transition-all hover:bg-white/80 text-sm"
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.textarea
              whileFocus={{ scale: 1.01, backgroundColor: "#ffffff" }}
              rows={4}
              placeholder="Message"
              className="w-full px-5 py-3.5 bg-white/50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 focus:border-slate-300 transition-all resize-none hover:bg-white/80 text-sm"
            />
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-slate-800 text-white font-medium rounded-xl hover:bg-slate-700 shadow-lg shadow-slate-400/20 flex items-center justify-center gap-2 text-sm"
          >
            <Send size={18} /> Send Message
          </motion.button>
        </form>
      </div>
    </motion.div>
  </section>
);

export default function App() {
  return (
    <div
      className="min-h-screen text-slate-800 selection:bg-slate-100 selection:text-slate-900 relative"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <HeadManager />
      <SlimeBackground />
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="h-10"></div>
        <InteractiveHub />
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-10 px-2"
          >
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Selected Systems</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.projects.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProjectCard project={p} index={i} />
              </motion.div>
            ))}
          </div>
        </section>
        <ContactSection />
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