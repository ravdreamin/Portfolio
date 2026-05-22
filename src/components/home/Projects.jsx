import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Github, ArrowUpRight } from 'lucide-react';
import { AnimatedCard, FadeIn } from '../ui/Animations';
import { DATA } from '../../data/portfolio';

export const Projects = () => (
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
