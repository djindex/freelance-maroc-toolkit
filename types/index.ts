export type Language = 'ar' | 'fr';

export interface TjmInputs {
  desiredNetMonthly: number; // MAD
  monthlyOverhead: {
    coworking: number;
    internet: number;
    software: number;
    equipment: number;
    other: number;
  };
  vacationWeeks: number; // e.g. 4
  bankHolidays: number; // e.g. 10
  billableHoursPercent: number; // 30% - 70%, default 50%
  taxTier: 'services' | 'commercial'; // 1% for services, 0.5% for commercial
  cnssMonthly: number; // Flat AMO contribution, default 150 MAD
  safetyBufferPercent: number; // default 15%
}

export interface TjmCalculationResult {
  annualNetDesired: number;
  annualOverheads: number;
  annualCnss: number;
  workingWeeksPerYear: number;
  workingDaysPerYear: number;
  billableHoursPerYear: number;
  billableDaysPerYear: number;
  breakevenHourly: number;
  recommendedHourly: number;
  breakevenDaily: number;
  recommendedDaily: number; // TJM
  annualGrossTurnover: number;
  annualTax: number;
  isCeilingWarning: boolean;
  ceilingLimit: number;
  eurDailyEquivalent: number;
  usdDailyEquivalent: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  freelancer: {
    fullName: string;
    jobTitle: string;
    aeNumber: string; // N° Registre National Auto-Entrepreneur
    ice: string; // 15 digits
    taxId: string; // IF
    patente: string; // Taxe Professionnelle
    city: string;
    address: string;
    phone: string;
    email: string;
    bankName: string;
    rib: string; // 24 digits
  };
  client: {
    companyName: string;
    ice: string;
    address: string;
    city: string;
    contactPerson: string;
    email: string;
  };
  invoiceDetails: {
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    paymentMethod: 'Virement Bancaire' | 'Chèque' | 'Espèces' | 'Virement / SWIFT';
    isVatExempt: boolean; // Article 89 CGI
    includeLateFeeClause: boolean; // Loi 69-21
    currency: 'MAD';
    notes: string;
  };
  items: InvoiceItem[];
}

export type RemittanceCurrency = 'USD' | 'EUR';

export interface RemittanceChannelResult {
  channelId: string;
  name: string;
  logo: string;
  badge?: string;
  exchangeRateApplied: number;
  officialRate: number;
  spreadLossMad: number;
  fixedFeesMad: number;
  netMadReceived: number;
  processingTime: string;
  reliabilityScore: number; // out of 5
  description: string;
  isBestValue: boolean;
}

export interface QuizScenario {
  id: number;
  titleAr: string;
  titleFr: string;
  descriptionAr: string;
  descriptionFr: string;
  options: {
    labelAr: string;
    labelFr: string;
    points: number; // 0 = Safe, 10 = Warning, 25 = Huge Red Flag
  }[];
  category: 'payment' | 'communication' | 'scope' | 'legal';
}

export interface MarketBenchmarkItem {
  id: string;
  roleAr: string;
  roleFr: string;
  category: 'Development' | 'Design' | 'Marketing' | 'Media' | 'Writing';
  juniorTjm: number; // 0-2 yrs in MAD
  midTjm: number; // 2-5 yrs in MAD
  seniorTjm: number; // 5+ yrs in MAD
  juniorHourly: number;
  midHourly: number;
  seniorHourly: number;
  remoteEurMultiplier: number;
  inDemandSkills: string[];
  tipsAr: string;
  tipsFr: string;
}

export interface DirectoryItem {
  id: string;
  name: string;
  city?: string;
  category: 'bank' | 'coworking' | 'tool';
  logoPlaceholder: string;
  descriptionAr: string;
  descriptionFr: string;
  pricingOrFeatures: string;
  badge?: string;
  ctaTextAr: string;
  ctaTextFr: string;
  link: string;
  sponsored?: boolean;
}
