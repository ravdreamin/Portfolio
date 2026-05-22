import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { MagneticHover, FadeIn } from '../ui/Animations';
import { DATA } from '../../data/portfolio';
import pfpImage from '../../assets/pfp1.jpeg';

export const Hero = () => (
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
