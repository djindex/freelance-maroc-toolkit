'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LeadMagnetsAndDirectory } from '@/components/LeadMagnetsAndDirectory';
import { useApp } from '@/context/AppContext';
import { Calculator, FileText, ArrowRightLeft, ShieldAlert, Download, Home } from 'lucide-react';

export const LayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, isResourceModalOpen, setIsResourceModalOpen } = useApp();
  const pathname = usePathname();
  const isAr = language === 'ar';

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-140px)]">
        {children}
      </main>

      <Footer />

      {/* Hidden container for the Pack Modal */}
      <div className="no-print">
        <LeadMagnetsAndDirectory
          language={language}
          isModalOpen={isResourceModalOpen}
          setIsModalOpen={setIsResourceModalOpen}
          onlyModal={true}
        />
      </div>

      {/* Mobile Sticky Quick Action Bar */}
      <div className="no-print xl:hidden fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl px-2 py-1.5 flex items-center justify-between">
        <Link
          href="/"
          className={`flex flex-col items-center p-1.5 text-[10px] font-bold transition-colors ${
            pathname === '/' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-zinc-400'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>{isAr ? 'الرئيسية' : 'Accueil'}</span>
        </Link>

        <Link
          href="/tjm-calculator"
          className={`flex flex-col items-center p-1.5 text-[10px] font-bold transition-colors ${
            pathname === '/tjm-calculator' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-zinc-400'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>TJM</span>
        </Link>

        <Link
          href="/invoice-generator"
          className={`flex flex-col items-center p-1.5 text-[10px] font-bold transition-colors ${
            pathname === '/invoice-generator' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-zinc-400'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{isAr ? 'فاتورة' : 'Facture'}</span>
        </Link>

        <Link
          href="/remittance-comparator"
          className={`flex flex-col items-center p-1.5 text-[10px] font-bold transition-colors ${
            pathname === '/remittance-comparator' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-zinc-400'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>{isAr ? 'تحويلات' : 'Devises'}</span>
        </Link>

        <Link
          href="/client-quiz"
          className={`flex flex-col items-center p-1.5 text-[10px] font-bold transition-colors ${
            pathname === '/client-quiz' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-zinc-400'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>{isAr ? 'كويز' : 'Quiz'}</span>
        </Link>

        <button
          onClick={() => setIsResourceModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-[11px] font-extrabold shadow-sm active:scale-95 cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isAr ? 'العقود' : 'Pack'}</span>
        </button>
      </div>
    </>
  );
};
