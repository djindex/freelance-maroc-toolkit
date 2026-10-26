'use client';

import React from 'react';
import { 
  Calculator, 
  FileText, 
  ArrowRightLeft, 
  ShieldAlert, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles, 
  Lock,
  Zap,
  ArrowDown
} from 'lucide-react';

interface HeroProps {
  language: 'ar' | 'fr';
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onNavigate }) => {
  const isAr = language === 'ar';

  const quickJumpTabs = [
    { id: 'tjm-calculator', labelAr: 'حاسبة TJM وسعر الساعة', labelFr: 'Calculateur TJM & Heure', icon: Calculator, highlight: true },
    { id: 'invoice-generator', labelAr: 'مولد الفواتير الرسمي', labelFr: 'Facture Auto-Entrepreneur', icon: FileText },
    { id: 'remittance-comparator', labelAr: 'حاسبة التحويلات البنكية', labelFr: 'Comparateur SWIFT & Wise', icon: ArrowRightLeft },
    { id: 'client-quiz', labelAr: 'مؤشر الزبون المقلق', labelFr: 'Quiz Red Flags Client', icon: ShieldAlert },
    { id: 'market-benchmark', labelAr: 'دليل الأسعار 2025', labelFr: 'Grille Tarifaire Marché', icon: TrendingUp },
  ];

  return (
    <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Background radial gradient decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Moroccan Law & Community Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/70 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-xs hover:scale-105 transition-transform cursor-default mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>
            {isAr 
              ? 'الأدوات رقم 1 للفريلانسر والمقاول الذاتي فالمغرب 🇲🇦' 
              : 'La boîte à outils n°1 des Auto-Entrepreneurs au Maroc 🇲🇦'}
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-zinc-700">|</span>
          <span className="hidden sm:inline text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            {isAr ? 'محدّث لعام 2025' : 'Mis à jour 2025'}
          </span>
        </div>

        {/* Main Bold Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.18] max-w-4xl mx-auto">
          {isAr ? (
            <>
              احسب، فوتر، وحمي خدمتك{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
                بأعلى معايير الاحترافية.
              </span>
            </>
          ) : (
            <>
              Calculez, facturez et protégez vos missions{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">
                en toute sérénité.
              </span>
            </>
          )}
        </h1>

        {/* Subtitle / Value Proposition */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
          {isAr ? (
            <>
              المنصة الشاملة والمجانية للمستقلين والمقاولين الذاتيين في المغرب: تحديد السعر اليومي الحقيقي (<span className="font-bold text-slate-900 dark:text-white">TJM</span>)، توليد فواتير قانونية معفية من الضريبة (<span className="font-semibold text-emerald-600 dark:text-emerald-400">Art. 89 CGI</span>)، مقارنة عمولات البنوك، وكشف الزبائن المقلقين قبل فوات الأوان.
            </>
          ) : (
            <>
              Le command center financier et juridique des freelances marocains : calculez votre vrai TJM rentable, éditez vos factures légales conformes DGI (exonérées de TVA), comparez vos réceptions SWIFT et évitez les clients toxiques.
            </>
          )}
        </p>

        {/* Quick Navigation Pill Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-4xl mx-auto">
          {quickJumpTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onNavigate(tab.id)}
                className={`group flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold border transition-all duration-200 cursor-pointer ${
                  tab.highlight 
                    ? 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 border-slate-900 dark:border-emerald-400 shadow-md shadow-slate-900/10 hover:scale-105' 
                    : 'bg-white dark:bg-zinc-900/90 text-slate-700 dark:text-zinc-200 border-slate-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-zinc-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${tab.highlight ? 'text-emerald-400 dark:text-slate-950' : 'text-emerald-600 dark:text-emerald-400'} group-hover:scale-110 transition-transform`} />
                <span>{isAr ? tab.labelAr : tab.labelFr}</span>
              </button>
            );
          })}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left sm:text-center">
          
          <div className="flex items-center gap-2.5 justify-center">
            <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-right sm:text-center">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'قانوني 100%' : '100% Conforme'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                {isAr ? 'مادة 89 مدونة الضرائب' : 'Art. 89 CGI (Exonéré TVA)'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 justify-center">
            <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Lock className="w-4 h-4" />
            </div>
            <div className="text-right sm:text-center">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'خصوصية تامة' : 'Données Privées'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                {isAr ? 'كل الحسابات في جهازك' : '100% Client-Side'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 justify-center">
            <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-right sm:text-center">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'حساب فوري' : 'Calcul Instantané'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                {isAr ? 'تحديث لحظي لكل تغيير' : 'Temps réel réactif'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 justify-center">
            <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-right sm:text-center">
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {isAr ? 'مجاني بالكامل' : '100% Gratuit'}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                {isAr ? 'بدون اشتراك أو بطاقة' : 'Sans carte bancaire'}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
