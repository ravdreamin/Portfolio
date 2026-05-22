import React from 'react';

export const Footer = () => (
  <footer className="pb-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center border-t border-slate-200/50 dark:border-white/10 pt-8">
      <p className="text-sm text-slate-400 dark:text-slate-600">
        © {new Date().getFullYear()} Gaurav · Built with React
      </p>
    </div>
  </footer>
);
