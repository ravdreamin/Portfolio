import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MagneticHover } from '../ui/Animations';
import cvFile from '../../assets/CV-gaurav.pdf';

export const Header = ({ theme, toggleTheme }) => (
  <div className="fixed bottom-4 sm:bottom-6 left-2 right-2 sm:left-0 sm:right-0 z-50 flex justify-center pointer-events-none">
    <motion.header
      className="relative rounded-full pointer-events-auto p-[1px] overflow-hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Beam border */}
      <motion.div
        className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
        style={{ background: 'conic-gradient(from 0deg, transparent 0%, #3b82f6 10%, #8b5cf6 20%, transparent 30%, transparent 100%)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      {/* Inner pill */}
      <div className="relative rounded-full bg-white/70 dark:bg-[#0a0a0a]/80 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-none">
        <div className="px-1 py-1 sm:px-1.5 sm:py-1.5 flex items-center justify-between gap-0 sm:gap-1">
          {/* LOGO PILL */}
          <MagneticHover>
            <motion.div
              className="flex items-center justify-center px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full hover:bg-white/80 dark:hover:bg-white/[0.08] transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/"
                className="text-2xl sm:text-2xl font-normal text-slate-900 dark:text-slate-100 pr-1"
                style={{ fontFamily: "'Great Vibes', cursive", letterSpacing: "1px" }}
              >
                gk
              </Link>
            </motion.div>
          </MagneticHover>

          <div className="w-[1px] h-3 sm:h-4 bg-slate-300/50 dark:bg-white/10 mx-0.5 sm:mx-1" />

          {/* NAV PILLS */}
          <nav className="flex items-center gap-0.5 sm:gap-1">
            {["Work", "Blog", "Gallery"].map((item) => {
              const toPath = `/${item.toLowerCase()}`;
              return (
                <MagneticHover key={item}>
                  <Link
                    to={toPath}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/80 dark:hover:bg-white/[0.08] transition-all cursor-pointer pointer-events-auto flex items-center whitespace-nowrap"
                  >
                    {item}
                  </Link>
                </MagneticHover>
              );
            })}
          </nav>

          <div className="w-[1px] h-3 sm:h-4 bg-slate-300/50 dark:bg-white/10 mx-0.5 sm:mx-1" />

          {/* ACTION PILLS */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            <MagneticHover>
              <motion.button
                onClick={toggleTheme}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/80 dark:hover:bg-white/[0.08] transition-all cursor-pointer pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'light' ? (
                    <Moon size={14} strokeWidth={2.5} />
                  ) : (
                    <Sun size={14} strokeWidth={2.5} />
                  )}
                </motion.div>
              </motion.button>
            </MagneticHover>

            <MagneticHover>
              <motion.a
                href={cvFile}
                download="CV.pdf"
                className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] sm:text-xs font-semibold hover:bg-slate-800 dark:hover:bg-white transition-all cursor-pointer pointer-events-auto shadow-sm ml-0.5 sm:ml-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="font-semibold tracking-wide">CV</span>
              </motion.a>
            </MagneticHover>
          </div>
        </div>
      </div>
    </motion.header>
  </div>
);
