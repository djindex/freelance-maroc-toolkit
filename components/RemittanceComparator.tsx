'use client';

import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, 
  TrendingUp, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles,
  ExternalLink,
  Coins,
  Building,
  CreditCard,
  Zap
} from 'lucide-react';
import { RemittanceCurrency, RemittanceChannelResult } from '@/types';

interface RemittanceComparatorProps {
  language: 'ar' | 'fr';
}

export const RemittanceComparator: React.FC<RemittanceComparatorProps> = ({ language }) => {
  const isAr = language === 'ar';

  const [currency, setCurrency] = useState<RemittanceCurrency>('USD');
  const [amount, setAmount] = useState<number>(2000);

  // Official Bank Al-Maghrib baseline exchange rates (2025/2026 realistic market rates)
  const officialRate = currency === 'USD' ? 10.05 : 10.92;

  // Presets for quick clicking
  const presets = [500, 1500, 2500, 5000];

  // Channel Calculations
  const channels = useMemo<RemittanceChannelResult[]>(() => {
    // 1. Traditional Moroccan Bank (SWIFT)
    // Bank spread ~2.0% + intermediary bank fee ($20/€20) + incoming wire fee 180 MAD
    const swiftIntermediaryUsd = 20;
    const swiftSpreadPct = 0.021; // 2.1% spread
    const swiftRate = officialRate * (1 - swiftSpreadPct);
    const swiftFixedMad = 180;
    const swiftAmountAfterIntermediary = Math.max(0, amount - swiftIntermediaryUsd);
    const swiftRawMad = swiftAmountAfterIntermediary * swiftRate;
    const swiftNetMad = Math.max(0, Math.round(swiftRawMad - swiftFixedMad));
    const swiftOfficialIdealMad = amount * officialRate;
    const swiftTotalLoss = Math.round(swiftOfficialIdealMad - swiftNetMad);

    // 2. Wise (TransferWise)
    // Real mid-market rate with ~0.55% transparent fee. Arrives as local MAD clearing wire (no incoming fee)
    const wiseFeePct = 0.0055;
    const wiseRate = officialRate; // Interbank real rate
    const wiseFeeInCurrency = amount * wiseFeePct;
    const wiseNetInCurrency = amount - wiseFeeInCurrency;
    const wiseNetMad = Math.round(wiseNetInCurrency * wiseRate);
    const wiseTotalLoss = Math.round((amount * officialRate) - wiseNetMad);

    // 3. Payoneer
    // Payoneer takes 2% FX spread when withdrawing to Moroccan bank + 3 USD/EUR flat fee
    const payoneerFeeFixed = 3;
    const payoneerSpread = 0.022; // 2.2% FX margin
    const payoneerRate = officialRate * (1 - payoneerSpread);
    const payoneerAmountAfterFixed = Math.max(0, amount - payoneerFeeFixed);
    const payoneerNetMad = Math.round(payoneerAmountAfterFixed * payoneerRate);
    const payoneerTotalLoss = Math.round((amount * officialRate) - payoneerNetMad);

    // 4. Binance P2P / USDT Crypto
    // Often trades at a slight premium in Morocco (e.g. +1.5% to +2.5% above interbank)
    // 0% platform fee for p2p receiver, instant local CIH/Attijari wire
    const p2pRate = officialRate * 1.018; // +1.8% premium
    const p2pNetMad = Math.round(amount * p2pRate);
    const p2pTotalLoss = 0; // Negative loss / profit!

    const results: RemittanceChannelResult[] = [
      {
        channelId: 'wise',
        name: 'Wise (TransferWise)',
        logo: 'WISE',
        badge: isAr ? 'الأفضل والأكثر شفافية 🏆' : 'Recommandé 🏆',
        exchangeRateApplied: Number(wiseRate.toFixed(3)),
        officialRate,
        spreadLossMad: Math.round(wiseFeeInCurrency * wiseRate),
        fixedFeesMad: 0,
        netMadReceived: wiseNetMad,
        processingTime: isAr ? '24 - 48 ساعة (تحويل محلي)' : '24 - 48h (Virement local)',
        reliabilityScore: 5,
        description: isAr 
          ? 'سعر صرف بنكي حقيقي 100% بدون عمولات سرية. يصل كتحويل محلي لحسابك المغربي بدون مصاريف SWIFT.' 
          : 'Taux de change réel sans marge cachée. Arrive comme virement interbancaire local sans frais de réception.',
        isBestValue: true
      },
      {
        channelId: 'swift-bank',
        name: isAr ? 'تحويل بنكي دولي مباشر (SWIFT)' : 'Virement Bancaire International (SWIFT)',
        logo: 'BANK',
        badge: isAr ? 'تقليدي وبطيء' : 'Traditionnel',
        exchangeRateApplied: Number(swiftRate.toFixed(3)),
        officialRate,
        spreadLossMad: Math.round((amount * officialRate) - (amount * swiftRate)),
        fixedFeesMad: Math.round(swiftFixedMad + (swiftIntermediaryUsd * officialRate)),
        netMadReceived: swiftNetMad,
        processingTime: isAr ? '3 - 5 أيام عمل' : '3 - 5 jours ouvrés',
        reliabilityScore: 4,
        description: isAr
          ? 'عمولة صرف مخفية في البنوك المغربية (~2.1%) + اقتطاع بنك وسيط (Correspondent Bank) + 180 درهم رسوم استقبال.'
          : 'Marge de change bancaire (~2.1%) + frais de banque correspondante (~20$) + frais fixes de réception.',
        isBestValue: false
      },
      {
        channelId: 'payoneer',
        name: 'Payoneer (سحب للبنك المغربي)',
        logo: 'PAYO',
        badge: isAr ? 'شائع للمنصات الدولية' : 'Populaire plateformes',
        exchangeRateApplied: Number(payoneerRate.toFixed(3)),
        officialRate,
        spreadLossMad: Math.round((amount * officialRate) - (payoneerAmountAfterFixed * payoneerRate)),
        fixedFeesMad: Math.round(payoneerFeeFixed * officialRate),
        netMadReceived: payoneerNetMad,
        processingTime: isAr ? '2 - 3 أيام عمل' : '2 - 3 jours',
        reliabilityScore: 4.5,
        description: isAr
          ? 'مناسب إذا كنت تستقبل أموالك من Upwork أو Fiverr أو App Store، مع اقتطاع تحويل عملة ~2%.'
          : 'Idéal pour encaisser Upwork/Fiverr, avec une commission de conversion de ~2.2% lors du virement vers le Maroc.',
        isBestValue: false
      },
      {
        channelId: 'crypto-p2p',
        name: 'Binance P2P / USDT (كريبتو)',
        logo: 'P2P',
        badge: isAr ? 'سعر مرتفع + تنبيه قانوني' : 'Taux élevé (Avis légal)',
        exchangeRateApplied: Number(p2pRate.toFixed(3)),
        officialRate,
        spreadLossMad: 0,
        fixedFeesMad: 0,
        netMadReceived: p2pNetMad,
        processingTime: isAr ? '5 - 15 دقيقة فوري' : '5 - 15 minutes instantané',
        reliabilityScore: 3.5,
        description: isAr
          ? 'يعطي سعراً أعلى من البنك، لكن يجب الانتباه لقوانين مكتب الصرف (Office des Changes) والضرائب بخصوص العملات الرقمية.'
          : 'Donne souvent un léger surplus, mais nécessite la vigilance vis-à-vis des directives de l\'Office des Changes.',
        isBestValue: false
      }
    ];

    return results;
  }, [amount, currency, officialRate, isAr]);

  // Difference between best (Wise) and worst (SWIFT)
  const wiseChannel = channels.find(c => c.channelId === 'wise');
  const swiftChannel = channels.find(c => c.channelId === 'swift-bank');
  const differenceSaved = (wiseChannel && swiftChannel) ? (wiseChannel.netMadReceived - swiftChannel.netMadReceived) : 0;

  return (
    <section id="remittance-comparator" className="py-12 sm:py-16 border-t border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'مقارن التحويلات والعملات الأجنبية' : 'Comparateur de Virements Internationaux'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isAr ? 'كم سيبقى لك في جيبك بالدرهم المغربي؟' : 'Combien de MAD recevez-vous réellement sur votre compte ?'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            {isAr
              ? 'اكشف العمولات المخفية، وفارق سعر الصرف بين البنوك المغربية، ومنصات Wise وPayoneer عند استقبال أموال الزبائن من الخارج.'
              : 'Comparez les frais réels cachés (spread de change, intermédiaires, frais de réception) entre les banques marocaines, Wise et Payoneer.'}
          </p>
        </div>

        {/* Input Controls Card */}
        <div className="bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xs max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* Currency selector (USD / EUR) */}
            <div className="sm:col-span-4">
              <label className="text-xs font-bold text-slate-800 dark:text-zinc-200 block mb-2">
                {isAr ? 'عملة الدفعة الواردة' : 'Devise du virement'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-black border transition-all text-center cursor-pointer ${
                    currency === 'USD'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 shadow-xs'
                      : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400'
                  }`}
                >
                  <span className="text-base mr-1">$</span> USD (الدولار)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('EUR')}
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-black border transition-all text-center cursor-pointer ${
                    currency === 'EUR'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 shadow-xs'
                      : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400'
                  }`}
                >
                  <span className="text-base mr-1">€</span> EUR (اليورو)
                </button>
              </div>
            </div>

            {/* Amount input & presets */}
            <div className="sm:col-span-8">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 dark:text-zinc-200">
                  {isAr ? 'المبلغ المحول من الزبون الأجنبي' : 'Montant envoyé par le client'}
                </label>
                <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                  {isAr ? 'سعر الصرف الرسمي (بنك المغرب):' : 'Taux officiel BAM :'} <strong className="text-slate-900 dark:text-white font-mono">1 {currency} = {officialRate} MAD</strong>
                </span>
              </div>
              <div className="relative">
                <input
                  type="number"
                  min="50"
                  max="50000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value) || 0)}
                  className="w-full p-3.5 rounded-2xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white text-lg font-black font-mono pl-4 pr-16"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-slate-400">
                  {currency}
                </span>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-2 mt-2.5">
                <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                  {isAr ? 'مبالغ سريعة:' : 'Montants rapides :'}
                </span>
                {presets.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(p)}
                    className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
                  >
                    {p.toLocaleString()} {currency}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Winning Savings Callout */}
          {differenceSaved > 0 && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-black text-emerald-950 dark:text-emerald-300">
                    {isAr 
                      ? `تربح حتى +${differenceSaved.toLocaleString()} درهم زيادة في جيبك عند اختيار Wise مقارنة بالتحويل البنكي العادي (SWIFT)!` 
                      : `Vous gagnez jusqu'à +${differenceSaved.toLocaleString()} MAD de plus dans votre poche avec Wise comparé au SWIFT classique !`}
                  </div>
                  <div className="text-[11px] text-emerald-800/80 dark:text-emerald-400/80 mt-0.5">
                    {isAr ? 'البنوك التقليدية تقتطع عمولة صرف غير مرئية وتفرض رسوم استقبال بنكية.' : 'Les banques traditionnelles prélèvent un spread de change et des frais d\'entrée.'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Grid: 4 Channels Compared */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((chan) => {
            return (
              <div
                key={chan.channelId}
                className={`rounded-3xl p-6 transition-all relative flex flex-col justify-between ${
                  chan.isBestValue
                    ? 'bg-gradient-to-b from-emerald-50/60 to-white dark:from-emerald-950/30 dark:to-[#121215] border-2 border-emerald-500 shadow-lg shadow-emerald-500/10'
                    : 'bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-xs'
                }`}
              >
                <div>
                  
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      chan.isBestValue
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                    }`}>
                      {chan.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      ⏱ {chan.processingTime}
                    </span>
                  </div>

                  {/* Channel Name */}
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {chan.name}
                  </h3>

                  {/* Net MAD Amount Large */}
                  <div className="mt-4 pt-3 border-t border-slate-150 dark:border-zinc-800">
                    <div className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                      {isAr ? 'الصافي الحقيقي في حسابك:' : 'Montant net reçu en MAD :'}
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono mt-1">
                      {chan.netMadReceived.toLocaleString()}{' '}
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">MAD</span>
                    </div>
                  </div>

                  {/* Breakdown metrics */}
                  <div className="mt-5 space-y-2 text-xs border-t border-slate-150 dark:border-zinc-800 pt-4">
                    <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                      <span>{isAr ? 'سعر الصرف المطبق:' : 'Taux appliqué :'}</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        1 {currency} = {chan.exchangeRateApplied} MAD
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                      <span>{isAr ? 'الخسارة في سعر الصرف:' : 'Perte sur le taux :'}</span>
                      <span className="font-mono text-red-500 font-bold">
                        -{chan.spreadLossMad.toLocaleString()} MAD
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-zinc-400">
                      <span>{isAr ? 'رسوم ثابتة واقتطاعات:' : 'Frais fixes bancaires :'}</span>
                      <span className="font-mono text-red-500 font-bold">
                        -{chan.fixedFeesMad.toLocaleString()} MAD
                      </span>
                    </div>
                  </div>

                  {/* Description / Verdict */}
                  <p className="mt-4 text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed border-t border-slate-150 dark:border-zinc-800 pt-3">
                    {chan.description}
                  </p>

                </div>

                {/* Bottom Trust indicator */}
                <div className="mt-6 pt-3 border-t border-slate-150 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{isAr ? 'الموثوقية القانونية' : 'Fiabilité juridique'} :</span>
                  <div className="flex items-center text-amber-500 font-bold">
                    {'★'.repeat(Math.floor(chan.reliabilityScore))}
                    <span className="text-slate-400 ml-1">({chan.reliabilityScore}/5)</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Moroccan Office des Changes & Repatriation Guide Box */}
        <div className="mt-10 p-6 rounded-3xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 max-w-4xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {isAr 
                  ? 'معلومة قانونية هامة: إبراء الذمة وحساب العملة الصعبة للمقاول الذاتي' 
                  : 'Bon à savoir : Rapatriement de devises & Compte convertible pour indépendants'}
              </h4>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {isAr
                  ? 'عند استقبالك أموالاً بالعملة الصعبة من الخارج كمقاول ذاتي، يحق لك قانونياً من مكتب الصرف (Office des Changes) فتح "حساب بالعملة الصعبة القابلة للتحويل" (Compte en devises convertible) والاحتفاظ بنسبة تصل إلى 70% من مداخيلك بالدولار أو اليورو، لتحمي نفسك من تقلبات الصرف وتستعملها في أداء مصاريف السيرفرات والاشتراكات الدولية بدون سقف.'
                  : 'Au Maroc, les exportateurs de services (y compris les Auto-Entrepreneurs) ont le droit légal auprès de l\'Office des Changes de conserver jusqu\'à 70% de leurs devises rapatriées sur un compte bancaire en devises convertibles pour payer leurs logiciels et outils à l\'international.'}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
