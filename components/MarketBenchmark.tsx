'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Briefcase, 
  Globe2, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  Lightbulb, 
  ArrowUpRight 
} from 'lucide-react';
import { MARKET_BENCHMARKS } from '@/lib/data';
import { MarketBenchmarkItem } from '@/types';

interface MarketBenchmarkProps {
  language: 'ar' | 'fr';
  onSelectRoleForTjm?: (tjmRate: number) => void;
}

export const MarketBenchmark: React.FC<MarketBenchmarkProps> = ({
  language,
  onSelectRoleForTjm
}) => {
  const isAr = language === 'ar';

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'All', labelAr: 'جميع التخصصات', labelFr: 'Tous les métiers' },
    { id: 'Development', labelAr: 'البرمجة والتطوير', labelFr: 'Développement Web & Mobile' },
    { id: 'Design', labelAr: 'التصميم وتجربة المستخدم', labelFr: 'Design UI/UX & Produit' },
    { id: 'Marketing', labelAr: 'التسويق والإعلانات', labelFr: 'Marketing & Media Buying' },
    { id: 'Media', labelAr: 'الفيديو وصناعة المحتوى', labelFr: 'Vidéo & Motion Graphics' },
    { id: 'Writing', labelAr: 'الكتابة والسيو', labelFr: 'Copywriting & SEO' },
  ];

  const filteredItems = MARKET_BENCHMARKS.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = 
      item.roleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roleFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inDemandSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="market-benchmark" className="py-12 sm:py-16 border-t border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'دليل أسعار الفريلانس فالمغرب 2025' : 'Grille Tarifaire du Freelancing au Maroc'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isAr ? 'مؤشر الأسعار ومتوسط أجور اليوم (TJM)' : 'Combien facturer selon votre niveau d\'expérience ?'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            {isAr
              ? 'بيانات واقعية مبنية على مئات المشاريع في السوق المغربي والعمل عن بُعد مع فرنسا والخليج.'
              : 'Données basées sur les retours réels du marché marocain et des missions remote avec l\'Europe et le Golfe.'}
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelFr}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isAr ? 'بحث عن تخصص أو مهارة...' : 'Rechercher un rôle, compétence...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Role Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      {item.category}
                    </span>
                    <h3 className="text-base font-black text-slate-900 dark:text-white mt-2">
                      {isAr ? item.roleAr : item.roleFr}
                    </h3>
                  </div>
                </div>

                {/* TJM Rates Tiers */}
                <div className="mt-5 space-y-2.5">
                  
                  {/* Junior */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/70 dark:border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-zinc-300">
                        {isAr ? 'مبتدئ (0 - 2 سنوات)' : 'Junior (0-2 ans)'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black font-mono text-slate-900 dark:text-white">
                        {item.juniorTjm.toLocaleString()} MAD/j
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        (~{item.juniorHourly} MAD/h)
                      </span>
                    </div>
                  </div>

                  {/* Mid-Level */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300">
                        {isAr ? 'متوسط (2 - 5 سنوات)' : 'Intermédiaire (2-5 ans)'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black font-mono text-emerald-700 dark:text-emerald-400">
                        {item.midTjm.toLocaleString()} MAD/j
                      </span>
                      <span className="text-[10px] text-emerald-600/80 dark:text-emerald-400/80 block">
                        (~{item.midHourly} MAD/h)
                      </span>
                    </div>
                  </div>

                  {/* Senior */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/70 dark:border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="text-xs font-semibold text-slate-600 dark:text-zinc-300">
                        {isAr ? 'خبير ومحترف (5+ سنوات)' : 'Senior (5+ ans)'}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black font-mono text-purple-600 dark:text-purple-400">
                        {item.seniorTjm.toLocaleString()} MAD/j
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        (~{item.seniorHourly} MAD/h)
                      </span>
                    </div>
                  </div>

                </div>

                {/* Skills tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.inDemandSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Cultural Tip */}
                <p className="mt-4 text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed border-t border-slate-150 dark:border-zinc-800 pt-3">
                  💡 <strong className="text-slate-700 dark:text-zinc-300">{isAr ? 'نصيحة السوق:' : 'Conseil :'}</strong> {isAr ? item.tipsAr : item.tipsFr}
                </p>

              </div>

              {/* Remote Arbitrage Footer */}
              <div className="mt-5 pt-3 border-t border-slate-150 dark:border-zinc-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-blue-500" />
                  {isAr ? 'مضاعف العمل مع الخارج:' : 'Multiplicateur Remote :'}
                </span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                  x{item.remoteEurMultiplier} (~{Math.round(item.midTjm * item.remoteEurMultiplier / 10.8)} €/j)
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Pricing Strategy Guide Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-zinc-900 text-white border border-slate-800 shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-500/30">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{isAr ? 'قاعدة ذهبية في التسعير' : 'Règle d\'Or de la Tarification'}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black">
                {isAr
                  ? 'كيف تسعّر للشركات المغربية مقابل الزبائن الأجانب؟'
                  : 'Comment tarifer pour les PME locales vs les clients internationaux ?'}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAr
                  ? 'الشركات المغربية الصغيرة والمتوسطة غالباً تفضل تسعيرة المشروع الثابتة (Au Forfait) مع تفصيل دقيق للمراحل (Milestones). بينما الشركات الناشئة في فرنسا وأمريكا تفضل نظام TJM اليومي أو الساعي (Régie). لا تتردد في مضاعفة سعرك بنسبة 60% إلى 100% مع الزبناء في أوروبا والخليج لأن تكلفة البديل لديهم محلياً أعلى بثلاث مرات!'
                  : 'Les PME marocaines privilégient les forfaits fixes avec jalons de paiement précis (acompte 40% / livraison 60%). Les startups européennes préfèrent la régie au TJM. Multipliez votre tarif par 1.6 à 2.0 pour vos clients étrangers : vous restez très compétitif tout en augmentant fortement vos marges.'}
              </p>
            </div>
            
            <a
              href="#tjm-calculator"
              className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm transition-all"
            >
              <span>{isAr ? 'احسب TJM الخاص بك الآن' : 'Calculer mon TJM personnalisé'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
