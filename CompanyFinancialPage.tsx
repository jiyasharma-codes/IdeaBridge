import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';
import { ShieldCheck } from 'lucide-react';

export const CompanyFinancialPage: React.FC = () => {
  const { selectedStartup, activeImplementedFinancials } = useApp();

  const [selectedProductIndex] = useState<number>(0);

  const activeProduct = activeImplementedFinancials[selectedProductIndex] || activeImplementedFinancials[0];

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Financial Intelligence
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              IdeaBridge Implemented Only
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Commercial financial performance for products co-created and implemented through IdeaBridge.
          </p>
        </div>

        <div className="text-xs text-slate-400 font-semibold self-start sm:self-auto">
          Active Startup: <span className="font-bold text-slate-800">{selectedStartup.name}</span>
        </div>
      </div>

      {activeImplementedFinancials.length === 0 ? (
        <Card className="p-12 text-center text-slate-400 border-slate-200 bg-white space-y-3">
          <div className="text-3xl">📊</div>
          <h3 className="text-base font-bold text-slate-700">No Implemented IdeaBridge Products Yet</h3>
          <p className="text-xs max-w-md mx-auto leading-relaxed">
            Financial intelligence only tracks commercial products that were launched through IdeaBridge consumer validation and prototyping. Shortlist ideas from the Consumer Ideas tab to build your implementation pipeline!
          </p>
        </Card>
      ) : (
        <>
          {/* Product Selector Bar (if multiple implemented products exist) */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 font-black flex items-center justify-center text-base">
                ₹
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Implemented Commercial Product
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  {activeProduct.productName}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                Originating Idea:
              </span>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                💡 {activeProduct.originIdeaTitle}
              </span>
            </div>
          </div>

          {/* Core Metrics Grid - 7 Primary Cards + Separate Units/Mo Metric */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* 1. Estimated Monthly Revenue */}
            <Card className="p-5 border-slate-200 bg-white shadow-xs space-y-1">
              <span className="text-xs font-medium text-slate-500 block">
                Estimated Monthly Revenue
              </span>
              <b className="text-2xl font-black text-slate-900 block">
                {activeProduct.monthlyRevenue}
              </b>
              <span className="text-[11px] font-semibold text-emerald-600 block">
                {activeProduct.growthPotentialYoY}
              </span>
            </Card>

            {/* 2. Estimated Units / Month (SEPARATE METRIC as requested) */}
            <Card className="p-5 border-slate-200 bg-white shadow-xs space-y-1">
              <span className="text-xs font-medium text-slate-500 block">
                Estimated Units / Month
              </span>
              <b className="text-2xl font-black text-indigo-600 block">
                {activeProduct.unitsPerMonth.split(' ')[0]}
              </b>
              <span className="text-[11px] font-medium text-slate-400 block">
                at {activeProduct.suggestedPrice} avg selling price
              </span>
            </Card>

            {/* 3. Estimated Annual Opportunity */}
            <Card className="p-5 border-slate-200 bg-white shadow-xs space-y-1">
              <span className="text-xs font-medium text-slate-500 block">
                Estimated Annual Opportunity
              </span>
              <b className="text-2xl font-black text-slate-900 block">
                {activeProduct.annualOpportunity}
              </b>
              <span className="text-[11px] font-semibold text-slate-400 block">
                Projected 12-Month Run Rate
              </span>
            </Card>

            {/* 4. Estimated Net Profit */}
            <Card className="p-5 border-slate-200 bg-white shadow-xs space-y-1">
              <span className="text-xs font-medium text-slate-500 block">
                Estimated Net Profit
              </span>
              <b className="text-2xl font-black text-emerald-700 block">
                {activeProduct.netProfitMonthly}
              </b>
              <span className="text-[11px] font-semibold text-emerald-600 block">
                Margin: {activeProduct.marginPercentage}
              </span>
            </Card>

            {/* 5. Estimated Production Cost */}
            <Card className="p-5 border-slate-200 bg-white shadow-xs space-y-1">
              <span className="text-xs font-medium text-slate-500 block">
                Estimated Production Cost
              </span>
              <b className="text-2xl font-black text-slate-800 block">
                {activeProduct.productionCostMonthly}
              </b>
              <span className="text-[11px] font-medium text-slate-400 block">
                COGS & raw materials
              </span>
            </Card>

            {/* 6. Estimated Operating Cost */}
            <Card className="p-5 border-slate-200 bg-white shadow-xs space-y-1">
              <span className="text-xs font-medium text-slate-500 block">
                Estimated Operating Cost
              </span>
              <b className="text-2xl font-black text-slate-800 block">
                {activeProduct.operatingCostMonthly}
              </b>
              <span className="text-[11px] font-medium text-slate-400 block">
                Packaging & distribution
              </span>
            </Card>

            {/* 7. Estimated Margin % */}
            <Card className="p-5 border-slate-200 bg-white shadow-xs space-y-1">
              <span className="text-xs font-medium text-slate-500 block">
                Estimated Margin %
              </span>
              <b className="text-2xl font-black text-teal-700 block">
                {activeProduct.marginPercentage}
              </b>
              <span className="text-[11px] font-semibold text-teal-600 block">
                Contribution positive
              </span>
            </Card>

            {/* 8. Growth Potential YoY % */}
            <Card className="p-5 border-slate-200 bg-white shadow-xs space-y-1">
              <span className="text-xs font-medium text-slate-500 block">
                Growth Potential YoY %
              </span>
              <b className="text-2xl font-black text-indigo-700 block">
                {activeProduct.growthPotentialYoY}
              </b>
              <span className="text-[11px] font-semibold text-indigo-600 block">
                Strong validation tailwinds
              </span>
            </Card>
          </div>

          {/* Monthly Cost vs. Profit Breakdown Chart Card */}
          <Card className="p-6 border-slate-200 bg-white space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Monthly Cost vs. Profit Breakdown
                </h3>
                <p className="text-xs text-slate-500">
                  Visual distribution of monthly revenue into production cost, operating expense, and net profit.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-3 h-3 rounded-full bg-slate-400 inline-block"></span>
                  Production ({activeProduct.productionCostMonthly})
                </span>
                <span className="flex items-center gap-1.5 text-indigo-600">
                  <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block"></span>
                  Operating ({activeProduct.operatingCostMonthly})
                </span>
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
                  Net Profit ({activeProduct.netProfitMonthly})
                </span>
              </div>
            </div>

            {/* Proportional Multi-Segment Horizontal Stacked Bar */}
            <div className="space-y-2">
              <div className="w-full h-8 rounded-2xl overflow-hidden flex shadow-inner bg-slate-100 p-1 gap-1">
                <div
                  className="h-full rounded-xl bg-slate-400 flex items-center justify-center text-[11px] font-extrabold text-white transition-all"
                  style={{ width: `${Math.round((activeProduct.breakdown.production / (activeProduct.breakdown.production + activeProduct.breakdown.operating + activeProduct.breakdown.netProfit)) * 100)}%` }}
                  title={`Production Cost: ₹${activeProduct.breakdown.production}K`}
                >
                  Prod ({Math.round((activeProduct.breakdown.production / (activeProduct.breakdown.production + activeProduct.breakdown.operating + activeProduct.breakdown.netProfit)) * 100)}%)
                </div>
                <div
                  className="h-full rounded-xl bg-indigo-500 flex items-center justify-center text-[11px] font-extrabold text-white transition-all"
                  style={{ width: `${Math.round((activeProduct.breakdown.operating / (activeProduct.breakdown.production + activeProduct.breakdown.operating + activeProduct.breakdown.netProfit)) * 100)}%` }}
                  title={`Operating Cost: ₹${activeProduct.breakdown.operating}K`}
                >
                  Ops ({Math.round((activeProduct.breakdown.operating / (activeProduct.breakdown.production + activeProduct.breakdown.operating + activeProduct.breakdown.netProfit)) * 100)}%)
                </div>
                <div
                  className="h-full rounded-xl bg-emerald-500 flex items-center justify-center text-[11px] font-extrabold text-white transition-all"
                  style={{ width: `${Math.round((activeProduct.breakdown.netProfit / (activeProduct.breakdown.production + activeProduct.breakdown.operating + activeProduct.breakdown.netProfit)) * 100)}%` }}
                  title={`Net Profit: ₹${activeProduct.breakdown.netProfit}K`}
                >
                  Net ({Math.round((activeProduct.breakdown.netProfit / (activeProduct.breakdown.production + activeProduct.breakdown.operating + activeProduct.breakdown.netProfit)) * 100)}%)
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-1">
                <span>Total Monthly Inflow: {activeProduct.monthlyRevenue}</span>
                <span>Calculated on {activeProduct.unitsPerMonth}</span>
              </div>
            </div>

            {/* Co-Creation Validation Metadata Strip */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">IdeaBridge Community Backers</span>
                <b className="text-sm font-extrabold text-slate-900 mt-0.5 block">
                  {activeProduct.validationsCount.toLocaleString()} Validations
                </b>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Commercial Launch Status</span>
                <b className="text-sm font-extrabold text-emerald-700 mt-0.5 block">
                  Live in Market · Scaling
                </b>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Original Community Idea</span>
                <b className="text-sm font-extrabold text-indigo-700 mt-0.5 block truncate">
                  {activeProduct.originIdeaTitle}
                </b>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
