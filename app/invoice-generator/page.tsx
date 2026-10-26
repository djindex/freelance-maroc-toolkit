'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { InvoiceGenerator } from '@/components/InvoiceGenerator';
import { useApp } from '@/context/AppContext';
import { ChevronRight, ArrowLeft, ArrowRight, ArrowRightLeft, Sparkles } from 'lucide-react';

function InvoiceContent() {
  const { language } = useApp();
  const searchParams = useSearchParams();
  const isAr = language === 'ar';
  
  const rawTjm = searchParams.get('tjm');
  const incomingTjmRate = rawTjm ? Number(rawTjm) : null;

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="no-print flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400 mb-6">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            {isAr ? 'الرئيسية' : 'Accueil'}
          </Link>
          <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
          <span className="text-slate-900 dark:text-white font-bold">
            {isAr ? 'مولد الفواتير الرسمي للمقاول الذاتي' : 'Générateur de Facture Auto-Entrepreneur'}
          </span>
        </div>

        {/* Incoming TJM notice banner if passed from calculator */}
        {incomingTjmRate && (
          <div className="no-print mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-emerald-950 dark:text-emerald-300 font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                {isAr 
                  ? `تم استيراد تسعيرة TJM المحسوبة (${incomingTjmRate.toLocaleString()} درهم/يوم) وتطبيقها تلقائياً في السطر الأول!` 
                  : `Le tarif TJM calculé (${incomingTjmRate.toLocaleString()} MAD/j) a été automatiquement appliqué sur la première ligne !`}
              </span>
            </div>
          </div>
        )}

        {/* The Generator Tool */}
        <InvoiceGenerator
          language={language}
          incomingTjmRate={incomingTjmRate}
        />

        {/* Related Next Tool */}
        <div className="no-print mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'كاتستقبل فلوسك بالدولار أو اليورو من الخارج؟' : 'Vous encaissez des devises depuis l\'étranger ?'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-xl">
              {isAr
                ? 'قارن بين التحويل البنكي العادي (SWIFT) ومنصة Wise وPayoneer واعرف شحال كايوصلك بالدرهم بالضبط فالبنك ديالك.'
                : 'Comparez le virement SWIFT classique vs Wise et Payoneer pour maximiser vos gains en MAD sur votre compte.'}
            </p>
          </div>

          <Link
            href="/remittance-comparator"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            <ArrowRightLeft className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{isAr ? 'مقارن التحويلات البنكية' : 'Comparateur de Devises'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function InvoiceGeneratorPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm font-bold text-slate-400">Loading...</div>}>
      <InvoiceContent />
    </Suspense>
  );
}
