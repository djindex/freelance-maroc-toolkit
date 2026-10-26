'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  Download, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Building2, 
  User, 
  CreditCard,
  Save,
  Share2
} from 'lucide-react';
import { InvoiceData, InvoiceItem } from '@/types';
import { SAMPLE_INVOICE_DATA } from '@/lib/data';
import { numberToWordsFrench } from '@/lib/numberToWordsFrench';
import confetti from 'canvas-confetti';

interface InvoiceGeneratorProps {
  language: 'ar' | 'fr';
  incomingTjmRate?: number | null;
}

export const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({
  language,
  incomingTjmRate
}) => {
  const isAr = language === 'ar';

  const [invoice, setInvoice] = useState<InvoiceData>(SAMPLE_INVOICE_DATA);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Load from local storage if available on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('freelance_maroc_invoice_data');
      if (saved) {
        setInvoice(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  // If incoming TJM rate was applied from the calculator, update the first item or add new item
  useEffect(() => {
    if (incomingTjmRate && incomingTjmRate > 0) {
      setInvoice(prev => {
        const updatedItems = [...prev.items];
        if (updatedItems.length > 0) {
          updatedItems[0] = {
            ...updatedItems[0],
            unitPrice: incomingTjmRate,
            total: updatedItems[0].quantity * incomingTjmRate
          };
        }
        return { ...prev, items: updatedItems };
      });
    }
  }, [incomingTjmRate]);

  // Totals
  const subtotal = useMemo(() => {
    return invoice.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  }, [invoice.items]);

  const totalInWords = useMemo(() => {
    return numberToWordsFrench(subtotal);
  }, [subtotal]);

  // Line item handlers
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
    const updated = [...invoice.items];
    const current = { ...updated[index], [field]: value };
    if (field === 'quantity' || field === 'unitPrice') {
      const qty = field === 'quantity' ? Number(value) || 0 : current.quantity;
      const price = field === 'unitPrice' ? Number(value) || 0 : current.unitPrice;
      current.total = qty * price;
    }
    updated[index] = current;
    setInvoice({ ...invoice, items: updated });
  };

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Math.random().toString(36).substring(2, 9)}`,
      description: 'Prestation de service / Développement / Design',
      quantity: 1,
      unitPrice: incomingTjmRate || 2500,
      total: incomingTjmRate || 2500
    };
    setInvoice({ ...invoice, items: [...invoice.items, newItem] });
  };

  const handleRemoveItem = (index: number) => {
    if (invoice.items.length <= 1) return;
    const updated = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: updated });
  };

  const handleSaveToLocalStorage = () => {
    try {
      localStorage.setItem('freelance_maroc_invoice_data', JSON.stringify(invoice));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      // ignore
    }
  };

  const handleResetSample = () => {
    setInvoice(SAMPLE_INVOICE_DATA);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="invoice-generator" className="py-12 sm:py-16 border-t border-slate-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 no-print">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-3 border border-emerald-300 dark:border-emerald-800">
            <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isAr ? 'مولّد الفواتير الرسمي للمقاول الذاتي' : 'Générateur de Facture Officielle Auto-Entrepreneur'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isAr ? 'فاتورة قانونية مطابقة 100% لمعايير الضرائب DGI' : 'Facture Conforme aux Normes Fiscales Marocaines'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400">
            {isAr
              ? 'تتضمن تلقائياً رقم الـ ICE، السجل الوطني، الإعفاء الضريبي (المادة 89)، وتفقيط المبلغ باللغة الفرنسية القانونية.'
              : 'Générez des factures professionnelles avec ICE, mention obligatoire de TVA (Art. 89 CGI) et montant arrêté en toutes lettres.'}
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 active:scale-95 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>{isAr ? 'طباعة / حفظ كـ PDF' : 'Imprimer / Enregistrer en PDF'}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveToLocalStorage}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-700 transition-all cursor-pointer"
            >
              {saveSuccess ? <Check className="w-4 h-4 text-emerald-500" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? (isAr ? 'تم الحفظ في جهازك!' : 'Enregistré !') : (isAr ? 'حفظ البيانات' : 'Sauvegarder')}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetSample}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isAr ? 'استعادة النموذج التجريبي' : 'Restaurer exemple'}</span>
            </button>
          </div>
        </div>

        {/* Main Workspace: Split-screen (Form on Left / Official Live Preview on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= FORM INPUTS (5 Cols) ================= */}
          <div className="no-print lg:col-span-5 bg-white dark:bg-[#121215] rounded-3xl border border-slate-200 dark:border-zinc-800 p-5 sm:p-6 space-y-6 shadow-xs max-h-[1100px] overflow-y-auto">
            
            {/* 1. Freelancer Details */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>{isAr ? '1. معلومات المقاول الذاتي (البائع)' : '1. Vos Coordonnées (Auto-Entrepreneur)'}</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'الاسم الكامل أو التجاري' : 'Nom & Prénom / Titre pro'}</label>
                  <input
                    type="text"
                    value={invoice.freelancer.fullName}
                    onChange={(e) => setInvoice({
                      ...invoice,
                      freelancer: { ...invoice.freelancer, fullName: e.target.value }
                    })}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-600 dark:text-zinc-400 font-medium">ICE (15 أرقام)</label>
                    <input
                      type="text"
                      maxLength={15}
                      value={invoice.freelancer.ice}
                      onChange={(e) => setInvoice({
                        ...invoice,
                        freelancer: { ...invoice.freelancer, ice: e.target.value }
                      })}
                      className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-zinc-400 font-medium">N° Registre AE</label>
                    <input
                      type="text"
                      value={invoice.freelancer.aeNumber}
                      onChange={(e) => setInvoice({
                        ...invoice,
                        freelancer: { ...invoice.freelancer, aeNumber: e.target.value }
                      })}
                      className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-600 dark:text-zinc-400 font-medium">IF (الضريبة)</label>
                    <input
                      type="text"
                      value={invoice.freelancer.taxId}
                      onChange={(e) => setInvoice({
                        ...invoice,
                        freelancer: { ...invoice.freelancer, taxId: e.target.value }
                      })}
                      className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-zinc-400 font-medium">Patente (المهنية)</label>
                    <input
                      type="text"
                      value={invoice.freelancer.patente}
                      onChange={(e) => setInvoice({
                        ...invoice,
                        freelancer: { ...invoice.freelancer, patente: e.target.value }
                      })}
                      className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'الهاتف' : 'Téléphone'}</label>
                    <input
                      type="text"
                      value={invoice.freelancer.phone}
                      onChange={(e) => setInvoice({
                        ...invoice,
                        freelancer: { ...invoice.freelancer, phone: e.target.value }
                      })}
                      className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
                    <input
                      type="email"
                      value={invoice.freelancer.email}
                      onChange={(e) => setInvoice({
                        ...invoice,
                        freelancer: { ...invoice.freelancer, email: e.target.value }
                      })}
                      className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'الحساب البنكي المغربي (RIB 24 chiffres)' : 'RIB Bancaire (24 chiffres)'}</label>
                  <input
                    type="text"
                    value={invoice.freelancer.rib}
                    onChange={(e) => setInvoice({
                      ...invoice,
                      freelancer: { ...invoice.freelancer, rib: e.target.value }
                    })}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Client Details */}
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{isAr ? '2. معلومات الزبون (المشتري)' : '2. Coordonnées du Client'}</span>
              </h3>
              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'اسم الشركة أو الزبون' : 'Raison Sociale / Nom du Client'}</label>
                  <input
                    type="text"
                    value={invoice.client.companyName}
                    onChange={(e) => setInvoice({
                      ...invoice,
                      client: { ...invoice.client, companyName: e.target.value }
                    })}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-600 dark:text-zinc-400 font-medium">ICE du Client</label>
                    <input
                      type="text"
                      maxLength={15}
                      value={invoice.client.ice}
                      onChange={(e) => setInvoice({
                        ...invoice,
                        client: { ...invoice.client, ice: e.target.value }
                      })}
                      className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white font-mono text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'الشخص المسؤول' : 'Interlocuteur'}</label>
                    <input
                      type="text"
                      value={invoice.client.contactPerson}
                      onChange={(e) => setInvoice({
                        ...invoice,
                        client: { ...invoice.client, contactPerson: e.target.value }
                      })}
                      className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'عنوان المقر والمدينة' : 'Adresse & Ville'}</label>
                  <input
                    type="text"
                    value={invoice.client.address}
                    onChange={(e) => setInvoice({
                      ...invoice,
                      client: { ...invoice.client, address: e.target.value }
                    })}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* 3. Invoice Number & Dates */}
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800">
              <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" />
                <span>{isAr ? '3. بيانات وتواريخ الفاتورة' : '3. Dates & Modalités'}</span>
              </h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'رقم الفاتورة' : 'N° Facture'}</label>
                  <input
                    type="text"
                    value={invoice.invoiceDetails.invoiceNumber}
                    onChange={(e) => setInvoice({
                      ...invoice,
                      invoiceDetails: { ...invoice.invoiceDetails, invoiceNumber: e.target.value }
                    })}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'تاريخ الإصدار' : 'Émission'}</label>
                  <input
                    type="date"
                    value={invoice.invoiceDetails.issueDate}
                    onChange={(e) => setInvoice({
                      ...invoice,
                      invoiceDetails: { ...invoice.invoiceDetails, issueDate: e.target.value }
                    })}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white text-[11px]"
                  />
                </div>
                <div>
                  <label className="text-slate-600 dark:text-zinc-400 font-medium">{isAr ? 'تاريخ الاستحقاق' : 'Échéance'}</label>
                  <input
                    type="date"
                    value={invoice.invoiceDetails.dueDate}
                    onChange={(e) => setInvoice({
                      ...invoice,
                      invoiceDetails: { ...invoice.invoiceDetails, dueDate: e.target.value }
                    })}
                    className="mt-1 w-full p-2 rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-900 text-slate-900 dark:text-white text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* 4. Line Items */}
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {isAr ? '4. بنود الخدمة والمشاريع' : '4. Prestations & Tarifs'}
                </h3>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isAr ? 'إضافة بند' : 'Ajouter ligne'}</span>
                </button>
              </div>

              <div className="space-y-3">
                {invoice.items.map((item, idx) => (
                  <div key={item.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-slate-400">#{idx + 1}</span>
                      <input
                        type="text"
                        placeholder="Description du service..."
                        value={item.description}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        className="w-full text-xs p-1.5 rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                      />
                      {invoice.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="p-1 text-slate-400 hover:text-red-500 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <div className="w-1/3">
                        <label className="text-[10px] text-slate-500">{isAr ? 'الكمية/أيام' : 'Quantité/Jours'}</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                          className="w-full p-1 rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div className="w-1/3">
                        <label className="text-[10px] text-slate-500">{isAr ? 'السعر (MAD)' : 'Prix Unitaire'}</label>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(idx, 'unitPrice', e.target.value)}
                          className="w-full p-1 rounded-md border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white font-bold"
                        />
                      </div>
                      <div className="w-1/3 text-right">
                        <label className="text-[10px] text-slate-500">{isAr ? 'المجموع' : 'Total Ligne'}</label>
                        <div className="font-extrabold text-emerald-600 dark:text-emerald-400 p-1">
                          {item.total.toLocaleString()} MAD
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Legal Checkbox (Article 89 CGI) */}
            <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-2">
              <label className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={invoice.invoiceDetails.isVatExempt}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    invoiceDetails: { ...invoice.invoiceDetails, isVatExempt: e.target.checked }
                  })}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>
                  <strong>{isAr ? 'بند الإعفاء الضريبي الإلزامي' : 'Mention obligatoire TVA'} :</strong>{' '}
                  <span className="text-[11px] text-slate-500 dark:text-zinc-400 block">
                    « Exonéré de la TVA en vertu de l'article 89 du Code Général des Impôts (Régime Auto-Entrepreneur) »
                  </span>
                </span>
              </label>

              <label className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={invoice.invoiceDetails.includeLateFeeClause}
                  onChange={(e) => setInvoice({
                    ...invoice,
                    invoiceDetails: { ...invoice.invoiceDetails, includeLateFeeClause: e.target.checked }
                  })}
                  className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>
                  <strong>{isAr ? 'بند التأخر في السداد (Loi 69-21)' : 'Indemnités légales de retard'} :</strong>{' '}
                  <span className="text-[11px] text-slate-500 dark:text-zinc-400 block">
                    Conforme à la loi marocaine n° 69-21 sur les délais de paiement.
                  </span>
                </span>
              </label>
            </div>

          </div>

          {/* ================= OFFICIAL LIVE PREVIEW (7 Cols) ================= */}
          <div className="lg:col-span-7 print-area w-full">
            
            {/* The Paper Document (Strictly Printed Element - LTR for official French Moroccan standard) */}
            <div 
              id="invoice-paper-sheet"
              dir="ltr"
              className="bg-white text-slate-900 rounded-3xl border border-slate-200 dark:border-zinc-800 p-8 sm:p-10 print:p-6 print:rounded-lg print:border print:border-slate-300 print:shadow-none print:min-h-0 print:m-0 print:w-full shadow-xl relative min-h-[850px] flex flex-col justify-between text-left"
            >
              
              <div>
                
                {/* Header Top: Moroccan AE Badge & Invoice Tag */}
                <div className="flex items-start justify-between pb-6 border-b border-slate-200">
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {invoice.freelancer.fullName}
                    </div>
                    <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {invoice.freelancer.jobTitle || 'Prestataire de Services Indépendant'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-2 space-y-0.5">
                      <div>ICE : <span className="font-mono font-bold text-slate-700">{invoice.freelancer.ice || '---'}</span></div>
                      <div>N° Registre AE : <span className="font-mono text-slate-700">{invoice.freelancer.aeNumber || '---'}</span></div>
                      <div>IF : {invoice.freelancer.taxId || '---'} | Patente : {invoice.freelancer.patente || '---'}</div>
                      <div>{invoice.freelancer.address} - {invoice.freelancer.city}</div>
                      <div>Tél : {invoice.freelancer.phone} | {invoice.freelancer.email}</div>
                    </div>
                  </div>

                  {/* Facture Number Box */}
                  <div className="text-right">
                    <div className="inline-block px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 font-extrabold text-sm tracking-wider uppercase">
                      FACTURE
                    </div>
                    <div className="text-lg font-black font-mono text-slate-900 mt-1">
                      {invoice.invoiceDetails.invoiceNumber}
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                      <div>Date : <strong className="text-slate-800">{invoice.invoiceDetails.issueDate}</strong></div>
                      <div>Échéance : <strong className="text-slate-800">{invoice.invoiceDetails.dueDate}</strong></div>
                    </div>
                  </div>
                </div>

                {/* Client Block (Facturé à) */}
                <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    FACTURÉ À (CLIENT) :
                  </div>
                  <div className="text-base font-extrabold text-slate-900 mt-1">
                    {invoice.client.companyName}
                  </div>
                  <div className="text-xs text-slate-600 mt-1 space-y-0.5">
                    <div>ICE Client : <strong className="font-mono text-slate-800">{invoice.client.ice || 'Non renseigné'}</strong></div>
                    <div>À l'attention de : {invoice.client.contactPerson}</div>
                    <div>Adresse : {invoice.client.address}</div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">Désignation des prestations</th>
                        <th className="py-2.5 px-3 text-center">Qté / Jours</th>
                        <th className="py-2.5 px-3 text-right">Prix Unitaire</th>
                        <th className="py-2.5 px-3 text-right">Montant (MAD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-150">
                      {invoice.items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50">
                          <td className="py-3 px-3 text-slate-800 font-medium leading-snug">
                            {item.description}
                          </td>
                          <td className="py-3 px-3 text-center text-slate-600 font-mono">
                            {item.quantity}
                          </td>
                          <td className="py-3 px-3 text-right text-slate-600 font-mono">
                            {item.unitPrice.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-3 text-right text-slate-900 font-bold font-mono">
                            {item.total.toLocaleString('fr-FR', { minimumFractionDigits: 2 })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Subtotals & Total Block */}
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  
                  {/* Left: RIB & Bank Details */}
                  <div className="text-xs text-slate-600 max-w-sm">
                    <div className="font-bold text-slate-800 mb-1">Règlement par Virement Bancaire :</div>
                    <div className="font-mono text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <div>Banque : <strong>{invoice.freelancer.bankName || 'Banque Marocaine'}</strong></div>
                      <div>RIB (24 chiffres) :</div>
                      <div className="font-bold tracking-wider text-slate-900">{invoice.freelancer.rib}</div>
                    </div>
                  </div>

                  {/* Right: Total Summary */}
                  <div className="w-full sm:w-64 space-y-1.5 text-xs text-right">
                    <div className="flex justify-between text-slate-500">
                      <span>Total Hors Taxes (HT) :</span>
                      <span className="font-mono font-bold text-slate-800">
                        {subtotal.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Taux de TVA :</span>
                      <span className="font-mono font-bold text-emerald-600">0.00 % (Exonéré)</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Montant TVA :</span>
                      <span className="font-mono font-bold text-slate-800">0,00 MAD</span>
                    </div>
                    <div className="pt-2 border-t border-slate-300 flex justify-between items-baseline text-sm">
                      <span className="font-black text-slate-900">Total Net à Payer (TTC) :</span>
                      <span className="text-lg font-black text-emerald-700 font-mono">
                        {subtotal.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} MAD
                      </span>
                    </div>
                  </div>

                </div>

                {/* Moroccan Legal Requirement: Total in words in French */}
                <div className="mt-6 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 text-xs">
                  <span className="font-bold text-emerald-950">
                    Arrêtée la présente facture à la somme de :
                  </span>{' '}
                  <span className="italic font-semibold text-emerald-900">
                    « {totalInWords} »
                  </span>
                </div>

              </div>

              {/* Legal Footer & Signatures */}
              <div className="mt-8 pt-6 border-t border-slate-200 text-[10px] text-slate-500 space-y-3">
                
                {/* Signatures box */}
                <div className="grid grid-cols-2 gap-4 pb-4">
                  <div className="h-20 border border-dashed border-slate-300 rounded-xl p-2 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-slate-400">Signature & Cachet du Client :</span>
                    <span className="text-[9px] text-slate-400 italic">Mention "Bon pour accord"</span>
                  </div>
                  <div className="h-20 border border-dashed border-slate-300 rounded-xl p-2 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-slate-400">Signature du Prestataire (Auto-Entrepreneur) :</span>
                    <span className="font-mono text-emerald-800 font-semibold">{invoice.freelancer.fullName}</span>
                  </div>
                </div>

                {invoice.invoiceDetails.isVatExempt && (
                  <p className="font-semibold text-slate-600 text-center">
                    * Exonéré de la TVA en vertu de l'article 89 du Code Général des Impôts (Régime de l'Auto-Entrepreneur au Maroc).
                  </p>
                )}
                {invoice.invoiceDetails.includeLateFeeClause && (
                  <p className="text-slate-400 text-center text-[9px]">
                    En cas de retard de paiement, des pénalités seront appliquées conformément à la loi n° 69-21 relative aux délais de paiement au Maroc.
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
