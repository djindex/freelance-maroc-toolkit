import {
  MarketBenchmarkItem,
  QuizScenario,
  DirectoryItem,
  InvoiceData
} from '@/types';

// Benchmark market rates for Moroccan Freelancers (2024-2025 data)
export const MARKET_BENCHMARKS: MarketBenchmarkItem[] = [
  {
    id: 'fullstack-dev',
    roleAr: 'مطور واجهات ومواقع شامل (Full-Stack Dev)',
    roleFr: 'Développeur Full-Stack (Next.js / Node / Laravel)',
    category: 'Development',
    juniorTjm: 1200,
    midTjm: 2200,
    seniorTjm: 3800,
    juniorHourly: 160,
    midHourly: 300,
    seniorHourly: 500,
    remoteEurMultiplier: 1.8,
    inDemandSkills: ['Next.js / React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    tipsAr: 'الطلب مرتفع جداً من الشركات الناشئة الفرنسية والخليجية. ركز على بناء portfolio حي واطلب على الأقل 2,000 درهم/يوم كـ Mid-level.',
    tipsFr: 'Forte demande des startups françaises et du Golfe. Ne bradez jamais sous 2 000 MAD/j pour un profil intermédiaire avec Next.js/TypeScript.'
  },
  {
    id: 'ui-ux-design',
    roleAr: 'مصمم تجربة وواجهة المستخدم (UI/UX Designer)',
    roleFr: 'Product & UI/UX Designer (Figma)',
    category: 'Design',
    juniorTjm: 1000,
    midTjm: 1900,
    seniorTjm: 3400,
    juniorHourly: 140,
    midHourly: 250,
    seniorHourly: 450,
    remoteEurMultiplier: 1.7,
    inDemandSkills: ['Figma Pro', 'Design Systems', 'User Research', 'Interactive Prototyping', 'Mobile UI'],
    tipsAr: 'الزبائن في المغرب يفضلون من يقدم مع التصميم أسلوب Design System منظم وجاهز للمطورين. هذا يرفع تسعيرتك بنسبة 30%.',
    tipsFr: 'Les PME et agences locales valorisent énormément les Design Systems propres et le handoff dev impeccable.'
  },
  {
    id: 'mobile-dev',
    roleAr: 'مطور تطبيقات الهواتف (Flutter / React Native)',
    roleFr: 'Développeur Mobile (Flutter / React Native / iOS)',
    category: 'Development',
    juniorTjm: 1300,
    midTjm: 2400,
    seniorTjm: 4000,
    juniorHourly: 170,
    midHourly: 320,
    seniorHourly: 530,
    remoteEurMultiplier: 1.9,
    inDemandSkills: ['Flutter / Dart', 'React Native', 'Supabase / Firebase', 'App Store / Play Store Deployment', 'API REST'],
    tipsAr: 'تطوير التطبيقات يعتبر من أعلى الخدمات دخلاً في المغرب. احرص على تضمين تكلفة اشتراك متجر آبل (99$/سنة) في عرض السعر (Devis).',
    tipsFr: 'Spécialité à forte valeur ajoutée. Spécifiez toujours la maintenance post-lancement dans vos devis.'
  },
  {
    id: 'video-motion',
    roleAr: 'مونتير فيديو وموشن جرافيك (Video Editor & Motion)',
    roleFr: 'Monteur Vidéo, Reels & Motion Designer',
    category: 'Media',
    juniorTjm: 900,
    midTjm: 1700,
    seniorTjm: 2900,
    juniorHourly: 120,
    midHourly: 220,
    seniorHourly: 400,
    remoteEurMultiplier: 1.6,
    inDemandSkills: ['Premiere Pro', 'After Effects', 'Sound Design', 'Short-form Storytelling (Reels/TikTok)', 'Color Grading'],
    tipsAr: 'مع ازدهار التجارة الإلكترونية وصناع المحتوى، الفيديو القصير (Shorts / Reels) يُباع بنظام الحزمة (Pack de 10 vidéos) بأرباح ممتازة.',
    tipsFr: 'Privilégiez les forfaits mensuels récurrents (ex: 8-12 vidéos/mois) avec les marques d\'e-commerce locales.'
  },
  {
    id: 'media-buyer',
    roleAr: 'خبير إعلانات ممولة وميديا باير (Media Buyer)',
    roleFr: 'Media Buyer & Ads Specialist (Meta / Google / TikTok)',
    category: 'Marketing',
    juniorTjm: 1100,
    midTjm: 2100,
    seniorTjm: 3500,
    juniorHourly: 150,
    midHourly: 280,
    seniorHourly: 480,
    remoteEurMultiplier: 1.8,
    inDemandSkills: ['Meta Ads Manager', 'Google Ads', 'TikTok Ads', 'Pixel Tracking & CAPI', 'ROAS Optimization'],
    tipsAr: 'لا تكتفِ بتسعيرة يومية، تفاوض على Retainer شهري ثابت (مثلاً 5,000 إلى 15,000 درهم) بالإضافة إلى نسبة من العائد الإعلاني المنفق.',
    tipsFr: 'Modèle recommandé : Retainer fixe de gestion mensuelle + bonus de performance basé sur le ROAS validé.'
  },
  {
    id: 'copywriting-seo',
    roleAr: 'كاتب محتوى تسويقي وخبير سيو (Copywriter & SEO)',
    roleFr: 'Copywriter & Consultant SEO / Stratégie de Contenu',
    category: 'Writing',
    juniorTjm: 800,
    midTjm: 1500,
    seniorTjm: 2600,
    juniorHourly: 110,
    midHourly: 200,
    seniorHourly: 350,
    remoteEurMultiplier: 1.5,
    inDemandSkills: ['Direct Response Copywriting', 'SEO Technique', 'Email Marketing', 'Tone of Voice (FR/AR/EN)', 'Content Funnels'],
    tipsAr: 'النصوص باللغة الفرنسية الاحترافية والإنجليزية تحظى بطلب عالي جداً من الشركات المصدرة للخدمات (Offshoring) بالمغرب.',
    tipsFr: 'L\'anglais et le français corporate sont très recherchés par les cabinets et entreprises basés à Casa Finance City.'
  }
];

// Interactive Client Red Flag Scenarios with witty Moroccan insights
export const RED_FLAG_SCENARIOS: QuizScenario[] = [
  {
    id: 1,
    category: 'payment',
    titleAr: 'قضية التسبيق والدفعة الأولى (L\'Acompte)',
    titleFr: 'Le fameux refus d\'acompte initial',
    descriptionAr: '"بغيناك تبدا دابا الخدمة راه مزيرين، والكونطرا والدفعة الأولى (30-50%) نديروها السيمانة الجاية ملي يرجع المدير من السفر."',
    descriptionFr: '"Commence tout de suite stp on est pressés, l\'acompte sera viré la semaine prochaine dès le retour du patron de voyage."',
    options: [
      {
        labelAr: 'لا، طلب 50% تسبيق رسمي قبل كتابة أي سطر كود أو تصميم',
        labelFr: 'Exige un acompte strict de 30-50% avant tout coup de souris',
        points: 0
      },
      {
        labelAr: 'كيقول غايبدا في جزء صغير ويصيفطه كـ Watermark خفيف',
        labelFr: 'Commence une maquette légère avec watermark sans livrer les sources',
        points: 12
      },
      {
        labelAr: 'كيوافق يبدا المشروع كامل بالنية وبلا حتى ريال مسبق!',
        labelFr: 'Accepte de livrer le projet complet "sur la confiance" sans acompte',
        points: 25
      }
    ]
  },
  {
    id: 2,
    category: 'communication',
    titleAr: 'توقيت التواصل والفوكالات (Late Night WhatsApp)',
    titleFr: 'Messages et vocaux nocturnes sans limite',
    descriptionAr: 'كيصيفط فوكال في الواتساب مع 23:45 بالليل: "فين وصل داكشي؟ زرب ليا عليها الله يحفظك عافاك راه الصباح باغي نعرضها على الشركاء."',
    descriptionFr: 'Vocal WhatsApp à 23h45 : "Fin wsel dakchi ? Stp livre-moi ça vite avant demain matin 8h."',
    options: [
      {
        labelAr: 'التواصل محدد في منصات احترافية وساعات العمل الرسمية فقط',
        labelFr: 'Horaires stricts et communication sur Slack / Mail pro',
        points: 0
      },
      {
        labelAr: 'كيصيفط رسائل أحياناً في العطلة ولكن كيحشم شوية',
        labelFr: 'Envoie des messages le week-end mais s\'excuse poliment',
        points: 10
      },
      {
        labelAr: 'واتساب متاح 24/7 ومكالمات فيديو مفاجئة بدون موعد مسبق',
        labelFr: 'Disponible 24h/24, appels audio imprévus et vocaux à minuit',
        points: 25
      }
    ]
  },
  {
    id: 3,
    category: 'scope',
    titleAr: 'الاستسهال والتقزيم ("خدمة ديال 10 دقائق")',
    titleFr: 'Minimisation du travail ("C\'est 10 minutes max")',
    descriptionAr: '"راه خدمة خفيفة ومغاتاخدش منك حتى 20 دقيقة، صاوبها دغيا ودير معانا الثمن حيت عندنا مشاريع صحيحة من بعد غانعطيوها ليك."',
    descriptionFr: '"C\'est une retouche rapide de 10 min, fais un geste sur le prix et on a plein d\'autres projets énormes pour toi après."',
    options: [
      {
        labelAr: 'التسعير مبني على القيمة والجهد الفعلي وليس على افتراضات الزبون',
        labelFr: 'Tarification basée sur la valeur réelle et cahier des charges précis',
        points: 0
      },
      {
        labelAr: 'كيطلب تخفيض خفيف مع وعد غير مكتوب بمشاريع مستقبلية',
        labelFr: 'Demande une petite remise avec promesse floue de projets futurs',
        points: 10
      },
      {
        labelAr: 'كيقنعك تخدم بأقل من نصف ثمنك حيت "راه غي كليك بالماوس"',
        labelFr: 'Vous convainc de diviser votre tarif par deux car "c\'est 3 clics"',
        points: 25
      }
    ]
  },
  {
    id: 4,
    category: 'payment',
    titleAr: 'المقابل الوهمي ("الفيزا ديال الـ Exposure")',
    titleFr: 'Paiement en visibilité et "Exposure"',
    descriptionAr: '"مغانعطيوكش ميزانية دابا، ولكن غانوفروا ليك Exposure خطير في حساباتنا والشهرة اللي غاتربح تساوي ملايين."',
    descriptionFr: '"On n\'a pas de cash maintenant mais on va te taguer sur nos réseaux, ça va te faire une pub de dingue !"',
    options: [
      {
        labelAr: 'رفض قاطع: "البقال والبنوك فالمغرب ماكيخلصوش بالـ Exposure"',
        labelFr: 'Refus catégorique : "Mon loyer et mes charges ne se paient pas en visibilité"',
        points: 0
      },
      {
        labelAr: 'تخفيض رمزي مقابل شهادة وتوصية رسمية في لينكدإن (Recommandation)',
        labelFr: 'Remise symbolique contre contrat écrit de recommandation LinkedIn / Case study',
        points: 10
      },
      {
        labelAr: 'الموافقة على العمل المجاني على أمل أن يراك زبون غني يوماً ما',
        labelFr: 'Travailler gratuitement en espérant qu\'un client payant vous remarque',
        points: 25
      }
    ]
  },
  {
    id: 5,
    category: 'scope',
    titleAr: 'فخ التعديلات اللانهائية (Scope Creep)',
    titleFr: 'Le piège des allers-retours infinis',
    descriptionAr: '"غي صاوب اللي بان ليك وغانشوفو مع الفريق... ومن بعد كيطلب تغيير الفكرة كاملة للمرة السادسة ويقولك ماعجباتش المدير."',
    descriptionFr: '"Fais ce que tu veux on verra... puis demande la 7ème refonte totale car la femme du boss préfère le violet."',
    options: [
      {
        labelAr: 'العقد يحدد جولتَي تعديل فقط (2 Rounds of Revisions)، وأي تغيير إضافي يُفوتر بسعر الساعة',
        labelFr: 'Contrat limitant à 2 cycles de retouches, tout extra facturé au TJM horaire',
        points: 0
      },
      {
        labelAr: 'تعديلات كثيرة بدون كتابة واضحة لكن يتقبل المناقشة الودية',
        labelFr: 'Retouches fréquentes mais accepte de payer un petit complément à l\'amiable',
        points: 10
      },
      {
        labelAr: 'تعديلات لا نهائية في التصميم والبرمجة حتى تفقد الرغبة في الحياة!',
        labelFr: 'Refontes infinies à volonté sans surcoût, burnout garanti',
        points: 25
      }
    ]
  },
  {
    id: 6,
    category: 'legal',
    titleAr: 'التهرب من الفاتورة والقانون ("خدمة بالنوار")',
    titleFr: 'Refus de facture légale ("Sous la table")',
    descriptionAr: '"واش ضروري فاتورة وICE؟ دير معانا غي بالنوار وكاش بلا ما تصدع راسك مع الضرائب والمقاول الذاتي."',
    descriptionFr: '"Est-ce obligatoire de faire une facture avec ICE ? Faisons ça en noir sans paperasse."',
    options: [
      {
        labelAr: 'إصرار تام: الفاتورة والـ ICE والعقد هو الحامي القانوني الوحيد لمستحقاتك',
        labelFr: 'Facture légale systématique avec ICE pour garantir la preuve juridique',
        points: 0
      },
      {
        labelAr: 'يقبل الفاتورة بعد إقناعه بأن المقاول الذاتي معفى من TVA (Art. 89)',
        labelFr: 'Accepte la facture après explication de l\'exonération de TVA (Art. 89 CGI)',
        points: 8
      },
      {
        labelAr: 'العمل بدون أي ورقة تثبت أنك اشتغلت معهم أصلاً',
        labelFr: 'Travail 100% informel sans devis ni facture : risque total de non-paiement',
        points: 25
      }
    ]
  }
];

// Directory items: Moroccan Banks, Coworkings, and Tools
export const DIRECTORY_ITEMS: DirectoryItem[] = [
  // Banks
  {
    id: 'cih-bank',
    name: 'CIH Bank - Code 30 / Auto-Entrepreneur',
    category: 'bank',
    logoPlaceholder: 'CIH',
    badge: 'الأكثر شعبية للشباب',
    descriptionAr: 'حساب بنكي سريع ومناسب للمقاول الذاتي، تطبيق جوال سلس وتحويلات فورية مجانية بين البنوك المغربية.',
    descriptionFr: 'Compte très populaire parmi les jeunes indépendants. Application fluide et virements instantanés.',
    pricingOrFeatures: 'مجاني للشباب / رسوم منخفضة للحساب التجاري',
    ctaTextAr: 'تفاصيل الحساب',
    ctaTextFr: 'Détails du compte',
    link: 'https://www.cihbank.ma'
  },
  {
    id: 'attijariwafa-bank',
    name: 'Attijariwafa Bank - L\'Bankalik Pro',
    category: 'bank',
    logoPlaceholder: 'AWB',
    badge: 'أكبر شبكة فروع',
    descriptionAr: 'قوة بنكية مع بطاقات ائتمانية دولية سقفها مرتفع للمشتريات التقنية وسيرفرات البرمجة.',
    descriptionFr: 'Leader bancaire marocain, excellente gestion des dotations e-commerce pour outils et serveurs.',
    pricingOrFeatures: 'بطاقة دولية مخصصة للـ E-commerce والتجارة',
    ctaTextAr: 'موقع التجاري وفا',
    ctaTextFr: 'Visiter AWB',
    link: 'https://www.attijariwafabank.com'
  },
  {
    id: 'cfg-bank',
    name: 'CFG Bank - Premium Digital',
    category: 'bank',
    logoPlaceholder: 'CFG',
    badge: 'خدمة سريعة VIP',
    descriptionAr: 'أفضل خدمة عملاء وسرعة استثنائية في استقبال الحوالات البنكية الدولية SWIFT وربط حسابات Wise/Payoneer.',
    descriptionFr: 'Service client haut de gamme, virements internationaux SWIFT ultra rapides.',
    pricingOrFeatures: 'تجربة رقمية بدون طوابير انتظار',
    ctaTextAr: 'فتح حساب CFG',
    ctaTextFr: 'Découvrir CFG',
    link: 'https://www.cfgbank.com'
  },
  // Coworking Spaces
  {
    id: 'technopark-casa',
    name: 'Technopark (Casablanca / Rabat / Tanger / Agadir)',
    city: 'Casablanca & Multi-villes',
    category: 'coworking',
    logoPlaceholder: 'TECH',
    badge: 'الحاضنة الوطنية 🇲🇦',
    descriptionAr: 'المقر المفضل للشركات الناشئة والمقاولين في المغرب، بيئة تقنية مع فايبر سريع وإمكانية التوطين القانوني (Domiciliation).',
    descriptionFr: 'Hub technologique national. Fibre haut débit, domiciliation d\'entreprise et écosystème startup.',
    pricingOrFeatures: 'ابتداءً من 800 درهم/شهر (مساحات مرنة وتوطين)',
    ctaTextAr: 'حجز جولة',
    ctaTextFr: 'Réserver une visite',
    link: 'https://www.technopark.ma'
  },
  {
    id: 'the-commons-casa',
    name: 'The Commons Coworking',
    city: 'Casablanca (Gauthier & Anfa)',
    category: 'coworking',
    logoPlaceholder: 'COMM',
    badge: 'بريميوم سنتر',
    descriptionAr: 'فضاء عصري أنيق في قلب كازابلانكا، غرف اجتماعات مكيفة، قهوة ممتازة ومجتمع من رواد الأعمال والمستثمرين.',
    descriptionFr: 'Espaces haut de gamme au cœur de Gauthier, salles de réunion équipées et communauté active.',
    pricingOrFeatures: 'ابتداءً من 1,500 درهم/شهر أو تذكرة يومية (Pass Journée)',
    ctaTextAr: 'الموقع الرسمي',
    ctaTextFr: 'Voir les tarifs',
    link: 'https://thecommons.ma'
  },
  {
    id: 'lblassa-kech',
    name: 'L\'Blassa Coworking',
    city: 'Marrakech (Guéliz)',
    category: 'coworking',
    logoPlaceholder: 'BLAS',
    badge: 'مراكش للفريلانسرز',
    descriptionAr: 'واحة عمل هادئة في حي جيليز بمراكش، مجهزة بإنترنت فايبر عالي السرعة وروف-توب للاستراحة وشبكة من الرحالة الرقميين.',
    descriptionFr: 'Oasis de coworking à Guéliz, fibre optique, rooftop et networking nomades digitaux.',
    pricingOrFeatures: 'من 120 درهم/يوم أو 1,200 درهم/شهر',
    ctaTextAr: 'استكشاف الفضاء',
    ctaTextFr: 'Découvrir',
    link: 'https://lblassa.com'
  },
  // Tools & Monetization Slots
  {
    id: 'wise-transfer',
    name: 'Wise Business (TransferWise)',
    category: 'tool',
    logoPlaceholder: 'WISE',
    badge: 'أفضل سعر صرف',
    descriptionAr: 'الحل الأمثل لاستقبال أموال الزبائن من أمريكا وأوروبا باليورو والدولار، ثم تحويلها لحسابك البنكي المغربي بأقل عمولة ممكنة.',
    descriptionFr: 'Recevez des paiements en devises (USD, EUR, GBP) avec le taux de change réel du marché.',
    pricingOrFeatures: 'توفير حتى 80% من عمولات التحويل التقليدي SWIFT',
    ctaTextAr: 'فتح حساب معتمد',
    ctaTextFr: 'Ouvrir un compte',
    link: 'https://wise.com',
    sponsored: true
  },
  {
    id: 'moroccan-ae-portal',
    name: 'البوابة الوطنية للمقاول الذاتي (RNAE)',
    category: 'tool',
    logoPlaceholder: 'DGI',
    badge: 'رسمي حكومي',
    descriptionAr: 'الموقع الرسمي للجمهورية للتسجيل في السجل الوطني للمقاول الذاتي وتصريح المداخيل الضريبية كل 3 أشهر.',
    descriptionFr: 'Portail officiel pour déclarer votre chiffre d\'affaires trimestriel et payer l\'impôt sur le revenu.',
    pricingOrFeatures: 'مجاني - إلزامي كل ثلاثة أشهر (Trimestre)',
    ctaTextAr: 'دخول البوابة الرسمية',
    ctaTextFr: 'Accéder au RNAE',
    link: 'https://rn.ae.gov.ma'
  }
];

// Initial preset data for Invoice Generator
export const SAMPLE_INVOICE_DATA: InvoiceData = {
  freelancer: {
    fullName: 'أمين العلمي (Amine El Alami)',
    jobTitle: 'Consultant Full-Stack & UI/UX Designer',
    aeNumber: 'AE-2023-784920',
    ice: '003291847000084',
    taxId: '54829103',
    patente: '38291045',
    city: 'الدار البيضاء (Casablanca)',
    address: 'Boulevard d\'Anfa, Résidence Al Manar 4, Appt 12',
    phone: '+212 6 61 23 45 67',
    email: 'amine.elalami@freelancemaroc.dev',
    bankName: 'Attijariwafa Bank',
    rib: '007 780 0001234567890123 45'
  },
  client: {
    companyName: 'Atlas Digital Solutions SARL AU',
    ice: '002847192000031',
    address: 'Angle Boulevard Zerktouni et Rue Jean Jaurès, 3ème étage',
    city: 'Casablanca, Maroc',
    contactPerson: 'M. Karim Berrada (Directeur Général)',
    email: 'contact@atlasdigitalsolutions.ma'
  },
  invoiceDetails: {
    invoiceNumber: 'FAC-2025-014',
    issueDate: '2025-02-15',
    dueDate: '2025-03-02',
    paymentMethod: 'Virement Bancaire',
    isVatExempt: true,
    includeLateFeeClause: true,
    currency: 'MAD',
    notes: 'Veuillez mentionner le numéro de facture sur le motif du virement bancaire. RIB joint en bas de page.'
  },
  items: [
    {
      id: 'item-1',
      description: 'Conception UI/UX et prototypage interactif Figma (Application Web & Mobile SaaS) - 8 jours',
      quantity: 8,
      unitPrice: 2400,
      total: 19200
    },
    {
      id: 'item-2',
      description: 'Intégration Frontend Next.js 15, Tailwind CSS, API REST & Tests d\'accessibilité - 6 jours',
      quantity: 6,
      unitPrice: 2800,
      total: 16800
    },
    {
      id: 'item-3',
      description: 'Session de formation de l\'équipe interne et documentation technique de déploiement',
      quantity: 1,
      unitPrice: 3500,
      total: 3500
    }
  ]
};
