import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';

const POSITIONING_MAP: Record<string, { quote: string; price: string; driver: string; audience: string }> = {
  Nuvie: {
    quote: '“Protein-rich + crunchy + affordable”',
    price: '₹40–₹55',
    driver: 'Indian-friendly flavours',
    audience: '18–30 years',
  },
  'Go Desi': {
    quote: '“Authentic regional flavours + natural jaggery + pocket-friendly”',
    price: '₹15–₹30',
    driver: 'Pure traditional spices & tang',
    audience: 'All ages & students',
  },
  SoleStory: {
    quote: '“All-day orthopedic comfort + breathable knit + accessible”',
    price: '₹999–₹1,499',
    driver: 'Ergonomic arch support',
    audience: 'Urban professionals & walkers',
  },
  ThreadTheory: {
    quote: '“Breathable organic cotton + sweat-resistant + everyday luxury”',
    price: '₹599–₹899',
    driver: 'Eco-friendly soft drape',
    audience: 'Young professionals & students',
  },
  AuraNest: {
    quote: '“Soot-free soy wax + calm natural botanicals + long burn”',
    price: '₹399–₹599',
    driver: 'Pure therapeutic essential oils',
    audience: 'Urban homemakers & remote workers',
  },
  Giftly: {
    quote: '“Handcrafted keepsake packaging + artisanal tea & treats”',
    price: '₹499–₹1,299',
    driver: 'Bespoke customization & presentation',
    audience: 'Corporate & festive gifters',
  },
  UrbanCarry: {
    quote: '“Weatherproof modular compartmentalization + minimalist aesthetic”',
    price: '₹1,299–₹2,499',
    driver: 'Ergonomic weight distribution',
    audience: 'Daily commuters & tech workers',
  },
};

