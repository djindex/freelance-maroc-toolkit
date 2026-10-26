'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShieldCheck, ArrowUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Footer: React.FC = () => {
  const { language } = useApp();
  const isAr = language === 'ar';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toolLinks = [
    { href: '/tjm-calculator', labelAr: 'حاسبة سعر اليوم والساعة (TJM)', labelFr: 'Calculateur TJM Journalier' },
    { href: '/invoice-generator', labelAr: 'مولد الفواتير الرسمي (DGI)', labelFr: 'Facture Légale Auto-Entrepreneur' },
    { href: '/remittance-comparator', labelAr: 'مقارن التحويلات الدولية (Wise / SWIFT)', labelFr: 'Comparateur de Virements Devises' },
    { href: '/client-quiz', labelAr: 'مؤشر الزبون المقلق (Red Flags)', labelFr: 'Quiz Red Flags Client' },
    { href: '/market-benchmark', labelAr: 'دليل أسعار الفريلانس 2025', labelFr: 'Grille Tarifaire Marché 2025' },
    { href: '/directory', labelAr: 'دليل البنوك وفضاءات العمل والموارد', labelFr: 'Annuaire Coworking & Outils' },
  ];

  return (
    <footer className="no-print bg-white dark:bg-[#09090B] border-t border-slate-200 dark:border-zinc-800 pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200 dark:border-zinc-800">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                🇲🇦
              </div>
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                FreelanceMaroc <span className="text-emerald-600 dark:text-emerald-400">Toolkit</span>
              </span>
            </Link>
            
            <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed max-w-md">
              {isAr
                ? 'محراب الفريلانسر والمقاول الذاتي المغربي: منصة أدوات مجانية شاملة لتسعير الخدمات بدقة، إصدار فواتير قانونية معفية من TVA، مقارنة أرباح التحويلات الدولية، واكتشاف الزبائن المقلقين.'
                : 'Le portail financier et juridique des indépendants et Auto-Entrepreneurs au Maroc : calcul de TJM, génération de factures conformes DGI, comparateur de devises et détection de red flags clients.'}
            </p>

            <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'مستقل ومجاني 100% لخدمة المجتمع الرقمي المغربي' : '100% Indépendant et gratuit au service des freelances'}</span>
            </div>
          </div>

          {/* Quick Links to Each Dedicated Page */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {isAr ? 'الأدوات والحاسبات المستقلة' : 'Outils & Simulateurs'}
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-zinc-400 font-medium">
              {toolLinks.map((tl) => (
                <li key={tl.href}>
                  <Link href={tl.href} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                    {isAr ? tl.labelAr : tl.labelFr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Moroccan Notice */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              {isAr ? 'تنويه قانوني وضريبي' : 'Mentions Légales & Fiscalité'}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed">
              {isAr
                ? 'الحسابات والمعلومات المقدمة في هذه المنصة استرشادية ولا تشكل استشارة ضريبية رسمية. يُرجى مراجعة المديرية العامة للضرائب (DGI) أو محاسب معتمد للقرارات الرسمية المعقدة.'
                : 'Les simulateurs et modèles sont fournis à titre informatif et ne se substituent pas aux avis officiels de la Direction Générale des Impôts (DGI) ou d\'un expert-comptable.'}
            </p>
            <div className="mt-4">
              <button
                type="button"
                onClick={scrollToTop}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>{isAr ? 'الرجوع للأعلى' : 'Retour en haut'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span>© 2025 FreelanceMaroc Toolkit. صُنع بفخر من أجل الفريلانسرز في المغرب 🇲🇦</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>محدث وفقاً لقانون المالية المغربي</span>
            <span>•</span>
            <span>Art. 89 CGI</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
