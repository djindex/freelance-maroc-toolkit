'use client';

import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  Check, 
  Copy, 
  ArrowRight, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  DollarSign, 
  Sparkles,
  Info
} from 'lucide-react';
import { TjmInputs, TjmCalculationResult } from '@/types';

interface TjmCalculatorProps {
  language: 'ar' | 'fr';
  onApplyToInvoice?: (tjmRate: number, hourlyRate: number) => void;
}

export const TjmCalculator: React.FC<TjmCalculatorProps> = ({
  language,
  onApplyToInvoice
}) => {
  const isAr = language === 'ar';

  // Calculator State with realistic Moroccan freelancer defaults
  const [inputs, setInputs] = useState<TjmInputs>({
    desiredNetMonthly: 20000, // 20,000 MAD / month
    monthlyOverhead: {
      coworking: 1200, // Co-working or home-office share
      internet: 400,   // Maroc Telecom / Orange Fiber 100 Mbps
      software: 800,   // Figma, Adobe CC, ChatGPT Plus, Claude, GitHub
      equipment: 600,  // Laptop / hardware amortisation
      other: 500       // Transport, client coffee meetings
    },
    vacationWeeks: 4,  // 4 weeks holiday
    bankHolidays: 10,  // Moroccan national / religious bank holidays
    billableHoursPercent: 50, // 50% realistic billable ratio (meetings, admin, prospecting)
    taxTier: 'services', // 1% for services
    cnssMonthly: 150,  // Flat AMO contribution
    safetyBufferPercent: 15 // 15% safety buffer for late invoices & sick days
  });

  const [copied, setCopied] = useState(false);
  const [appliedNotice, setAppliedNotice] = useState(false);
  const [showOverheadBreakdown, setShowOverheadBreakdown] = useState(false);

  // Total monthly overhead
  const totalMonthlyOverhead = useMemo(() => {
    const o = inputs.monthlyOverhead;
    return o.coworking + o.internet + o.software + o.equipment + o.other;
  }, [inputs.monthlyOverhead]);

  // Financial Calculations Engine
  const calculation = useMemo<TjmCalculationResult>(() => {
    const workingWeeks = Math.max(1, 52 - inputs.vacationWeeks);
    const totalPotentialDays = Math.max(10, workingWeeks * 5 - inputs.bankHolidays);
    const standardHoursPerYear = totalPotentialDays * 7; // 7 productive hours/day standard in Morocco
    
    // Billable time
    const billableRatio = inputs.billableHoursPercent / 100;
    const billableHours = Math.max(10, Math.round(standardHoursPerYear * billableRatio));
    const billableDays = Math.max(1, Math.round(billableHours / 7));

    // Annual Needs
    const annualNet = inputs.desiredNetMonthly * 12;
    const annualOverheads = totalMonthlyOverhead * 12;
    const annualCnss = inputs.cnssMonthly * 12;

    const totalCashNeeded = annualNet + annualOverheads + annualCnss;

    // Tax calculation (Auto-Entrepreneur: 1% for services, 0.5% for commerce)
    const taxRate = inputs.taxTier === 'services' ? 0.01 : 0.005;
    
    // Base turnover needed before safety buffer
    const breakevenAnnualGross = totalCashNeeded / (1 - taxRate);
    const annualTax = breakevenAnnualGross * taxRate;

    // With safety buffer (15%)
    const safetyMultiplier = 1 + (inputs.safetyBufferPercent / 100);
    const recommendedAnnualGross = breakevenAnnualGross * safetyMultiplier;

    // Rates
    const breakevenHourly = Math.round(breakevenAnnualGross / billableHours);
    const recommendedHourly = Math.round(recommendedAnnualGross / billableHours);
    
    const breakevenDaily = Math.round(breakevenHourly * 7);
    const recommendedDaily = Math.round(recommendedHourly * 7);

    // Ceiling Check (Moroccan AE Limit: 200,000 MAD for services, 500,000 MAD for commercial)
    const ceilingLimit = inputs.taxTier === 'services' ? 200000 : 500000;
    const isCeilingWarning = recommendedAnnualGross > ceilingLimit;

    // Currency conversions
    const eurDailyEquivalent = Math.round(recommendedDaily / 10.8);
    const usdDailyEquivalent = Math.round(recommendedDaily / 10.05);

    return {
      annualNetDesired: annualNet,
      annualOverheads,
      annualCnss,
      workingWeeksPerYear: workingWeeks,
      workingDaysPerYear: totalPotentialDays,
      billableHoursPerYear: billableHours,
      billableDaysPerYear: billableDays,
      breakevenHourly,
      recommendedHourly,
      breakevenDaily,
      recommendedDaily,
      annualGrossTurnover: Math.round(recommendedAnnualGross),
      annualTax: Math.round(annualTax),
      isCeilingWarning,
      ceilingLimit,
      eurDailyEquivalent,
      usdDailyEquivalent
    };
  }, [inputs, totalMonthlyOverhead]);

  // Breakdown percentages for the visual bar
  const breakdownData = useMemo(() => {
    const total = calculation.annualGrossTurnover || 1;
    const netPct = Math.round((calculation.annualNetDesired / total) * 100);
    const overheadPct = Math.round((calculation.annualOverheads / total) * 100);
    const taxCnssPct = Math.round(((calculation.annualTax + calculation.annualCnss) / total) * 100);
    const bufferPct = Math.max(0, 100 - (netPct + overheadPct + taxCnssPct));

    return { netPct, overheadPct, taxCnssPct, bufferPct };
  }, [calculation]);

  const handleCopySummary = () => {
    const text = isAr
      ? `🇲🇦 ملخص حساب تسعيرة الفريلانسر (FreelanceMaroc Toolkit):
• الدخل الصافي المستهدف: ${inputs.desiredNetMonthly.toLocaleString()} درهم/شهر
• سعر اليوم الموصى به (TJM): ${calculation.recommendedDaily.toLocaleString()} درهم (${calculation.eurDailyEquivalent} € / ${calculation.usdDailyEquivalent} $)
• سعر الساعة الموصى به: ${calculation.recommendedHourly.toLocaleString()} درهم/ساعة
• سعر التعادل الأدنى (Breakeven): ${calculation.breakevenDaily.toLocaleString()} درهم/يوم
• الأيام المفوترة سنوياً: ${calculation.billableDaysPerYear} يوم (${inputs.billableHoursPercent}% نسبة فوترة)
• رقم المعاملات السنوي المتوقع: ${calculation.annualGrossTurnover.toLocaleString()} درهم (سقف المقاول: ${calculation.ceilingLimit.toLocaleString()} درهم)
تم الحساب عبر FreelanceMaroc Toolkit.`
      : `🇲🇦 Synthèse TJM Freelance Maroc (FreelanceMaroc Toolkit) :
• Revenu net mensuel ciblé : ${inputs.desiredNetMonthly.toLocaleString()} MAD/mois
• TJM Journalier recommandé : ${calculation.recommendedDaily.toLocaleString()} MAD/j (~${calculation.eurDailyEquivalent} € / ${calculation.usdDailyEquivalent} $)
• Taux horaire recommandé : ${calculation.recommendedHourly.toLocaleString()} MAD/h
• Seuil de rentabilité minimum : ${calculation.breakevenDaily.toLocaleString()} MAD/j
• Jours facturables par an : ${calculation.billableDaysPerYear} jours (ratio ${inputs.billableHoursPercent}%)
• C.A Annuel prévisionnel : ${calculation.annualGrossTurnover.toLocaleString()} MAD (Plafond AE : ${calculation.ceilingLimit.toLocaleString()} MAD)
Calculé sur FreelanceMaroc Toolkit.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleApplyToInvoice = () => {
    if (onApplyToInvoice) {
      onApplyToInvoice(calculation.recommendedDaily, calculation.recommendedHourly);
      setAppliedNotice(true);
      setTimeout(() => setAppliedNotice(false), 3000);
    }
  };

  return (
    <section id="tjm-calculator" className="py-12 sm:py-16 border-t border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'حاسبة TJM المتقدمة' : 'Calculateur Avancé de TJM & Taux Horaire'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isAr ? 'ما تخدمش بالخسارة: احسب سعرك الحقيقي بدقة' : 'Ne bradez plus votre travail : Calculez votre vrai TJM'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            {isAr
              ? 'تأخذ في الاعتبار المصاريف الثابتة، العطل الوطنية، الوقت الضائع في الاجتماعات والبحث عن الزبائن، والضرائب الرسمية للمقاول الذاتي.'
              : 'Prenez en compte vos charges réelles, vos congés, le temps non facturé (prospection, devis) et les cotisations AE marocaines.'}
          </p>
        </div>

        {/* Main Grid: Inputs (Left) and Dynamic Outputs (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= INPUTS CARD (7 Cols) ================= */}
          <div className="lg:col-span-7 bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                {isAr ? 'معطياتك المالية والمهنية' : 'Vos Paramètres Financiers & d\'Activité'}
              </span>
              <span className="text-xs font-normal text-slate-500 dark:text-zinc-400">
                {isAr ? 'بالدرهم المغربي (MAD)' : 'En Dirhams Marocains (MAD)'}
              </span>
            </h3>

            <div className="mt-6 space-y-6">
              
              {/* 1. Desired Net Monthly Income */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-1.5">
                    {isAr ? 'الراتب الصافي الشهري المرغوب' : 'Revenu net mensuel souhaité'}
                    <span className="text-slate-400 text-xs">({isAr ? 'في جيبك' : 'dans votre poche'})</span>
                  </label>
                  <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                    {inputs.desiredNetMonthly.toLocaleString()} <span className="text-xs font-bold">MAD</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="80000"
                  step="1000"
                  value={inputs.desiredNetMonthly}
                  onChange={(e) => setInputs({ ...inputs, desiredNetMonthly: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[11px] text-slate-600 dark:text-zinc-400 mt-1 font-medium">
                  <span>5,000 MAD</span>
                  <span>25,000 MAD (متوسط)</span>
                  <span>50,000 MAD</span>
                  <span>80,000 MAD</span>
                </div>
              </div>

              {/* 2. Monthly Fixed Overheads */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-200">
                      {isAr ? 'المصاريف التشغيلية الشهرية' : 'Charges fixes mensuelles pro'}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                      {isAr ? 'كراء فضاء العمل، الفايبر، اشتراكات البرامج، استهلاك الحاسوب' : 'Coworking, fibre, abonnements IA/design, amortissement matériel'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                      {totalMonthlyOverhead.toLocaleString()} <span className="text-xs font-medium text-slate-500">MAD/m</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowOverheadBreakdown(!showOverheadBreakdown)}
                      className="block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                    >
                      {showOverheadBreakdown 
                        ? (isAr ? 'إخفاء التفاصيل' : 'Masquer le détail') 
                        : (isAr ? 'تعديل التفاصيل ⚙️' : 'Personnaliser ⚙️')}
                    </button>
                  </div>
                </div>

                {/* Sub-inputs if toggled */}
                {showOverheadBreakdown && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="text-slate-600 dark:text-zinc-400">
                        {isAr ? 'فضاء العمل / كراء (Coworking)' : 'Espace de coworking / Bureau'}
                      </label>
                      <input
                        type="number"
                        value={inputs.monthlyOverhead.coworking}
                        onChange={(e) => setInputs({
                          ...inputs,
                          monthlyOverhead: { ...inputs.monthlyOverhead, coworking: Number(e.target.value) || 0 }
                        })}
                        className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 dark:text-zinc-400">
                        {isAr ? 'إنترنت فايبر (Fibre 100/200M)' : 'Internet Fibre Optique'}
                      </label>
                      <input
                        type="number"
                        value={inputs.monthlyOverhead.internet}
                        onChange={(e) => setInputs({
                          ...inputs,
                          monthlyOverhead: { ...inputs.monthlyOverhead, internet: Number(e.target.value) || 0 }
                        })}
                        className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 dark:text-zinc-400">
                        {isAr ? 'اشتراكات برامج وذكاء اصطناعي (Figma, AI)' : 'Abonnements (Figma, Adobe, Claude)'}
                      </label>
                      <input
                        type="number"
                        value={inputs.monthlyOverhead.software}
                        onChange={(e) => setInputs({
                          ...inputs,
                          monthlyOverhead: { ...inputs.monthlyOverhead, software: Number(e.target.value) || 0 }
                        })}
                        className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-600 dark:text-zinc-400">
                        {isAr ? 'استهلاك المعدات (MacBook, Écran)' : 'Amortissement PC & Matériel'}
                      </label>
                      <input
                        type="number"
                        value={inputs.monthlyOverhead.equipment}
                        onChange={(e) => setInputs({
                          ...inputs,
                          monthlyOverhead: { ...inputs.monthlyOverhead, equipment: Number(e.target.value) || 0 }
                        })}
                        className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Billable Hours Slider & Work Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Billable Ratio */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      {isAr ? 'نسبة الساعات المفوترة' : 'Taux d\'heures facturables'}
                    </label>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {inputs.billableHoursPercent}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="75"
                    step="5"
                    value={inputs.billableHoursPercent}
                    onChange={(e) => setInputs({ ...inputs, billableHoursPercent: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-[10px] text-slate-600 dark:text-zinc-400 block mt-1">
                    {isAr ? 'الباقي (50%) يضيع في التواصل، العروض، والفوترة' : '50% recommandé (prospection, devis, réunions)'}
                  </span>
                </div>

                {/* Vacations */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                      {isAr ? 'أسابيع العطلة السنوية' : 'Semaines de congés / an'}
                    </label>
                    <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                      {inputs.vacationWeeks} {isAr ? 'أسابيع' : 'semaines'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    step="1"
                    value={inputs.vacationWeeks}
                    onChange={(e) => setInputs({ ...inputs, vacationWeeks: Number(e.target.value) })}
                    className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                  <span className="text-[10px] text-slate-600 dark:text-zinc-400 block mt-1">
                    {isAr ? '+ 10 أيام عطل وطنية ودينية في المغرب' : '+ 10 jours fériés marocains inclus'}
                  </span>
                </div>

              </div>

              {/* 4. Tax Regime & CNSS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Tax Tier */}
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block mb-1.5">
                    {isAr ? 'نوع نشاط المقاول الذاتي' : 'Activité Auto-Entrepreneur'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setInputs({ ...inputs, taxTier: 'services' })}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        inputs.taxTier === 'services'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400'
                      }`}
                    >
                      <div>{isAr ? 'خدمات (Services)' : 'Services'}</div>
                      <div className="text-[10px] font-normal text-slate-500 dark:text-zinc-400">ضريبة 1% IR</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setInputs({ ...inputs, taxTier: 'commercial' })}
                      className={`p-2 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        inputs.taxTier === 'commercial'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300'
                          : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400'
                      }`}
                    >
                      <div>{isAr ? 'تجاري / صناعي' : 'Commerce'}</div>
                      <div className="text-[10px] font-normal text-slate-500 dark:text-zinc-400">ضريبة 0.5% IR</div>
                    </button>
                  </div>
                </div>

                {/* CNSS AMO contribution */}
                <div>
                  <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block mb-1.5">
                    {isAr ? 'المساهمة الشهرية للضمان (CNSS)' : 'Cotisation AMO / CNSS'}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={inputs.cnssMonthly}
                      onChange={(e) => setInputs({ ...inputs, cnssMonthly: Number(e.target.value) || 0 })}
                      className="w-full p-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-bold text-slate-900 dark:text-white"
                    />
                    <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 whitespace-nowrap">
                      MAD / {isAr ? 'شهر' : 'mois'}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-600 dark:text-zinc-400 block mt-1">
                    {isAr ? 'المتوسط للمقاول الذاتي: ~100 إلى 200 درهم' : 'Moyenne forfaitaire ~100 à 200 MAD'}
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* ================= DYNAMIC OUTPUTS CARD (5 Cols) ================= */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Primary Result Box */}
            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                  {isAr ? 'التسعيرة الموصى بها في السوق' : 'Tarifs Recommandés (Marché)'}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {isAr ? '+15% هامش أمان' : '+15% marge sécurité'}
                </span>
              </div>

              {/* TJM Large Display */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="text-xs text-slate-400 font-medium">
                  {isAr ? 'سعر اليوم الموصى به (TJM)' : 'TJM Recommandé (Tarif Journalier Moyen)'}
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                    {calculation.recommendedDaily.toLocaleString()}
                  </span>
                  <span className="text-base font-bold text-emerald-400">MAD / {isAr ? 'يوم' : 'jour'}</span>
                </div>
                
                {/* Equivalent in EUR & USD */}
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                  <span>≈ <strong className="text-zinc-200">{calculation.eurDailyEquivalent} €</strong> / {isAr ? 'يوم للزبائن الأوروبيين' : 'j (Europe)'}</span>
                  <span>•</span>
                  <span>≈ <strong className="text-zinc-200">{calculation.usdDailyEquivalent} $</strong> / {isAr ? 'يوم' : 'j (US/Gulf)'}</span>
                </div>
              </div>

              {/* Hourly & Breakeven Rates */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-800">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {isAr ? 'سعر الساعة الموصى به' : 'Taux horaire conseillé'}
                  </div>
                  <div className="text-xl font-bold text-white mt-0.5">
                    {calculation.recommendedHourly} <span className="text-xs font-normal text-slate-400">MAD/h</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {isAr ? 'الحد الأدنى لعدم الخسارة' : 'Seuil de rentabilité (Min)'}
                  </div>
                  <div className="text-xl font-bold text-amber-400 mt-0.5">
                    {calculation.breakevenDaily} <span className="text-xs font-normal text-slate-400">MAD/j</span>
                  </div>
                </div>
              </div>

              {/* Actions: Copy & Apply */}
              <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? (isAr ? 'تم النسخ!' : 'Copié !') : (isAr ? 'نسخ ملخص التسعير' : 'Copier la synthèse')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplyToInvoice}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>
                    {appliedNotice 
                      ? (isAr ? 'تم التطبيق بنجاح!' : 'Appliqué à la facture !') 
                      : (isAr ? 'تطبيق في مولد الفواتير' : 'Appliquer à la Facture')}
                  </span>
                </button>
              </div>

            </div>

            {/* Visual Breakdown Bar Card */}
            <div className="bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 p-5 shadow-xs">
              <h4 className="text-xs font-bold text-slate-700 dark:text-zinc-300 mb-3 flex items-center justify-between">
                <span>{isAr ? 'أين تذهب مداخيلك السنوية؟' : 'Répartition du Chiffre d\'Affaires'}</span>
                <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-normal">
                  {calculation.annualGrossTurnover.toLocaleString()} MAD / {isAr ? 'سنة' : 'an'}
                </span>
              </h4>

              {/* Progress Bar Stack */}
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-zinc-800">
                <div style={{ width: `${breakdownData.netPct}%` }} className="bg-emerald-500 transition-all duration-500" title="Net" />
                <div style={{ width: `${breakdownData.overheadPct}%` }} className="bg-blue-500 transition-all duration-500" title="Overhead" />
                <div style={{ width: `${breakdownData.taxCnssPct}%` }} className="bg-amber-500 transition-all duration-500" title="Taxes & CNSS" />
                <div style={{ width: `${breakdownData.bufferPct}%` }} className="bg-purple-500 transition-all duration-500" title="Buffer" />
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-[11px] font-medium text-slate-600 dark:text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>{isAr ? 'الصافي في جيبك' : 'Revenu net'} ({breakdownData.netPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span>{isAr ? 'المصاريف الثابتة' : 'Charges'} ({breakdownData.overheadPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>{isAr ? 'الضرائب و CNSS' : 'Impôts & AMO'} ({breakdownData.taxCnssPct}%)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  <span>{isAr ? 'هامش الأمان' : 'Sécurité / Imprévus'} ({breakdownData.bufferPct}%)</span>
                </div>
              </div>

              {/* Auto-Entrepreneur Legal Ceiling Notice */}
              <div className={`mt-4 p-3 rounded-xl text-xs flex items-start gap-2.5 ${
                calculation.isCeilingWarning
                  ? 'bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300'
              }`}>
                {calculation.isCeilingWarning ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold">
                    {isAr ? 'سقف المقاول الذاتي السنوي:' : 'Plafond Légal Auto-Entrepreneur :'} {calculation.ceilingLimit.toLocaleString()} MAD
                  </span>
                  <p className="text-[11px] mt-0.5 text-slate-500 dark:text-zinc-400">
                    {calculation.isCeilingWarning
                      ? (isAr 
                          ? '⚠️ بهذا الرقم سيتجاوز رقم معاملاتك السقف القانوني (200,000 درهم للخدمات). يُنصح بالتفكير في تأسيس شركة SARL-AU للحفاظ على الامتيازات الضريبية.' 
                          : '⚠️ Votre C.A prévisionnel dépasse le plafond légal de 200 000 MAD. Envisagez une transition vers une SARL-AU.')
                      : (isAr 
                          ? `أنت في المنطقة الآمنة قانونياً (${Math.round((calculation.annualGrossTurnover / calculation.ceilingLimit) * 100)}% من السقف القانوني).` 
                          : `Vous êtes dans la zone légale autorisée (${Math.round((calculation.annualGrossTurnover / calculation.ceilingLimit) * 100)}% du plafond).`)}
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