export const CompanyMarketingPage: React.FC = () => {
  const { selectedStartup, activeScoutingMandate } = useApp();
  const [hoveredAge, setHoveredAge] = useState<{ range: string; pct: number; count: number; color: string } | null>(null);

  const ageGroups = [
    { range: '18–24', pct: 34, count: 424, color: '#4f46e5' },
    { range: '25–30', pct: 28, count: 349, color: '#06b6d4' },
    { range: '31–40', pct: 22, count: 275, color: '#10b981' },
    { range: '41+', pct: 16, count: 200, color: '#f59e0b' },
  ];
  const radius = 58;
  const circumference = 2 * Math.PI * radius;

  const pos = POSITIONING_MAP[selectedStartup.name] || {
    quote: `“High-quality + affordable + category-defining”`,
    price: activeScoutingMandate.priceRange || '₹40–₹100',
    driver: 'Clean design & accessibility',
    audience: activeScoutingMandate.targetAudience || 'Everyday consumers',
  };

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Marketing Intelligence
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Audience, positioning and purchase-intent signals from customer responses for {selectedStartup.name}.
          </p>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
          {selectedStartup.name} · AI-assisted insight
        </span>
      </div>

      {/* KPIs Grid matching prototype */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200 bg-white">
          <span className="text-xs text-slate-500 block">Target audience</span>
          <b className="text-lg font-black text-slate-900 mt-1 block truncate">{pos.audience}</b>
        </Card>
        <Card className="p-4 border-slate-200 bg-white">
          <span className="text-xs text-slate-500 block">Strongest segment</span>
          <b className="text-lg font-black text-slate-900 mt-1 block">Urban Gen Z</b>
        </Card>
        <Card className="p-4 border-slate-200 bg-white">
          <span className="text-xs text-slate-500 block">Top purchase driver</span>
          <b className="text-lg font-black text-slate-900 mt-1 block">Affordable price</b>
        </Card>
        <Card className="p-4 border-slate-200 bg-white">
          <span className="text-xs text-slate-500 block">Customer sentiment</span>
          <b className="text-lg font-black text-emerald-700 mt-1 block">78% positive</b>
        </Card>
      </div>

      {/* Hero Positioning Banner matching prototype */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-7 sm:p-9 shadow-lg shadow-indigo-100 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200 block">
          BEST PRODUCT POSITIONING
        </span>
        <h2 className="text-2xl sm:text-3xl font-black leading-tight">
          {pos.quote}
        </h2>
        <p className="text-sm text-indigo-100 max-w-xl">
          Preferred price: <b>{pos.price}</b> · Second driver: <b>{pos.driver}</b>
        </p>
      </div>

      {/* Grid 2: Age Groups + Purchase Intent by Segment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Age Groups — Perfectly Scaled Responsive Donut Chart */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Age Groups</h3>
              <p className="text-xs text-slate-500">Share of engaged consumer respondents</p>
            </div>
            {hoveredAge ? (
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 animate-fade-in">
                {hoveredAge.range}: {hoveredAge.pct}% ({hoveredAge.count} voters)
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                1,248 Total Voters
              </span>
            )}
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                {ageGroups.map((ag, idx) => {
                  const strokeDasharray = `${(ag.pct / 100) * circumference} ${circumference}`;
                  const prevPctSum = ageGroups.slice(0, idx).reduce((sum, g) => sum + g.pct, 0);
                  const strokeDashoffset = -((prevPctSum / 100) * circumference);
                  const isHovered = hoveredAge?.range === ag.range;

                  return (
                    <circle
                      key={ag.range}
                      cx="80"
                      cy="80"
                      r={radius}
                      fill="transparent"
                      stroke={ag.color}
                      strokeWidth={isHovered ? 24 : 20}
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={strokeDashoffset}
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHoveredAge(ag)}
                      onMouseLeave={() => setHoveredAge(null)}
                    />
                  );
                })}
              </svg>

              {/* Center Donut Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {hoveredAge ? hoveredAge.range : 'Total'}
                </span>
                <b className="text-lg font-black text-slate-900 dark:text-white">
                  {hoveredAge ? `${hoveredAge.pct}%` : '1,248'}
                </b>
                <span className="text-[10px] text-slate-500">
                  {hoveredAge ? `${hoveredAge.count} voters` : 'voters'}
                </span>
              </div>
            </div>
          </div>

          {/* 4-Chip Responsive Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            {ageGroups.map((ag) => {
              const isHovered = hoveredAge?.range === ag.range;
              return (
                <div
                  key={ag.range}
                  onMouseEnter={() => setHoveredAge(ag)}
                  onMouseLeave={() => setHoveredAge(null)}
                  className={`p-2 rounded-xl flex items-center justify-between border cursor-pointer transition-all ${
                    isHovered
                      ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 shadow-xs'
                      : 'bg-slate-50/70 dark:bg-slate-900/60 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: ag.color }} />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{ag.range}</span>
                  </div>
                  <div className="text-right">
                    <b className="text-xs font-black text-slate-900 dark:text-white">{ag.pct}%</b>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Purchase Intent by Segment */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Purchase Intent by Segment</h3>
          <p className="text-xs text-slate-500 -mt-2">% of respondents who would buy</p>

          <div className="space-y-3.5 pt-1">
            {[
              ['Urban Gen Z', 84],
              ['Urban Millennials', 76],
              ['Tier-2 City Gen Z', 81],
              ['Tier-2 Millennials', 68],
            ].map(([label, val]) => (
              <div key={label as string} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{label}</span>
                  <span className="text-indigo-600">{val}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </Card>
      </div>

      {/* Grid 2: What would make customers buy + Consumer Sentiment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* What would make customers buy */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">What Would Make Customers Buy</h3>
          <p className="text-xs text-slate-500 -mt-2">Share of engaged responses</p>

          <div className="space-y-3.5 pt-1">
            {[
              ['Affordable price', 62],
              ['Natural ingredients', 48],
              ['Taste / flavour', 43],
              ['Packaging appeal', 31],
            ].map(([label, val]) => (
              <div key={label as string} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{label}</span>
                  <span className="text-amber-700">{val}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${val}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </Card>

        {/* Consumer Sentiment */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Consumer Sentiment</h3>
          <p className="text-xs text-slate-500 -mt-2">Across recent responses · 1,248 responses</p>

          <div className="flex items-center justify-around py-3">
            {/* Donut */}
            <div
              className="w-32 h-32 rounded-full relative flex items-center justify-center shadow-xs"
              style={{
                background: 'conic-gradient(#12a88f 0 78%, #aeb3c2 78% 92%, #ff8740 92% 100%)',
              }}
            >
              <div className="w-20 h-20 rounded-full bg-white flex flex-col items-center justify-center">
                <b className="text-lg font-black text-slate-900">78%</b>
                <span className="text-[10px] text-slate-400">Positive</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block"></span>
                <span>Positive: <strong>78%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block"></span>
                <span>Neutral: <strong>14%</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                <span>Negative: <strong>8%</strong></span>
              </div>
            </div>
          </div>

          {/* Sentiment Bar */}
          <div className="h-2.5 flex rounded-full overflow-hidden bg-slate-100">
            <span style={{ width: '78%' }} className="bg-teal-600 h-full"></span>
            <span style={{ width: '14%' }} className="bg-slate-400 h-full"></span>
            <span style={{ width: '8%' }} className="bg-amber-500 h-full"></span>
          </div>

          <p className="text-xs text-slate-500 italic">
            Strong positive signal around taste, affordability and everyday convenience.
          </p>
        </Card>
      </div>
    </div>
  );
};
