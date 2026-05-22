import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { FadeIn } from '../components/ui/Animations';
import { DATA } from '../data/portfolio';

export const Work = () => {
  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Page Title */}
        <FadeIn>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            Work
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-16 leading-relaxed">
            My journey and the projects I've shipped along the way.
          </p>
        </FadeIn>

        {/* Experience Section */}
        <section className="mb-20">
          <FadeIn>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-8">
              Experience
            </h2>
          </FadeIn>

          <div className="relative pl-4 sm:pl-8 border-l border-slate-200/60 dark:border-white/10 space-y-10 sm:space-y-12">
            {DATA.experience.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[21px] sm:-left-[37px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/20 ring-4 ring-white dark:ring-[#0a0a0a] group-hover:bg-slate-900 dark:group-hover:bg-white transition-colors" />

                  <div className="p-5 sm:p-6 rounded-2xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm hover:bg-white dark:hover:bg-white/[0.04] transition-all">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{exp.role}</h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-mono bg-slate-100 dark:bg-white/[0.05] border border-slate-200/50 dark:border-white/5 px-2.5 py-1 rounded-md w-fit">
                        <Calendar size={12} />
                        {exp.duration}
                      </div>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {exp.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Projects / Case Studies Section */}
        <section>
          <FadeIn>
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-8">
              Case Studies
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DATA.projects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.06}>
                <Link
                  to={`/work/${project.title.toLowerCase()}`}
                  className="block group h-full"
                >
                  <div className="relative rounded-2xl bg-white/40 dark:bg-white/[0.02] backdrop-blur-sm border border-slate-200/50 dark:border-white/10 overflow-hidden hover:bg-white/60 dark:hover:bg-white/[0.04] hover:border-slate-300 dark:hover:border-white/20 transition-all h-full flex flex-col">
                    {/* Screenshot */}
                    <div className="aspect-[16/10] overflow-hidden border-b border-slate-200/30 dark:border-white/10">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">{project.title}</h3>
                        <ArrowUpRight size={14} strokeWidth={2} className="text-slate-400 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[12px] leading-relaxed mb-3 flex-1">
                        {project.desc}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {project.tech.slice(0, 3).map((t) => (
                          <span key={t} className="px-2 py-0.5 text-[11px] rounded-md bg-slate-100/80 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
