'use client';

import React, { useState } from 'react';
import { 
  Download, 
  Compass, 
  ExternalLink, 
  Check, 
  Copy, 
  Mail, 
  FileCheck, 
  Sparkles, 
  Building2, 
  Landmark, 
  Wrench, 
  X,
  FileText,
  Table
} from 'lucide-react';
import { DIRECTORY_ITEMS } from '@/lib/data';
import confetti from 'canvas-confetti';

interface LeadMagnetsAndDirectoryProps {
  language: 'ar' | 'fr';
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  onlyModal?: boolean;
}

export const LeadMagnetsAndDirectory: React.FC<LeadMagnetsAndDirectoryProps> = ({
  language,
  isModalOpen,
  setIsModalOpen,
  onlyModal = false
}) => {
  const isAr = language === 'ar';

  const [activeTab, setActiveTab] = useState<'all' | 'bank' | 'coworking' | 'tool'>('all');
  
  // Lead Magnet State
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);

  const filteredDirectory = DIRECTORY_ITEMS.filter(
    item => activeTab === 'all' || item.category === activeTab
  );

  const handleUnlockPack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    // Save email lead to localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('freelance_leads') || '[]');
      existing.push({ email, timestamp: new Date().toISOString() });
      localStorage.setItem('freelance_leads', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setUnlocked(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const sampleContractText = isAr
    ? `عقد تقديم خدمات واستشارات رقمية وفنية (نموذج معتمد للمقاول الذاتي بالمغرب)
طرف أول (مقدم الخدمة): [الاسم الكامل]، مقاول ذاتي مسجل تحت رقم [AE-XXXX] ورقم ICE: [XXXXXXXXXXXXXXX].
طرف ثان (الزبون / الشركة): شركة [اسم الشركة] SARL، ممثلة بـ [الاسم]، رقم ICE: [XXXXXXXXXXXXXXX].

البند الأول - موضوع العقد:
يتعهد الطرف الأول بتنفيذ الخدمات التقنية والتصميمية المحددة في عرض الأسعار (Devis) المرفق.

البند الثاني - الأتعاب والدفعات:
يلتزم الطرف الثاني بأداء إجمالي الأتعاب البالغة [المبلغ] درهم مغربي وفق الجدولة التالية:
- دفعة أولى (Acompte) بنسبة 40% عند توقيع هذا العقد وقبل بدء الأعمال.
- دفعة ختامية بنسبة 60% عند التسليم النهائي ومصادقة الطرف الثاني في أجل أقصاه 7 أيام عمل.

البند الثالث - الملكية الفكرية:
تظل كافة الملفات المصدرية، التصاميم، وحقوق الملكية الفكرية ملكاً حصرياً للطرف الأول ولا تنتقل للطرف الثاني إلا بعد السداد الكامل لجميع المستحقات المالية.

البند الرابع - التعديلات الإضافية:
يشمل هذا العقد جولتين من التعديلات الطفيفة (2 tours de révision). أي تغيير جوهري في المتطلبات يُفوتر بسعر الساعة الإضافي.

البند الخامس - الاختصاص القضائي:
في حال حدوث أي نزاع، تختص المحكمة الابتدائية والتجارية بمدينة [المدينة - الدار البيضاء / الرباط] بالنظر فيه وفقاً للقانون المغربي.`
    : `CONTRAT DE PRESTATION DE SERVICES ET MISSIONS FREELANCE (MODÈLE MAROC)
ENTRE LES SOUSSIGNÉS :
Le Prestataire : [Nom & Prénom], titulaire du statut d'Auto-Entrepreneur n° [AE-XXXX], ICE n° [XXXXXXXXXXXXXXX].
ET :
Le Client : La société [Raison Sociale] SARL, représentée par [Nom du gérant], ICE n° [XXXXXXXXXXXXXXX].

ARTICLE 1 - OBJET DE LA MISSION
Le Prestataire s'engage à réaliser les prestations décrites dans le devis n° [XXX] annexé au présent contrat.

ARTICLE 2 - CONDITIONS FINANCIÈRES & ÉCHÉANCIER
Le montant total de la mission est fixé à [Montant] MAD net (exonéré de TVA selon l'art. 89 du CGI marocain).
Modalités de règlement :
- Acompte de 40% payable à la signature du présent contrat avant tout démarrage des travaux.
- Solde de 60% payable à la livraison finale sous un délai maximal de 10 jours ouvrés.

ARTICLE 3 - PROPRIÉTÉ INTELLECTUELLE
Les droits d'exploitation et fichiers sources ne sont transférés au Client qu'après le règlement intégral et effectif de la facture.

ARTICLE 4 - CADRAGE DES RETOUCHES
Le forfait inclut 2 cycles de révisions mineures. Toute modification structurelle fera l'objet d'un avenant chiffré séparé.

ARTICLE 5 - LOI APPLICABLE ET JURIDICTION COMPÉTENTE
Le présent contrat est régi par le droit marocain. Tout litige relatif à sa validité ou exécution sera soumis au Tribunal de Commerce compétent.`;

  const handleCopyContract = () => {
    navigator.clipboard.writeText(sampleContractText);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 3000);
  };

  const handleDownloadCsvTracker = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Trimestre,Date Facture,Numero Facture,Client,ICE Client,Montant MAD,Plafond Annuel 200k,Pourcentage Consomme\n" +
      "T1 2025,2025-01-15,FAC-2025-001,Client A,00123456700001,15000,200000,7.5%\n" +
      "T1 2025,2025-02-10,FAC-2025-002,Client B,00234567800002,28000,200000,21.5%\n" +
      "T2 2025,2025-04-12,FAC-2025-003,Client C,00345678900003,32000,200000,37.5%\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Suivi_Plafond_AutoEntrepreneur_Maroc.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const modalJSX = isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!unlocked ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'تحميل مجاني مباشر' : 'Téléchargement Gratuit'}</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {isAr ? 'حزمة عقود ونماذج الفريلانس المغربي 🇲🇦' : 'Pack Juridique & Devis Freelance Maroc'}
            </h3>
            
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              {isAr
                ? 'أدخل بريدك الإلكتروني لفتح الحزمة وتحميل عقد العمل ثنائي اللغة (FR/AR) وجدول متابعة المداخيل فوراً.'
                : 'Entrez votre adresse email pour débloquer immédiatement le contrat bilingue et le tracker de chiffre d\'affaires.'}
            </p>

            {/* Features included */}
            <div className="mt-5 space-y-2 text-xs text-slate-700 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? 'عقد تقديم خدمات فريلانس مغربي معتمد (مع بنود التسبيق والملكية الفكرية)' : 'Contrat de prestation bilingue avec clauses d\'acompte et IP'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? 'نموذج عرض أسعار رسمي (Devis) متوافق مع نظام المقاول الذاتي' : 'Modèle Devis officiel conforme Auto-Entrepreneur'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{isAr ? 'جدول تتبع سقف المداخيل 200,000 درهم (Excel/CSV Tracker)' : 'Fichier de suivi du plafond 200 000 MAD pour déclarations DGI'}</span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleUnlockPack} className="mt-6 space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-zinc-300 block mb-1">
                  {isAr ? 'بريدك الإلكتروني المهني' : 'Votre adresse email professionnelle'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="amine@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-3 rounded-xl border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'فتح الحزمة والتحميل الآن' : 'Débloquer & Télécharger'}</span>
              </button>
              <p className="text-[10px] text-slate-400 text-center">
                {isAr ? 'نحترم خصوصيتك 100%. بدون رسائل مزعجة.' : 'Vos données restent confidentielles. Aucun spam.'}
              </p>
            </form>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
              <Check className="w-3.5 h-3.5" />
              <span>{isAr ? 'تم فتح الحزمة بنجاح 🎉' : 'Pack Débloqué avec Succès 🎉'}</span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {isAr ? 'ملفاتك جاهزة للاستعمال فوراً!' : 'Vos ressources sont prêtes !'}
            </h3>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleDownloadCsvTracker}
                className="flex items-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 hover:border-emerald-500 text-left transition-all cursor-pointer"
              >
                <Table className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {isAr ? 'جدول تتبع السقف (CSV)' : 'Tableau Excel / CSV'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {isAr ? 'حساب سقف 200,000 درهم' : 'Suivi plafond 200k MAD'}
                  </div>
                </div>
              </button>

              <button
                onClick={handleCopyContract}
                className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 text-left transition-all cursor-pointer"
              >
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200">
                    {copiedContract ? (isAr ? 'تم نسخ العقد!' : 'Contrat Copié !') : (isAr ? 'نسخ نص العقد القانوني' : 'Copier le Contrat Pro')}
                  </div>
                  <div className="text-[10px] text-emerald-700/80 dark:text-emerald-400/80">
                    {isAr ? 'جاهز للتعديل والطباعة' : 'Prêt à signer'}
                  </div>
                </div>
              </button>
            </div>

            {/* Contract Text Preview Box */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  {isAr ? 'معاينة نص العقد المعتمد:' : 'Aperçu du contrat de prestation :'}
                </span>
                <button
                  onClick={handleCopyContract}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedContract ? (isAr ? 'تم النسخ!' : 'Copié !') : (isAr ? 'نسخ' : 'Copier')}</span>
                </button>
              </div>
              <pre className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-[11px] leading-relaxed font-mono max-h-60 overflow-y-auto whitespace-pre-wrap border border-slate-800">
                {sampleContractText}
              </pre>
            </div>

          </div>
        )}

      </div>
    </div>
  );

  if (onlyModal) {
    return modalJSX;
  }

  return (
    <section id="directory" className="py-12 sm:py-16 border-t border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner: Free Lead Magnet Pack CTA */}
        <div className="relative rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-8 sm:p-12 mb-16 overflow-hidden shadow-xl">
          <div className="absolute right-0 top-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>{isAr ? 'هدية حصرية مجانية 100%' : 'Pack Exclusif Gratuit 100%'}</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              {isAr ? 'حزمة عقود ونماذج الفريلانس المغربي 🇲🇦' : 'Le Pack Ultime du Freelance Marocain'}
            </h2>
            
            <p className="mt-3 text-sm sm:text-base text-emerald-50 leading-relaxed max-w-2xl">
              {isAr
                ? 'وفّر آلاف الدراهم في الاستشارات القانونية: حمّل نموذج عقد عمل ثنائي اللغة (FR/AR) يحميك من التهرب من الدفع، نموذج Devis رسمي، وجدول إكسل لتتبع سقف المقاول الذاتي 200,000 درهم.'
                : 'Téléchargez gratuitement votre pack juridique complet : Contrat bilingue anti-impayés, modèle officiel de Devis et fichier Excel de suivi du plafond de 200 000 MAD.'}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-black text-sm shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-600" />
                <span>{isAr ? 'تحميل الحزمة المجانية فوراً' : 'Télécharger le Pack Gratuit'}</span>
              </button>
              
              <span className="text-xs text-emerald-100 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-300" />
                {isAr ? 'تحميل فوري بدون اشتراك' : 'Accès instantané sans engagement'}
              </span>
            </div>
          </div>
        </div>

        {/* Directory Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <Compass className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'دليل الفريلانسر المغربي' : 'Annuaire Sélectif du Freelance'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isAr ? 'البنوك، فضاءات العمل، وأدوات النجاح فالمغرب' : 'Comptes Pro, Coworkings & Outils Recommandés'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            {isAr
              ? 'مجموعة منتقاة من أفضل الخدمات البنكية الميسرة، فضاءات العمل المشتركة حسب المدن، وأدوات تسيير النشاط.'
              : 'Une sélection rigoureuse des banques les plus fluides, coworkings par ville et solutions de facturation.'}
          </p>
        </div>

        {/* Directory Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              {isAr ? 'الكل' : 'Tous'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bank')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'bank'
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              <Landmark className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'البنوك المغربية' : 'Banques Pro'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('coworking')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'coworking'
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'فضاءات العمل (Coworking)' : 'Coworking'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tool')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tool'
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-zinc-400'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'أدوات وإنتاجية' : 'Outils & SaaS'}</span>
            </button>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDirectory.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                
                {/* Header & Badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    {item.badge || item.category}
                  </span>
                  {item.city && (
                    <span className="text-xs font-semibold text-slate-400">
                      📍 {item.city}
                    </span>
                  )}
                  {item.sponsored && (
                    <span className="text-[9px] font-mono text-slate-400 uppercase">
                      Sponsorisé
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  {item.name}
                </h3>

                <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {isAr ? item.descriptionAr : item.descriptionFr}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-150 dark:border-zinc-800 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  ⚡ {item.pricingOrFeatures}
                </div>

              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4 border-t border-slate-150 dark:border-zinc-800">
                <a
                  href={item.link}
                  target="_blank"
                  rel={item.sponsored ? "sponsored noopener noreferrer" : "noopener noreferrer"}
                  className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-900 dark:text-white transition-colors"
                >
                  <span>{isAr ? item.ctaTextAr : item.ctaTextFr}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ================= RESOURCE DOWNLOAD MODAL ================= */}
      {modalJSX}

    </section>
  );
};
