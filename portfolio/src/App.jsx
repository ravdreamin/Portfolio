import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  Code2, 
  Database, 
  Server, 
  Globe,
  Cpu,
  Layers,
  Zap,
  Layout,
  Play,
  MessageSquare,
  Send,
  ArrowRight,
  Copy,
  Check,
  Download 
} from 'lucide-react';

// --- MATRIX RAIN COMPONENT (Black BG + White Text) ---
const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    const cols = Math.floor(width / 20);
    const ypos = Array(cols).fill(0);
    
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    const draw = () => {
      // Black background with very low opacity for long, smooth trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
      ctx.fillRect(0, 0, width, height);
      
      // White / Silver text for high contrast monochrome look
      ctx.fillStyle = '#E5E7EB'; // Tailwind gray-200
      ctx.font = '14px monospace';
      
      ypos.forEach((y, index) => {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = index * 20;
        ctx.fillText(text, x, y);
        
        if (y > height && Math.random() > 0.975) {
          ypos[index] = 0;
        } else {
          ypos[index] = y + 20;
        }
      });
    };

    const interval = setInterval(draw, 50);
    
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full absolute top-0 left-0" />;
};

const NotionPortfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- DATA ---

  const profile = {
    name: "Ayush Kumar",
    role: "Full Stack JavaScript Developer", 
    tagline: "Backend-focused | MERN Stack",
    location: "Chandigarh, India",
    email: "ayushhkrr@gmail.com",
    socials: {
      linkedin: "https://linkedin.com/in/ayush-kumar-a1935b331",
      github: "https://github.com/ayushhkrr"
    },
    summary: "Full-Stack Developer skilled in MERN stack with hands-on experience building and deploying production-style projects with authentication, payments, and cloud deployment. Strong focus on REST APIs, scalable backend architecture, and real-world integrations like Stripe."
  };

  const projects = [
    {
      emoji: "🤖",
      title: "PromptVerse - AI Marketplace",
      image: "/promptverse.jpeg",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      desc: "A full-featured marketplace for AI prompts. Implemented JWT auth, protected routes, and role-based access. Integrated Stripe for payments and optimized API latency.",
      liveLink: "https://prompt-verse-omega.vercel.app", 
      repoLink: "https://github.com/ayushhkrr/promptverse",
    },
    {
      emoji: "🔗",
      title: "URL Shortener Service",
      image: "/urlshortner.jpeg",
      tags: ["React", "Vite", "Express", "Rest API"],
      desc: "A robust URL shortening application. Features custom alias generation, QR codes, and click tracking. Backend deployed on Render, Frontend on Vercel.",
      liveLink: "https://url-shortener-eight-pink.vercel.app", 
      repoLink: "https://github.com/ayushhkrr/URL-Shortener",
    },
    {
      emoji: "💳",
      title: "Subscription Manager",
      image: "/submanager.jpeg",
      tags: ["Node.js", "Cron Jobs", "Security", "Stripe"],
      desc: "Automated subscription tracking system. Uses Cron jobs for renewal reminders and Stripe webhooks for status updates. Built with heavy focus on API security.",
      liveLink: "https://sub-man-seven.vercel.app",
      repoLink: "https://github.com/ayushhkrr/Subs-Manager",
    }
  ];

  const skills = {
    backend: ["Node.js", "Express", "JWT", "REST APIs", "Stripe"],
    frontend: ["React.js", "TailwindCSS", "Vite"],
    database: ["MongoDB", "Mongoose"],
    tools: ["Git", "GitHub", "Vercel", "Render", "Postman"]
  };

  // --- COMPONENTS ---

  const FadeIn = ({ children, delay = 0, className = "" }) => (
    <div 
      className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  // Material Design Chip Style
  const MaterialChip = ({ text, color = "default" }) => {
    const colors = {
      blue: "bg-blue-50 text-blue-700 border-blue-200",
      green: "bg-emerald-50 text-emerald-700 border-emerald-200",
      orange: "bg-orange-50 text-orange-700 border-orange-200",
      purple: "bg-purple-50 text-purple-700 border-purple-200",
      default: "bg-gray-100 text-gray-700 border-gray-200"
    };
    
    let selectedColor = color;
    if (['React', 'React.js', 'TailwindCSS'].includes(text)) selectedColor = 'blue';
    if (['Node.js', 'Express', 'MongoDB'].includes(text)) selectedColor = 'green';
    if (['Stripe', 'JWT', 'Security'].includes(text)) selectedColor = 'purple';
    if (['Vercel', 'Render', 'Git'].includes(text)) selectedColor = 'orange';

    return (
      <span className={`px-3 py-1 rounded-full text-[12px] font-medium mr-2 mb-2 inline-flex items-center border transition-all duration-300 hover:shadow-sm ${colors[selectedColor] || colors.default}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#37352f] pb-20 overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .material-shadow { box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .material-shadow:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.12); transform: translateY(-2px); }
        .material-btn { box-shadow: 0 2px 4px rgba(0,0,0,0.1); transition: all 0.2s; }
        .material-btn:active { box-shadow: 0 1px 2px rgba(0,0,0,0.1); transform: translateY(1px); }
        
        .material-input { 
          transition: all 0.2s; 
          border: 1px solid #E5E7EB;
        }
        .material-input:focus { 
          border-color: #3B82F6; 
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          outline: none;
        }
      `}</style>

      {/* Top Navigation Bar - Material App Bar Style */}
      <div className="h-14 flex items-center justify-between px-6 sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 text-sm">
          <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md cursor-pointer hover:scale-105 transition-transform">A</span>
          <span className="font-semibold text-gray-800 tracking-tight">ayush-kumar / portfolio</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-gray-600 items-center">
          <a href="#contact" className="hover:text-black transition duration-200 hidden sm:block relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-black after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">Contact</a>
          <a 
            href="/Resume.pdf" // Ensure Resume.pdf is in your 'public' folder
            download="Ayush_Kumar_Resume.pdf"
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition material-btn"
          >
            <Download size={16} />
            <span>CV</span>
          </a>
        </div>
      </div>

      {/* Cover Image - Black Matrix Rain Effect */}
      <div className="group relative h-64 w-full bg-black overflow-hidden border-b border-gray-100 shadow-inner">
        <MatrixRain />
        {/* Subtle bottom gradient to blend into the white card below */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 relative -mt-20 z-10">
        
        {/* Profile Header Card - Material Card */}
        <FadeIn delay={100}>
          <div className="bg-white rounded-2xl p-8 material-shadow mb-12 relative overflow-hidden border border-gray-50">
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Image with Ring */}
              <div className="relative shrink-0">
                <div className="w-32 h-32 bg-white rounded-full shadow-lg p-1.5 -mt-16 md:mt-0">
                   <img 
                    src="/profile.png" 
                    alt={profile.name} 
                    className="w-full h-full object-cover rounded-full bg-gray-50"
                    onError={(e) => {e.target.src = "https://ui-avatars.com/api/?name=Ayush+Kumar&background=random"}} 
                  />
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full" title="Available for work"></div>
              </div>

              <div className="flex-1 w-full">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                <p className="text-lg text-gray-600 mb-6">{profile.tagline}</p>
                
                {/* Meta Data Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-600">
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                    <div className="w-5 mt-0.5 text-gray-400"><Layout size={18}/></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Role</span>
                        <span className="font-medium text-gray-900">{profile.role}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer" onClick={handleCopyEmail}>
                    <div className="w-5 mt-0.5 text-gray-400"><Mail size={18}/></div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email</span>
                        <div className="flex items-center gap-2">
                             <span className="font-medium text-gray-900 truncate">{profile.email}</span>
                             {copied && <Check size={14} className="text-green-500" />}
                        </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                    <div className="w-5 mt-0.5 text-gray-400"><MapPin size={18}/></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Location</span>
                        <span className="font-medium text-gray-900">{profile.location}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                    <div className="w-5 mt-0.5 text-gray-400"><Globe size={18}/></div>
                    <div className="flex flex-col">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Socials</span>
                        <div className="flex gap-3 mt-1">
                          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="hover:text-black transition"><Github size={18}/></a>
                          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition"><Linkedin size={18}/></a>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* About Section */}
        <FadeIn delay={200}>
          <div className="mb-16">
             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-black rounded-full"></span>
                About Me
             </h3>
             <div className="bg-white p-6 rounded-2xl border border-gray-100 material-shadow">
                <p className="text-gray-600 leading-relaxed">
                    {profile.summary}
                </p>
             </div>
          </div>
        </FadeIn>

        {/* Projects Gallery View */}
        <div className="mb-16">
          <FadeIn delay={300}>
             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-black rounded-full"></span>
                Featured Projects
             </h3>
          </FadeIn>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <FadeIn key={idx} delay={400 + (idx * 100)}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 material-shadow flex flex-col h-full group">
                  
                  {/* Project Cover Image */}
                  <div className="h-40 w-full overflow-hidden relative bg-gray-100">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"}} 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-xl shadow-sm">
                      <span className="text-xl">{project.emoji}</span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-auto">
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-black transition material-btn"
                      >
                        <Globe size={16} /> Live Demo
                      </a>
                      <a 
                        href={project.repoLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-50 transition material-btn"
                      >
                        <Code2 size={16} /> Code
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
           <FadeIn delay={600}>
             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-black rounded-full"></span>
                Technical Skills
             </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Backend Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 material-shadow">
                 <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Server size={20}/></div>
                   <span className="font-bold text-gray-900">Backend Engineering</span>
                 </div>
                 <div className="flex flex-wrap">
                   {skills.backend.map(s => <MaterialChip key={s} text={s} color="blue" />)}
                 </div>
              </div>

              {/* Frontend Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 material-shadow">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Layout size={20}/></div>
                   <span className="font-bold text-gray-900">Frontend & UI</span>
                 </div>
                 <div className="flex flex-wrap">
                   {skills.frontend.map(s => <MaterialChip key={s} text={s} color="purple" />)}
                 </div>
              </div>

               {/* Database & Tools Card */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 material-shadow sm:col-span-2">
                 <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-50 rounded-lg text-green-600"><Database size={20}/></div>
                   <span className="font-bold text-gray-900">Database & DevOps</span>
                 </div>
                 <div className="flex flex-wrap">
                   {skills.database.map(s => <MaterialChip key={s} text={s} color="green" />)}
                   {skills.tools.map(s => <MaterialChip key={s} text={s} color="orange" />)}
                 </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Contact Section - Material Form */}
        <FadeIn delay={800}>
          <div id="contact" className="mb-12">
             <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-black rounded-full"></span>
                Get in Touch
             </h3>
            
            <div className="bg-white rounded-2xl border border-gray-100 material-shadow overflow-hidden flex flex-col lg:flex-row">
              
              {/* Left: Context */}
              <div className="bg-gray-50 p-8 lg:w-2/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Let's build something amazing</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    I'm currently available for freelance work or full-time opportunities. If you have a project that needs some creative tech wizardry, I'd love to hear about it.
                  </p>
                </div>

                <div className="space-y-4">
                  <a href={`mailto:${profile.email}`} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition group">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Mail size={18}/></div>
                    <div>
                       <p className="text-xs text-gray-500 font-medium uppercase">Email Me</p>
                       <p className="font-semibold text-gray-900">{profile.email}</p>
                    </div>
                  </a>
                  
                   <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition group">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><Linkedin size={18}/></div>
                    <div>
                       <p className="text-xs text-gray-500 font-medium uppercase">LinkedIn</p>
                       <p className="font-semibold text-gray-900">Connect with me</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right: Form Visual */}
              <div className="p-8 lg:w-3/5 bg-white">
                 <div className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="flex flex-col gap-2">
                       <label className="text-sm font-semibold text-gray-700">Name</label>
                       <input type="text" className="material-input w-full rounded-lg p-3 text-gray-700 bg-gray-50" placeholder="John Doe" />
                     </div>
                     <div className="flex flex-col gap-2">
                       <label className="text-sm font-semibold text-gray-700">Email</label>
                       <input type="email" className="material-input w-full rounded-lg p-3 text-gray-700 bg-gray-50" placeholder="john@example.com" />
                     </div>
                   </div>
                   
                   <div className="flex flex-col gap-2">
                     <label className="text-sm font-semibold text-gray-700">Message</label>
                     <textarea rows="4" className="material-input w-full rounded-lg p-3 text-gray-700 bg-gray-50 resize-none" placeholder="Tell me about your project..."></textarea>
                   </div>
                   
                   <button className="w-full bg-black text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition material-btn">
                     <Send size={18} /> Send Message
                   </button>
                 </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={1000}>
          <div className="text-center text-gray-400 text-sm pb-8 pt-8">
            <p>© {new Date().getFullYear()} Ayush Kumar. Crafted with React & Tailwind.</p>
          </div>
        </FadeIn>

      </div>
    </div>
  );
};

export default NotionPortfolio;