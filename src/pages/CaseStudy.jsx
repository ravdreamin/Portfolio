import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Github, Check } from 'lucide-react';
import { FadeIn } from '../components/ui/Animations';
import { DATA } from '../data/portfolio';

export const CaseStudy = () => {
  const { slug } = useParams();
  const project = DATA.projects.find(p => p.title.toLowerCase() === slug);

  if (!project) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Project not found</h1>
          <Link to="/work" className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            ← Back to Work
          </Link>
        </div>
      </div>
    );
  }

  const cs = project.caseStudy;

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">

        {/* Back */}
        <FadeIn>
          <Link to="/work" className="inline-flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-10">
            ← Back to Work
          </Link>
        </FadeIn>

        {/* Header */}
        <FadeIn>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 flex items-center justify-center shadow-lg">
              <project.icon size={22} className="text-white dark:text-slate-900" strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                {project.title}
              </h1>
            </div>
          </div>
          <p className="text-xl text-slate-500 dark:text-slate-400 italic mb-8">
            {cs.tagline}
          </p>
        </FadeIn>

        {/* Action buttons */}
        <FadeIn delay={0.05}>
          <div className="flex flex-wrap gap-3 mb-10">
            <a href={project.link} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-100 transition-all">
              <Globe size={15} /> Live Preview
            </a>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/60 dark:bg-white/[0.05] border border-slate-200/50 dark:border-white/10 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-white dark:hover:bg-white/[0.08] transition-all">
                <Github size={15} /> Source Code
              </a>
            )}
          </div>
        </FadeIn>

        {/* Hero Screenshot */}
        <FadeIn delay={0.1}>
          <div className="rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 mb-16 shadow-lg shadow-slate-200/30 dark:shadow-none">
            <img src={project.image} alt={`${project.title} screenshot`} className="w-full object-cover object-top" />
          </div>
        </FadeIn>

        {/* Overview */}
        <FadeIn delay={0.12}>
          <section className="mb-14">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
              Overview
            </h2>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-[1.8]">
              {cs.overview}
            </p>
          </section>
        </FadeIn>

        {/* Problem & Solution */}
        <FadeIn delay={0.14}>
          <section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/10">
              <h3 className="text-xs font-bold text-red-400 dark:text-red-400/80 uppercase tracking-[0.2em] mb-3">
                Problem
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {cs.problem}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/10">
              <h3 className="text-xs font-bold text-emerald-500 dark:text-emerald-400/80 uppercase tracking-[0.2em] mb-3">
                Solution
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {cs.solution}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Key Features */}
        <FadeIn delay={0.16}>
          <section className="mb-14">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cs.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/[0.04] transition-all"
                >
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{f.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Tech Stack */}
        <FadeIn delay={0.18}>
          <section className="mb-14">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">
              Technology
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="px-4 py-2 text-sm rounded-xl bg-white/60 dark:bg-white/[0.04] border border-slate-200/50 dark:border-white/10 text-slate-700 dark:text-slate-300 font-medium">
                  {t}
                </span>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Results */}
        <FadeIn delay={0.2}>
          <section className="mb-8">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">
              Results & Impact
            </h2>
            <div className="space-y-3">
              {cs.results.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/40 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/10"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} className="text-emerald-600 dark:text-emerald-400" strokeWidth={3} />
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">{r}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </FadeIn>

      </div>
    </div>
  );
};
