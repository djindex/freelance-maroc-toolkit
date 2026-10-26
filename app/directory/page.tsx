'use client';

import React from 'react';
import Link from 'next/link';
import { LeadMagnetsAndDirectory } from '@/components/LeadMagnetsAndDirectory';
import { useApp } from '@/context/AppContext';
import { ChevronRight, ArrowLeft, ArrowRight, Calculator } from 'lucide-react';

export default function DirectoryPage() {
  const { language, isResourceModalOpen, setIsResourceModalOpen } = useApp();
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
            {isAr ? 'دليل البنوك وفضاءات العمل والموارد' : 'Annuaire Coworkings, Banques & Ressources'}
          </span>
        </div>

        {/* The Directory Tool */}
        <LeadMagnetsAndDirectory
          language={language}
          isModalOpen={isResourceModalOpen}
          setIsModalOpen={setIsResourceModalOpen}
          onlyModal={false}
        />

        {/* Back to Home CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-black">
              {isAr ? 'مستعد لحساب تسعيرة مشاريعك القادمة؟' : 'Prêt à calculer vos tarifs de mission ?'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {isAr
                ? 'استعمل حاسبة TJM المتقدمة لتحديد سعر اليوم وسعر الساعة مع هامش الأمان والضرائب الرسمية.'
                : 'Déterminez votre TJM optimal en intégrant toutes vos charges réelles et congés payés.'}
            </p>
          </div>

          <Link
            href="/tjm-calculator"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition-all whitespace-nowrap cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>{isAr ? 'فتح حاسبة TJM' : 'Calculer mon TJM'}</span>
            {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>

      </div>
    </div>
  );
}
