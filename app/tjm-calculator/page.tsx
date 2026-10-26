'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TjmCalculator } from '@/components/TjmCalculator';
import { useApp } from '@/context/AppContext';
import { ChevronRight, ArrowLeft, ArrowRight, FileText, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';

export default function TjmCalculatorPage() {
  const { language } = useApp();
  const isAr = language === 'ar';
  const router = useRouter();

  const handleApplyToInvoice = (tjmRate: number) => {
    router.push(`/invoice-generator?tjm=${tjmRate}`);
  };

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
            {isAr ? 'حاسبة TJM وسعر الساعة' : 'Calculateur TJM & Taux Horaire'}
          </span>
        </div>

        {/* The Tool */}
        <TjmCalculator
          language={language}
          onApplyToInvoice={handleApplyToInvoice}
        />

        {/* Next Step Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'الخطوة الموالية' : 'Étape suivante'}</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'لقيتي التسعيرة المناسبة؟ فوتر زبونك دابا' : 'Tarif calculé ? Passez à la facturation'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1 max-w-xl">
              {isAr
                ? 'استعمل مولّد الفواتير الرسمي لإنشاء فاتورة قانونية بمعايير المقاول الذاتي وإعفاء TVA (المادة 89) وتحميلها فوراً كـ PDF.'
                : 'Utilisez notre générateur officiel pour éditer votre facture avec les mentions légales obligatoires (Art. 89 CGI) en 1 clic.'}
            </p>
          </div>

          <Link
            href="/invoice-generator"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>{isAr ? 'الانتقال إلى مولد الفواتير' : 'Ouvrir le Générateur de Facture'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

      </div>
    </div>
  );
}
