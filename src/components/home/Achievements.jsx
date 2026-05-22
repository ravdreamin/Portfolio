import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { FadeIn } from '../ui/Animations';
import { DATA } from '../../data/portfolio';

export const Achievements = () => (
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
