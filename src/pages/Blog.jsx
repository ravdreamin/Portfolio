import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, BookOpen, ArrowUpRight } from 'lucide-react';
import { FadeIn } from '../components/ui/Animations';

export const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'medium', 'hashnode'

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const allArticles = [];

      // Fetch Hashnode articles via GraphQL
      try {
        const hnRes = await fetch('https://gql.hashnode.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `{ publication(host: "ravdreamin.hashnode.dev") { posts(first: 20) { edges { node { title brief url publishedAt readTimeInMinutes coverImage { url } tags { name } } } } } }`
          }),
        });
        if (hnRes.ok) {
          const hnData = await hnRes.json();
          const edges = hnData?.data?.publication?.posts?.edges || [];
          edges.forEach(({ node: a }) => {
            allArticles.push({
              title: a.title,
              desc: a.brief?.slice(0, 160) + (a.brief?.length > 160 ? '...' : ''),
              url: a.url,
              date: new Date(a.publishedAt),
              readTime: a.readTimeInMinutes,
              tags: a.tags?.map(t => t.name)?.slice(0, 3) || [],
              cover: a.coverImage?.url || null,
              platform: 'hashnode',
            });
          });
        }
      } catch (e) { /* silently skip */ }

      // Fetch Medium articles via RSS (with CORS proxy + XML parsing)
      try {
        const medRes = await fetch('https://api.codetabs.com/v1/proxy?quest=https://medium.com/feed/@ravdreamin');
        if (medRes.ok) {
          const xmlText = await medRes.text();
          const parser = new DOMParser();
          const xml = parser.parseFromString(xmlText, 'text/xml');
          const items = xml.querySelectorAll('item');
          items.forEach(item => {
            const title = item.querySelector('title')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const contentEncoded = item.getElementsByTagNameNS('*', 'encoded')[0]?.textContent || '';
            const categories = [...item.querySelectorAll('category')].map(c => c.textContent);
            // Extract cover image
            const imgMatch = contentEncoded.match(/<img[^>]+src="([^"]+)"/);
            const cover = imgMatch ? imgMatch[1] : null;
            // Extract plain text
            const plainText = contentEncoded.replace(/<[^>]+>/g, '').trim();
            const desc = plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
            const wordCount = plainText.split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(wordCount / 200));

            allArticles.push({
              title,
              desc,
              url: link,
              date: new Date(pubDate),
              readTime,
              tags: categories.slice(0, 3),
              cover,
              platform: 'medium',
            });
          });
        }
      } catch (e) { /* silently skip */ }

      // Sort by date (newest first)
      allArticles.sort((a, b) => b.date - a.date);
      setArticles(allArticles);
      setLoading(false);
    };

    fetchArticles();
  }, []);

  const filtered = filter === 'all' ? articles : articles.filter(a => a.platform === filter);

  const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="pt-24 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Hero header */}
        <FadeIn>
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
              Blog
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Thoughts on engineering, systems design, and building things that work.
            </p>
          </div>
        </FadeIn>

        {/* Filter tabs + article count */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex overflow-x-auto snap-x gap-1.5 p-1 rounded-xl bg-white/50 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/[0.06] w-full sm:w-auto self-start">
              {[
                { key: 'all', label: 'All Posts' },
                { key: 'medium', label: 'Medium' },
                { key: 'hashnode', label: 'Hashnode' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`snap-start whitespace-nowrap px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${filter === key
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {!loading && (
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium tabular-nums">
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
              </span>
            )}
          </div>
        </FadeIn>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 dark:from-violet-400/10 dark:to-indigo-400/10 flex items-center justify-center">
              <Loader2 size={20} className="text-violet-500 dark:text-violet-400 animate-spin" />
            </div>
            <p className="text-slate-400 dark:text-slate-500 text-sm font-medium">Fetching articles...</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <FadeIn>
            <div className="text-center py-24">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-white/[0.04] flex items-center justify-center mx-auto mb-5">
                <BookOpen size={24} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
                {filter === 'all' ? 'No articles yet' : `No ${filter === 'medium' ? 'Medium' : 'Hashnode'} articles`}
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-xs">
                Articles will appear here once published.
              </p>
            </div>
          </FadeIn>
        )}

        {/* Articles */}
        {!loading && filtered.length > 0 && (
          <div className="space-y-5">
            {/* Featured (first) article — large card */}
            {filtered.slice(0, 1).map((article, i) => (
              <FadeIn key={article.url} delay={0.08}>
                <a href={article.url} target="_blank" rel="noreferrer" className="block group">
                  <motion.div
                    className="rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Cover image — full width hero */}
                    {article.cover ? (
                      <div className="relative aspect-[2.4/1] overflow-hidden">
                        <img
                          src={article.cover}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md backdrop-blur-sm ${article.platform === 'medium'
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-500/30 text-blue-100'
                              }`}>
                              {article.platform === 'medium' ? 'Medium' : 'Hashnode'}
                            </span>
                            <span className="text-white/60 text-[11px]">{formatDate(article.date)}</span>
                            {article.readTime && <span className="text-white/60 text-[11px]">· {article.readTime} min read</span>}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 leading-tight group-hover:text-white/90 transition-colors">
                            {article.title}
                          </h2>
                        </div>
                      </div>
                    ) : (
                      <div className="relative aspect-[2.4/1] overflow-hidden bg-gradient-to-br from-violet-500/5 via-indigo-500/5 to-purple-500/5 dark:from-violet-500/10 dark:via-indigo-500/10 dark:to-purple-500/10 flex items-end">
                        <div className="absolute top-6 right-6">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-400/20 to-indigo-400/20 blur-2xl" />
                        </div>
                        <div className="p-6 w-full">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${article.platform === 'medium'
                              ? 'bg-slate-900/10 dark:bg-white/10 text-slate-700 dark:text-slate-300'
                              : 'bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400'
                              }`}>
                              {article.platform === 'medium' ? 'Medium' : 'Hashnode'}
                            </span>
                            <span className="text-slate-400 dark:text-slate-500 text-[11px]">{formatDate(article.date)}</span>
                            {article.readTime && <span className="text-slate-400 dark:text-slate-500 text-[11px]">· {article.readTime} min read</span>}
                          </div>
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1 leading-tight">
                            {article.title}
                          </h2>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 pt-4">
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                        {article.desc}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {article.tags.map(t => (
                            <span key={t} className="px-2.5 py-0.5 text-[11px] rounded-lg bg-slate-100/80 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 font-medium">
                              #{t}
                            </span>
                          ))}
                        </div>
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
                          Read article <ArrowUpRight size={12} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </FadeIn>
            ))}

            {/* Remaining articles — compact grid */}
            {filtered.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {filtered.slice(1).map((article, i) => (
                  <FadeIn key={article.url} delay={0.1 + i * 0.05}>
                    <a href={article.url} target="_blank" rel="noreferrer" className="block group h-full">
                      <motion.div
                        className="h-full rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/[0.08] bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm flex flex-col"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.25 }}
                      >
                        {/* Cover */}
                        {article.cover ? (
                          <div className="aspect-[16/9] overflow-hidden">
                            <img src={article.cover} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          </div>
                        ) : (
                          <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-50 dark:from-white/[0.03] dark:to-white/[0.01] flex items-center justify-center">
                            <BookOpen size={24} className="text-slate-300 dark:text-slate-700" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${article.platform === 'medium' ? 'bg-slate-900 dark:bg-white' : 'bg-blue-500'
                              }`} />
                            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium">
                              {article.platform === 'medium' ? 'Medium' : 'Hashnode'}
                            </span>
                            <span className="text-slate-300 dark:text-slate-600 text-[11px]">·</span>
                            <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                              {formatDate(article.date)}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5 leading-snug line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors flex-1">
                            {article.title}
                          </h3>
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-white/[0.04]">
                            <div className="flex gap-1.5">
                              {article.tags.slice(0, 2).map(t => (
                                <span key={t} className="px-2 py-0.5 text-[10px] rounded-md bg-slate-100/80 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400 font-medium">
                                  #{t}
                                </span>
                              ))}
                            </div>
                            {article.readTime && (
                              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                                {article.readTime} min
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </a>
                  </FadeIn>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
