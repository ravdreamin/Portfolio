import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { FadeIn } from '../ui/Animations';
import { DATA } from '../../data/portfolio';

export const Skills = () => (
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
