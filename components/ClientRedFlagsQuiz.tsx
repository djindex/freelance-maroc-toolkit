'use client';

import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Copy, 
  Check, 
  Share2, 
  Sparkles, 
  RotateCcw,
  MessageSquareQuote,
  Flame,
  ShieldCheck,
  Send
} from 'lucide-react';
import { RED_FLAG_SCENARIOS } from '@/lib/data';

interface ClientRedFlagsQuizProps {
  language: 'ar' | 'fr';
}

export const ClientRedFlagsQuiz: React.FC<ClientRedFlagsQuizProps> = ({ language }) => {
  const isAr = language === 'ar';

  // Selected options: key is question id, value is selected option index
  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 1, // default preview scenario
    2: 1,
    3: 0,
    4: 0,
    5: 1,
    6: 0,
  });

  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedScriptId, setCopiedScriptId] = useState<number | null>(null);

  // Compute Total Score (0 to 100%)
  const { totalScore, maxPossible, percentage } = useMemo(() => {
    let score = 0;
    const maxScore = RED_FLAG_SCENARIOS.length * 25; // 6 * 25 = 150 points max

    RED_FLAG_SCENARIOS.forEach((scenario) => {
      const selectedIndex = answers[scenario.id];
      if (selectedIndex !== undefined && scenario.options[selectedIndex]) {
        score += scenario.options[selectedIndex].points;
      }
    });

    const pct = Math.min(100, Math.round((score / maxScore) * 100));
    return { totalScore: score, maxPossible: maxScore, percentage: pct };
  }, [answers]);

  // Moroccan Verdict based on score
  const verdict = useMemo(() => {
    if (percentage <= 20) {
      return {
        level: 'safe',
        color: 'emerald',
        titleAr: 'زبون الأحلام (Client de Rêve) 🌟',
        titleFr: 'Client en Or & Hautement Professionnel 🌟',
        darijaAr: 'هنيئاً لك! زبون محترم، كيعرف قيمة وقتك وفلوسك، كيحترم بنود العقد، وماكيبخلش في التسبيق. تهلا فيه وحافظ عليه.',
        descFr: 'Félicitations ! Client mature, respectueux des processus et ponctuel sur les paiements. À fidéliser absolument.',
        script: isAr
          ? '« السلام عليكم سي [الاسم]، شكراً جزيلاً على الاحترافية ديالكم. ها هو رابط العقد المبدئي ورقم الحساب لتحويل الدفعة الأولى (30%). الخدمة غاتنطلق مباشرة بعد التأكيد. »'
          : '« Bonjour [Nom], merci pour votre réactivité et professionnalisme. Voici le bon de commande signé ainsi que notre RIB pour l\'acompte de 30%. Nous démarrons dès réception. »'
      };
    } else if (percentage <= 55) {
      return {
        level: 'warning',
        color: 'amber',
        titleAr: 'زبون عادي مع شوية "الفهامات" 🧐',
        titleFr: 'Client Moyen : Négociation ferme requise 🧐',
        darijaAr: 'زبون يمكن تخدم معاه، ولكن ضروري تدير ليه حدود قاصحة: ما تبداش بلا 40% تسبيق، حدد ليه جولتين ديال التعديلات فقط، وما تجاوبش على واتساب مورا 7 ديال العشية.',
        descFr: 'Client gérable mais cadrage rigoureux indispensable : acompte obligatoire, limitation stricte des retouches et communication cadrée sur les horaires de bureau.',
        script: isAr
          ? '« أهلاً سي [الاسم]، بخصوص التعديلات الإضافية اللي طلبتي، العقد كيتضمن جولتين فقط من المراجعات اللي كملناهم. باش نضيفو هاد الخصائص الجديدة، يمكن لينا نديرو ملحق Devis إضافي بـ [X] درهم. واش نوجد ليك الفاتورة التكميلية؟ »'
          : '« Bonjour [Nom], le périmètre convenu initialement incluait 2 tours de retouches que nous avons validés. Pour intégrer ces nouveaux ajustements, je peux vous éditer un avenant chiffré à [X] MAD. Souhaitez-vous que je vous l\'envoie ? »'
      };
    } else if (percentage <= 80) {
      return {
        level: 'danger',
        color: 'orange',
        titleAr: 'منطقة الخطر الشديد: حرق الأعصاب مؤكد! 🚩',
        titleFr: 'Alerte Rouge : Risque Élevé de Conflit 🚩',
        darijaAr: 'رد البال مزيان! هاد الزبون باغي خدمة فابور، كيعتابر راسو شراك مع الماترييل، وغايبرزطك في أنصاص الليالي. إلا ما خديتيش 50% تسبيق دابا وكونطرا ميسنية، غاتندم على النهار اللي شفتيه.',
        descFr: 'Vigilance absolue ! Risque fort d\'impayé ou de burnout. Exigez 50% d\'acompte ferme, contrat signé avec ICE et refusez les échanges nocturnes sur WhatsApp.',
        script: isAr
          ? '« شكراً على اهتمامكم بسيادتنا. سياستنا في العمل تتطلب توقيع عرض الأسعار (Devis) وأداء تسبيق 50% كشرط إلزامي لحجز الجدول الزمني. بدون هذا الإجراء، نعتذر عن بدء أي مرحلة عمل. تحياتنا. »'
          : '« Merci pour votre sollicitation. Notre charte d\'intervention impose la signature du devis et le règlement d\'un acompte de 50% avant tout lancement d\'étape. Sans cela, nous ne pourrons pas bloquer le planning. Cordialement. »'
      };
    } else {
      return {
        level: 'critical',
        color: 'red',
        titleAr: 'هرب أخويا هرب! (Run For Your Life) 🚨',
        titleFr: 'Danger Absolu : Fuyez Immédiatement ! 🚨',
        darijaAr: 'كارثة متنقلة! هاد الزبون غادي يسرق ليك جهدك، ما غايخلصكش في الآخر، وغايقوليك الخدمة ما عجباتش خالة المدير. بلوكي الرقم، دير صلاة شكر، وركز على زبناء كيعرفو قيمة الخدمة.',
        descFr: 'Toxique à 100% ! Vous ne serez probablement jamais payé et vos nuits seront détruites. Dites non poliment et passez à un autre prospect.',
        script: isAr
          ? '« السلام عليكم سي [الاسم]، بعد مراجعة جدول الأعمال الحالي وضغط المشاريع، نعتذر عن عدم إمكانية تولي هذا المشروع في الوقت الراهن. نتمنى لكم كامل التوفيق مع فريق آخر. »'
          : '« Bonjour [Nom], suite à un carnet de commandes complet pour ce trimestre, nous ne sommes pas en mesure de prendre en charge votre projet selon ces modalités. Nous vous souhaitons plein succès pour la suite. »'
      };
    }
  }, [percentage, isAr]);

  const handleSelectOption = (scenarioId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [scenarioId]: optionIndex }));
  };

  const handleCopyScript = (scriptText: string, id: number) => {
    navigator.clipboard.writeText(scriptText);
    setCopiedScriptId(id);
    setTimeout(() => setCopiedScriptId(null), 3000);
  };

  const handleShareResult = () => {
    const shareText = isAr
      ? `🚨 مؤشر الزبون المقلق (Client Red Flags) - نتيجة الفحص:
نسبة الخطورة: ${percentage}% (${verdict.titleAr})
${verdict.darijaAr}
جرب وافحص زبونك دابا في المغرب عبر FreelanceMaroc Toolkit 🇲🇦`
      : `🚨 Quiz Red Flags Client Freelance Maroc :
Niveau de risque détecté : ${percentage}% (${verdict.titleFr})
${verdict.descFr}
Testez gratuitement votre prospect sur FreelanceMaroc Toolkit 🇲🇦`;

    navigator.clipboard.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 3000);
  };

  const handleResetQuiz = () => {
    const resetAnswers: Record<number, number> = {};
    RED_FLAG_SCENARIOS.forEach(s => {
      resetAnswers[s.id] = 0;
    });
    setAnswers(resetAnswers);
  };

  return (
    <section id="client-quiz" className="py-12 sm:py-16 border-t border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100/80 dark:bg-red-950/70 text-red-800 dark:text-red-300 text-xs font-bold mb-3 border border-red-300 dark:border-red-800">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            <span>{isAr ? 'كويز الزبون المقلق (Red Flags)' : 'Détecteur de Clients Toxiques & Red Flags'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isAr ? 'واش الزبون يستاهل وقتك ولا خاصك تهرب؟' : 'Ce client en vaut-il la peine ou devez-vous fuir ?'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            {isAr
              ? '6 مواقف واقعية من قلب السوق المغربي: جاوب بصراحة واكتشف نسبة الخطورة مع نصوص تفاوضية جاهزة للنسخ في الواتساب.'
              : '6 situations réelles vécues par les indépendants au Maroc. Calculez votre score de risque et copiez nos scripts de cadrage.'}
          </p>
        </div>

        {/* Workspace: 2 Columns (Scenarios on Left, Live Score Gauge on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= SCENARIOS LIST (7 Cols) ================= */}
          <div className="lg:col-span-7 space-y-4">
            {RED_FLAG_SCENARIOS.map((scenario, index) => {
              const selectedIdx = answers[scenario.id] ?? 0;
              return (
                <div
                  key={scenario.id}
                  className="bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 p-5 sm:p-6 shadow-xs hover:border-slate-300 dark:hover:border-zinc-700 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold flex items-center justify-center font-mono">
                        {index + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {isAr ? scenario.titleAr : scenario.titleFr}
                      </h3>
                    </div>
                  </div>

                  {/* Culturally witty quote */}
                  <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 italic flex items-start gap-2">
                    <MessageSquareQuote className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{isAr ? scenario.descriptionAr : scenario.descriptionFr}</span>
                  </div>

                  {/* 3 Radio Options */}
                  <div className="mt-4 space-y-2">
                    {scenario.options.map((option, optIdx) => {
                      const isSelected = selectedIdx === optIdx;
                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(scenario.id, optIdx)}
                          className={`w-full text-left p-3 rounded-xl text-xs font-medium border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                            isSelected
                              ? option.points === 0
                                ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/50 text-emerald-950 dark:text-emerald-200'
                                : option.points < 20
                                ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/50 text-amber-950 dark:text-amber-200'
                                : 'border-red-500 bg-red-50/70 dark:bg-red-950/50 text-red-950 dark:text-red-200'
                              : 'border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                              isSelected 
                                ? option.points === 0 ? 'border-emerald-500 bg-emerald-500' : option.points < 20 ? 'border-amber-500 bg-amber-500' : 'border-red-500 bg-red-500' 
                                : 'border-slate-400'
                            }`}>
                              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </span>
                            <span>{isAr ? option.labelAr : option.labelFr}</span>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                            option.points === 0
                              ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                              : option.points < 20
                              ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                              : 'bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-300'
                          }`}>
                            {option.points === 0 ? (isAr ? 'احترافي' : 'Sain') : `+${option.points} pts`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= LIVE SCORE GAUGE & SCRIPTS (5 Cols) ================= */}
          <div className="lg:col-span-5 sticky top-24 space-y-6">
            
            {/* The Animated Score Card */}
            <div className="bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 sm:p-7 shadow-xl text-center relative overflow-hidden">
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  {isAr ? 'مؤشر الخطورة الإجمالي' : 'Niveau de Risque Global'}
                </span>
                <button
                  type="button"
                  onClick={handleResetQuiz}
                  className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إعادة التقييم' : 'Réinitialiser'}</span>
                </button>
              </div>

              {/* Huge Percentage Gauge */}
              <div className="mt-6">
                <div className="relative inline-flex items-center justify-center">
                  <div className={`text-6xl sm:text-7xl font-black tracking-tight font-mono ${
                    percentage <= 25 ? 'text-emerald-500' : percentage <= 55 ? 'text-amber-500' : percentage <= 80 ? 'text-orange-500' : 'text-red-500'
                  }`}>
                    {percentage}%
                  </div>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full h-3 bg-slate-150 dark:bg-zinc-800 rounded-full mt-4 overflow-hidden">
                  <div
                    style={{ width: `${percentage}%` }}
                    className={`h-full transition-all duration-500 rounded-full ${
                      percentage <= 25 ? 'bg-emerald-500' : percentage <= 55 ? 'bg-amber-500' : percentage <= 80 ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>

              {/* Verdict Title */}
              <div className="mt-6 pt-4 border-t border-slate-150 dark:border-zinc-800">
                <h4 className="text-lg font-black text-slate-900 dark:text-white">
                  {isAr ? verdict.titleAr : verdict.titleFr}
                </h4>
                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-medium">
                  {isAr ? verdict.darijaAr : verdict.descFr}
                </p>
              </div>

              {/* Share Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-150 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={handleShareResult}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-950 hover:scale-[1.02] active:scale-95 transition-all shadow-md cursor-pointer"
                >
                  {copiedShare ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedShare ? (isAr ? 'تم نسخ التقييم للمشاركة!' : 'Copié dans le presse-papier !') : (isAr ? 'مشاركة النتيجة على LinkedIn / X' : 'Partager mon résultat')}</span>
                </button>
              </div>

            </div>

            {/* Negotiation Script Card (Battle-tested WhatsApp/Email reply) */}
            <div className="bg-gradient-to-br from-slate-900 to-zinc-950 text-white rounded-3xl p-6 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" />
                  {isAr ? 'رسالة جاهزة للإرسال في الواتساب / الإيميل' : 'Script de Cadrage (Prêt à Copier)'}
                </span>
                <span className="text-[10px] text-slate-400">Maroc Edition</span>
              </div>

              <p className="text-xs text-slate-300 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 leading-relaxed font-mono">
                {verdict.script}
              </p>

              <button
                type="button"
                onClick={() => handleCopyScript(verdict.script, 999)}
                className="mt-4 w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all cursor-pointer"
              >
                {copiedScriptId === 999 ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedScriptId === 999 ? (isAr ? 'تم النسخ!' : 'Copié !') : (isAr ? 'نسخ هذا الرد وإرساله للزبون' : 'Copier et envoyer au client')}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
