import React from 'react';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';

export const CompanyOverviewPage: React.FC = () => {
  const { selectedStartup, activeScoutingMandate } = useApp();
  const rl = selectedStartup.recentlyLaunched;

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Overview</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {selectedStartup.name} · Consumer-led product innovation
          </p>
        </div>
      </div>

      {/* Hero Recently Launched */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-7 sm:p-9 shadow-lg shadow-indigo-100 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200 block">
          RECENTLY LAUNCHED
        </span>
        <h2 className="text-2xl sm:text-3xl font-black">{rl.name}</h2>
        <p className="text-sm text-indigo-100 max-w-2xl leading-relaxed">
          {rl.tagline}
        </p>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-5 border-slate-200 bg-white">
          <span className="text-xs text-slate-500 font-medium block">Monthly revenue</span>
          <b className="text-2xl font-black text-slate-900 mt-1 block">{rl.monthlyRevenue}</b>
        </Card>
        <Card className="p-5 border-slate-200 bg-white">
          <span className="text-xs text-slate-500 font-medium block">Consumer response</span>
          <b className="text-2xl font-black text-emerald-700 mt-1 block">{rl.consumerResponse}</b>
        </Card>
        <Card className="p-5 border-slate-200 bg-white">
          <span className="text-xs text-slate-500 font-medium block">Net profit</span>
          <b className="text-2xl font-black text-slate-900 mt-1 block">{rl.netProfit}</b>
        </Card>
        <Card className="p-5 border-slate-200 bg-white">
          <span className="text-xs text-slate-500 font-medium block">Margin</span>
          <b className="text-2xl font-black text-emerald-700 mt-1 block">{rl.margin}</b>
        </Card>
      </div>

      {/* Grid 2: Unit Economics & Launch Response */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Unit economics */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Unit economics</h3>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-3 flex items-center justify-between text-slate-600">
              <span>Production cost / unit</span>
              <b className="text-slate-900 font-bold">₹{rl.unitEconomics.productionCost}</b>
            </div>
            <div className="py-3 flex items-center justify-between text-slate-600">
              <span>Packaging + distribution</span>
              <b className="text-slate-900 font-bold">₹{rl.unitEconomics.packagingDistribution}</b>
            </div>
            <div className="py-3 flex items-center justify-between text-slate-600">
              <span>Average selling price</span>
              <b className="text-slate-900 font-bold">₹{rl.unitEconomics.avgSellingPrice}</b>
            </div>
            <div className="py-3 flex items-center justify-between text-emerald-700 font-bold bg-emerald-50/50 px-2 rounded-lg">
              <span>Contribution / unit</span>
              <b className="text-base">₹{rl.unitEconomics.contribution}</b>
            </div>
          </div>
        </Card>

        {/* Launch response */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Launch response</h3>
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-700">
                <span>Repeat interest</span>
                <span className="text-indigo-600">{rl.launchResponse.repeatInterest}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${rl.launchResponse.repeatInterest}%` }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-700">
                <span>Positive taste</span>
                <span className="text-emerald-700">{rl.launchResponse.positiveTaste}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: `${rl.launchResponse.positiveTaste}%` }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between font-bold text-slate-700">
                <span>Packaging appeal</span>
                <span className="text-teal-700">{rl.launchResponse.packagingAppeal}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-teal-500 rounded-full" style={{ width: `${rl.launchResponse.packagingAppeal}%` }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Strategic Scouting Criteria & Mandates */}
      <Card className="p-6 border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Strategic Scouting Criteria & Mandates</h3>
            <p className="text-xs text-slate-500">Parameters defined by {selectedStartup.name} for evaluating incoming consumer ideas</p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Active Mandate
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <div className="space-y-3">
            <b className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              🎯 What We Are Looking For
            </b>
            <div className="space-y-1.5 text-xs text-slate-700">
              {activeScoutingMandate.whatWeAreLookingFor.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-indigo-600 font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <b className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              🎁 Co-Creator Rewards & Perks
            </b>
            <div className="space-y-1.5 text-xs text-slate-700">
              {activeScoutingMandate.rewardsAndPerks.map((perk, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-emerald-600 font-bold">★</span>
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mandate Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Audience</span>
            <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">{activeScoutingMandate.targetAudience}</span>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Price Range</span>
            <span className="text-xs font-bold text-indigo-700 mt-0.5 block">{activeScoutingMandate.priceRange}</span>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Validation Bar</span>
            <span className="text-xs font-bold text-emerald-700 mt-0.5 block truncate">{activeScoutingMandate.validationThreshold}</span>
          </div>
          <div className="p-3 bg-slate-50/70 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Pipeline Focus</span>
            <span className="text-xs font-bold text-slate-800 mt-0.5 block truncate">{activeScoutingMandate.pipelineFocus}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
