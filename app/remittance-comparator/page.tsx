'use client';

import React from 'react';
import Link from 'next/link';
import { RemittanceComparator } from '@/components/RemittanceComparator';
import { useApp } from '@/context/AppContext';
import { ChevronRight, ArrowLeft, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

export default function RemittanceComparatorPage() {
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
            {isAr ? 'حاسبة التحويلات البنكية والعملات' : 'Comparateur de Virements Internationaux'}
          </span>
        </div>

        {/* The Tool */}
        <RemittanceComparator
          language={language}
        />

        {/* Next Tool Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'شاك فـ زبون جديد وباغي تفحص علامات الخطر؟' : 'Un nouveau prospect semble douteux ?'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-xl">
              {isAr
                ? 'جرب كويز الزبون المقلق (Red Flags) واعرف واش تكمل معاه ولا تهرب قبل ما تضيع وقتك وفلوسك.'
                : 'Passez le Quiz Red Flags Client pour détecter les signaux toxiques et obtenir des scripts de cadrage.'}
            </p>
          </div>

          <Link
            href="/client-quiz"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>{isAr ? 'كويز الزبون المقلق' : 'Quiz Red Flags'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

      </div>
    </div>
  );
}
