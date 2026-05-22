import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check, Copy } from 'lucide-react';
import { FadeIn, MagneticHover } from '../ui/Animations';
import { DATA } from '../../data/portfolio';

export const Contact = () => {
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
