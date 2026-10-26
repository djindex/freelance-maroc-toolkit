'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Calculator, 
  FileText, 
  ArrowRightLeft, 
  ShieldAlert, 
  TrendingUp, 
  Compass, 
  Moon, 
  Sun, 
  Languages, 
  Download,
  Menu,
  X,
  Home
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, darkMode, toggleDarkMode, setIsResourceModalOpen } = useApp();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', labelAr: 'الرئيسية', labelFr: 'Accueil', icon: Home },
    { href: '/tjm-calculator', labelAr: 'حاسبة TJM', labelFr: 'Calculateur TJM', icon: Calculator },
    { href: '/invoice-generator', labelAr: 'مولد الفواتير', labelFr: 'Générateur Facture', icon: FileText },
    { href: '/remittance-comparator', labelAr: 'التحويلات البنكية', labelFr: 'Comparateur Virement', icon: ArrowRightLeft },
    { href: '/client-quiz', labelAr: 'مؤشر الزبون المقلق', labelFr: 'Red Flags Quiz', icon: ShieldAlert },
    { href: '/market-benchmark', labelAr: 'دليل الأسعار', labelFr: 'Tarifs Marché', icon: TrendingUp },
    { href: '/directory', labelAr: 'الدليل والموارد', labelFr: 'Annuaire & Outils', icon: Compass },
  ];

  const isAr = language === 'ar';

  return (
    <nav 
      className={`no-print sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/85 dark:bg-[#09090B]/85 backdrop-blur-md shadow-xs border-b border-slate-200 dark:border-zinc-800' 
          : 'bg-transparent border-b border-slate-200/60 dark:border-zinc-800/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-xl">🇲🇦</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-slate-900 dark:text-white text-lg tracking-tight">
                  FreelanceMaroc
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                  Toolkit
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                {isAr ? 'محراب الفريلانسر والمقاول الذاتي' : 'Command Center des Indépendants'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-1 bg-slate-100/70 dark:bg-zinc-900/70 p-1.5 rounded-full border border-slate-200/80 dark:border-zinc-800">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-white dark:bg-zinc-800 text-slate-950 dark:text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-950 dark:text-zinc-300 dark:hover:text-white hover:bg-white/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-500' : 'text-slate-500 dark:text-zinc-400'}`} />
                  <span>{isAr ? link.labelAr : link.labelFr}</span>
                </Link>
              );
            })}
          </div>

          {/* Action Tools & Preferences */}
          <div className="flex items-center gap-2">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              title={isAr ? 'Passer au Français' : 'التحويل إلى العربية'}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <Languages className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isAr ? 'Français' : 'العربية'}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title={darkMode ? 'Mode Clair' : 'Mode Sombre'}
              className="p-2 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Pack Freelance CTA Button */}
            <button
              onClick={() => setIsResourceModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm shadow-emerald-600/30 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isAr ? 'حزمة العقود المجانية' : 'Pack Contrats (Gratuit)'}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 px-2 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] space-y-1 rounded-b-2xl shadow-xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{isAr ? link.labelAr : link.labelFr}</span>
                </Link>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResourceModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl bg-emerald-600 text-white cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تحميل حزمة العقود المجانية' : 'Télécharger le Pack Contrats'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </nav>
  );
};
