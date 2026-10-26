'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  FileText, 
  ArrowRightLeft, 
  ShieldAlert, 
  TrendingUp, 
  Compass, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Zap, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Download, 
  Star, 
  ChevronDown, 
  Building2, 
  Coins, 
  Users 
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function LandingPage() {
  const { language, setIsResourceModalOpen } = useApp();
  const isAr = language === 'ar';

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 6 Dedicated Tools Cards
  const toolkitModules = [
    {
      id: 'tjm',
      titleAr: 'حاسبة TJM وسعر الساعة',
      titleFr: 'Calculateur TJM & Taux Horaire',
      descAr: 'احسب سعرك اليومي الحقيقي بدقة متناهية مع احتساب التكاليف الثابتة، العطل، الساعات غير المفوترة، والضرائب الرسمية.',
      descFr: 'Déterminez votre vrai TJM rentable en intégrant charges fixes, congés payés, prospection et cotisations AE.',
      badgeAr: 'الأكثر استعمالاً ⭐',
      badgeFr: 'Populaire ⭐',
      badgeColor: 'emerald',
      href: '/tjm-calculator',
      icon: Calculator,
      metricAr: 'سعر اليوم + سعر الساعة + سقف 200k',
      metricFr: 'TJM + Taux horaire + Plafond C.A'
    },
    {
      id: 'invoice',
      titleAr: 'مولّد الفواتير الرسمي (DGI)',
      titleFr: 'Facture Légale Auto-Entrepreneur',
      descAr: 'أنشئ فواتير احترافية مطابقة 100% لمعايير الضرائب المغربية مع رقم الـ ICE وإعفاء TVA (المادة 89) وتفقيط المبلغ بالفرنسية.',
      descFr: 'Générez des factures légales avec ICE, mention obligatoire de TVA (Art. 89 CGI) et montant arrêté en toutes lettres.',
      badgeAr: 'مطابق قانونياً 📄',
      badgeFr: '100% Conforme 📄',
      badgeColor: 'blue',
      href: '/invoice-generator',
      icon: FileText,
      metricAr: 'طباعة فورية A4 بدون أخطاء',
      metricFr: 'Impression A4 & Export PDF direct'
    },
    {
      id: 'remittance',
      titleAr: 'مقارن التحويلات البنكية (Devises)',
      titleFr: 'Comparateur de Virements Internationaux',
      descAr: 'قارن بين البنوك المغربية SWIFT ومنصة Wise وPayoneer واكشف العمولات المخفية وفروقات سعر الصرف لتحصل على أكبر صافي بالدرهم.',
      descFr: 'Comparez SWIFT vs Wise vs Payoneer pour débusquer les frais cachés et maximiser vos dirhams reçus.',
      badgeAr: 'توفير حتى +1,200 درهم 💰',
      badgeFr: 'Économies Réelles 💰',
      badgeColor: 'amber',
      href: '/remittance-comparator',
      icon: ArrowRightLeft,
      metricAr: 'USD و EUR إلى درهم مغربي',
      metricFr: 'USD & EUR vers MAD net en compte'
    },
    {
      id: 'quiz',
      titleAr: 'مؤشر الزبون المقلق (Red Flags)',
      titleFr: 'Détecteur de Clients Toxiques',
      descAr: 'كويز تفاعلي من 6 سيناريوهات واقعية فالمغرب: اكتشف نسبة خطورة الزبون مع نصوص تفاوضية جاهزة للإرسال في الواتساب.',
      descFr: 'Quiz interactif en 6 situations marocaines réelles. Calculez le score de risque et copiez nos scripts WhatsApp.',
      badgeAr: 'فيروسي وممتع 🚨',
      badgeFr: 'Viral & Fun 🚨',
      badgeColor: 'red',
      href: '/client-quiz',
      icon: ShieldAlert,
      metricAr: 'مؤشر هرب اخويا هرب (0-100%)',
      metricFr: 'Score de risque & Scripts de cadrage'
    },
    {
      id: 'benchmark',
      titleAr: 'دليل أسعار الفريلانس 2025',
      titleFr: 'Grille Tarifaire du Freelance Maroc',
      descAr: 'بيانات واقعية لمتوسط أجور اليوم (TJM) في البرمجة، التصميم، الفيديو، والميديا بايينغ حسب مستويات Junior وMid وSenior.',
      descFr: 'Baromètre des tarifs réels pratiqués au Maroc en dev, design, vidéo et marketing par niveau de séniorité.',
      badgeAr: 'محدّث 2025 📈',
      badgeFr: 'Mis à jour 2025 📈',
      badgeColor: 'purple',
      href: '/market-benchmark',
      icon: TrendingUp,
      metricAr: '6 تخصصات + مضاعف العمل مع الخارج',
      metricFr: '6 Métiers + Multiplicateur Remote'
    },
    {
      id: 'directory',
      titleAr: 'دليل البنوك وفضاءات العمل (Coworking)',
      titleFr: 'Annuaire Banques, Coworkings & Outils',
      descAr: 'مقارنة أفضل الحسابات البنكية للمقاول الذاتي، فضاءات العمل بالدار البيضاء والرباط ومراكش، وتحميل حزمة العقود المجانية.',
      descFr: 'Sélection des banques pro les plus fluides, coworkings par ville et téléchargement du pack contrats bilingue.',
      badgeAr: 'موارد حصرية 🎁',
      badgeFr: 'Ressources Offertes 🎁',
      badgeColor: 'emerald',
      href: '/directory',
      icon: Compass,
      metricAr: 'عقد عمل مغربي + Devis رسمي مجاناً',
      metricFr: 'Contrat FR/AR + Suivi Plafond Excel'
    }
  ];

  // FAQ Items
  const faqItems = [
    {
      qAr: 'هل الفاتورة الصادرة عن المقاول الذاتي مقبولة لدى الشركات المغربية الكبرى (SARL / SA)؟',
      qFr: 'Les factures Auto-Entrepreneur sont-elles acceptées par les grandes entreprises au Maroc ?',
      aAr: 'نعم، قانونياً بنسبة 100%! تُلزم المادة 89 من المدونة العامة للضرائب الشركات بقبول فواتير المقاول الذاتي المعفية من TVA، شريطة أن تتضمن رقم الـ ICE ورقم السجل الوطني وعنوان المقاول.',
      aFr: 'Oui, à 100% ! L\'article 89 du CGI oblige fiscalement les entreprises à accepter les factures d\'Auto-Entrepreneurs en franchise de TVA, sous réserve de mentionner l\'ICE et le numéro de registre national.'
    },
    {
      qAr: 'ما هو سقف رقم المعاملات السنوي المسموح به للمقاول الذاتي فالمغرب؟',
      qFr: 'Quel est le plafond annuel de chiffre d\'affaires pour l\'Auto-Entrepreneur ?',
      aAr: 'السقف القانوني هو 200,000 درهم سنوياً لقطاع الخدمات والاستشارات (Services)، و500,000 درهم سنوياً للأنشطة التجارية والصناعية واليدوية. إذا تجاوزت السقف لسنتين متتاليتين، يجب الانتقال لتأسيس شركة SARL.',
      aFr: 'Le plafond est de 200 000 MAD/an pour les prestations de services et de 500 000 MAD/an pour les activités commerciales et artisanales.'
    },
    {
      qAr: 'كيفاش نحمي راسي من الزبائن اللي كايتعطلو فـ الخلاص ولا كاينكرو الخدمة؟',
      qFr: 'Comment se protéger contre les retards et refus de paiement ?',
      aAr: 'القاعدة الذهبية: لا تبدأ أي مشروع بدون توقيع عرض الأسعار (Devis) وتسلّم تسبيق مالي (Acompte) لا يقل عن 30% إلى 50%. كما ننصح باستعمال نموذج عقد العمل المعتمد المتوفر مجاناً في منصتنا.',
      aFr: 'Règle absolue : n\'écrivez pas une ligne de code sans devis signé et acompte ferme de 30% à 50%. Utilisez notre modèle de contrat de prestation pour sécuriser la propriété intellectuelle.'
    },
    {
      qAr: 'واش نقدر نستقبل أموال بالعملة الصعبة (USD / EUR) ونخلي جزء منها فـ البنك؟',
      qFr: 'Puis-je conserver une partie de mes devises sur un compte bancaire marocain ?',
      aAr: 'نعم! يمنح مكتب الصرف (Office des Changes) للمصدرين ومقدمي الخدمات للمنصات الدولية حق فتح "حساب بالعملة الصعبة القابلة للتحويل" (Compte en devises convertible) والاحتفاظ بـ 70% من المداخيل بالدولار أو اليورو لأداء مصاريف السيرفرات والاشتراكات.',
      aFr: 'Oui ! La réglementation de l\'Office des Changes permet aux prestataires de services de loger jusqu\'à 70% de leurs devises rapatriées sur un compte professionnel en devises convertibles.'
    }
  ];

  return (
    <div className="overflow-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-500/15 via-teal-500/5 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Announcement Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-bold shadow-xs hover:scale-105 transition-transform mb-6">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {isAr ? 'الأدوات رقم 1 للفريلانسر والمقاول الذاتي فالمغرب 🇲🇦' : 'La plateforme n°1 des Indépendants au Maroc 🇲🇦'}
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-zinc-700">|</span>
            <span className="hidden sm:inline text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
              {isAr ? 'محدّث لقانون المالية 2025' : 'Mis à jour Loi de Finances 2025'}
            </span>
          </div>

          {/* Bold Main Headline */}
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

          {/* Subtitle */}
          <p className="mt-5 sm:mt-6 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            {isAr ? (
              <>
                المحراب الشامل والمجاني 100% للمقاولين الذاتيين والمستقلين في المغرب: حساب التكلفة الحقيقية (<span className="font-bold text-slate-900 dark:text-white">TJM</span>)، توليد فواتير رسمية معفية من الضريبة (<span className="font-semibold text-emerald-600 dark:text-emerald-400">Art. 89 CGI</span>)، مقارنة أرباح التحويلات الدولية، واكتشاف الزبائن المقلقين.
              </>
            ) : (
              <>
                Le command center financier et juridique des indépendants marocains : calculez votre TJM rentable, éditez vos factures légales conformes DGI (exonérées de TVA) et comparez vos virements SWIFT.
              </>
            )}
          </p>

          {/* Dual Primary Call-to-Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/tjm-calculator"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-lg shadow-emerald-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>{isAr ? 'ابدأ بحساب سعر يومك (TJM)' : 'Calculer mon TJM'}</span>
              {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>

            <Link
              href="/invoice-generator"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white font-black text-sm hover:border-emerald-500 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'إنشاء فاتورة قانونية الآن' : 'Créer une Facture'}</span>
            </Link>

            <button
              onClick={() => setIsResourceModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'حزمة العقود المجانية (FR/AR)' : 'Pack Contrats (Gratuit)'}</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2.5 justify-center">
              <div className="p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-right sm:text-center">
                <div className="text-xs font-bold text-slate-900 dark:text-white">
                  {isAr ? 'قانوني 100%' : '100% Conforme'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                  {isAr ? 'مادة 89 مدونة الضرائب' : 'Art. 89 CGI (TVA 0%)'}
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
                  {isAr ? 'بدون اشتراك أو بطاقة' : 'Sans abonnement'}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 6 DEDICATED TOOLS LAUNCH GRID ================= */}
      <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-zinc-950/40 border-y border-slate-200/80 dark:border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'الأدوات المتخصصة للمستقلين' : 'Les 6 Outils Spécifiques'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'كل ما تحتاجه لإدارة نشاطك في مكان واحد' : 'Tout pour piloter votre activité en freelance'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
              {isAr
                ? 'اضغط على أي أداة للانتقال إلى صفحتها المخصصة واستعمالها فوراً وبدون أي قيود.'
                : 'Cliquez sur n\'importe quel outil pour accéder à son interface dédiée.'}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {toolkitModules.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={tool.href}
                  className="group bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 p-6 sm:p-7 shadow-xs hover:border-emerald-500/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Badge & Metric */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {isAr ? tool.badgeAr : tool.badgeFr}
                      </span>
                      <span className="text-xs text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        ↗
                      </span>
                    </div>

                    {/* Icon & Title */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                        {isAr ? tool.titleAr : tool.titleFr}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {isAr ? tool.descAr : tool.descFr}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-150 dark:border-zinc-800 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">
                      {isAr ? tool.metricAr : tool.metricFr}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                      <span>{isAr ? 'فتح الأداة' : 'Ouvrir'}</span>
                      {isAr ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= BEFORE VS AFTER COMPARISON ================= */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isAr ? 'الفرق بين الخدمة العشوائية والاحترافية' : 'Fini l\'amateurisme : Travaillez comme une agence'}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
              {isAr
                ? 'كيف تُغيّر هذه الأدوات مسارك المهني من الضياع في الفواتير والتسعير إلى الاستقرار المالي التام.'
                : 'Passez du stress des impayés et du sous-tarif à la clarté financière et juridique.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Old Frustrating Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-black text-sm uppercase tracking-wider mb-4">
                <XCircle className="w-5 h-5" />
                <span>{isAr ? 'الطريقة العشوائية القديمة' : 'Sans FreelanceMaroc Toolkit'}</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{isAr ? 'تسعير عشوائي بدون حساب تكلفة الإنترنت والبرامج والعطل والضرائب (خدمة بالخسارة).' : 'Tarifs au pifomètre sans intégrer les charges ni congés.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{isAr ? 'العمل بدون تسبيق مالي (Acompte) وبلا عقد، ومخاطر حقيقية بعدم الأداء.' : 'Travail sur la confiance sans acompte ni contrat signé.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{isAr ? 'فواتير غير قانونية ترفضها الشركات بسبب غياب الـ ICE والإعفاء الضريبي.' : 'Factures rejetées par les PME par manque de mentions CGI.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{isAr ? 'خسارة آلاف الدراهم في عمولات الصرف الخفية للبنوك عند استقبال SWIFT.' : 'Pertes de change massives sur les virements internationaux.'}</span>
                </li>
              </ul>
            </div>

            {/* The FreelanceMaroc Toolkit Way */}
            <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-black text-sm uppercase tracking-wider mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span>{isAr ? 'مع FreelanceMaroc Toolkit' : 'Avec FreelanceMaroc Toolkit'}</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-800 dark:text-zinc-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'حساب دقيق لـ TJM مع هامش أمان 15% وتنبيه سقف المقاول الذاتي 200,000 درهم.' : 'TJM mathématique rigoureux avec marge de sécurité et suivi plafond.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'عقد عمل مغربي رسمي يحمي الملكية الفكرية ويفرض تسبيق 40% قبل بدء العمل.' : 'Contrat bilingue sécurisant acompte 40% et propriété intellectuelle.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'فواتير مقبولة قانونياً مع رقم ICE وبند المادة 89 وتفقيط المبلغ باللغة الفرنسية.' : 'Factures 100% conformes DGI avec montant arrêté en toutes lettres.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>{isAr ? 'مقارنة دقيقة للتحويلات واختيار القناة الأكثر ربحاً (Wise) لتوفير +1,200 درهم.' : 'Choix du meilleur canal de rapatriement pour gagner un maximum de MAD.'}</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section className="py-16 sm:py-20 bg-slate-50/70 dark:bg-zinc-950/40 border-t border-slate-200/80 dark:border-zinc-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{isAr ? 'أسئلة شائعة' : 'Foire Aux Questions'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {isAr ? 'كل ما يخص نظام المقاول الذاتي والضرائب فالمغرب' : 'Tout savoir sur le régime Auto-Entrepreneur au Maroc'}
            </h2>
          </div>

          <div className="space-y-3">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#121215] overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer"
                  >
                    <span>{isAr ? item.qAr : item.qFr}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed border-t border-slate-100 dark:border-zinc-800/60 pt-3">
                      {isAr ? item.aAr : item.aFr}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= BOTTOM CTA BANNER ================= */}
      <section className="py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-tr from-slate-950 via-slate-900 to-zinc-950 text-white p-8 sm:p-14 border border-slate-800 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
              {isAr ? 'مستعد ترتقي بنشاطك في الفريلانس؟' : 'Prêt à professionnaliser votre freelance ?'}
            </h2>
            <p className="mt-3 text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {isAr
                ? 'استعمل أدوات الحساب وتوليد الفواتير مجاناً وبدون تسجيل، أو حمّل حزمة العقود الرسمية المعتمدة.'
                : 'Utilisez tous les outils gratuitement et sans inscription, ou téléchargez le pack de contrats.'}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/tjm-calculator"
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-md transition-all cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{isAr ? 'فتح حاسبة TJM الآن' : 'Accéder aux outils'}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>

              <button
                onClick={() => setIsResourceModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'تحميل حزمة العقود المجانية' : 'Télécharger le Pack Contrats'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
