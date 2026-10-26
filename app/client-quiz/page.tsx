'use client';

import React from 'react';
import Link from 'next/link';
import { ClientRedFlagsQuiz } from '@/components/ClientRedFlagsQuiz';
import { useApp } from '@/context/AppContext';
import { ChevronRight, ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react';

export default function ClientQuizPage() {
  const { language } = useApp();
  const isAr = language === 'ar';

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-6">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {isAr ? 'الرئيسية' : 'Accueil'}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
          <span className="text-slate-900 dark:text-white font-bold">
            {isAr ? 'كويز الزبون المقلق (Red Flags)' : 'Quiz Red Flags Client'}
          </span>
        </div>

        {/* The Tool */}
        <ClientRedFlagsQuiz
          language={language}
        />

        {/* Next Tool Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'باغي تعرف شحال كايتخلصو الفريلانسرز فالمغرب؟' : 'Envie de comparer vos tarifs avec le marché ?'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-xl">
              {isAr
                ? 'استكشف دليل أسعار السوق 2025 لمهن البرمجة، التصميم، الفيديو، والإعلانات مع أسعار Junior وMid وSenior.'
                : 'Consultez la grille tarifaire 2025 pour le dev, design, vidéo et marketing par niveau d\'expérience.'}
            </p>
          </div>

          <Link
            href="/market-benchmark"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            <TrendingUp className="w-4 h-4" />
            <span>{isAr ? 'دليل أسعار السوق 2025' : 'Grille Tarifaire Marché'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

      </div>
    </div>
  );
}
