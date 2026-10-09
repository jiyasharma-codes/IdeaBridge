import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';

export const CompanyAnalyticsPage: React.FC = () => {
  const { selectedStartup, activeAnalytics } = useApp();
  const [hoveredWeek, setHoveredWeek] = useState<{ week: string; validations: number; heightPct: string } | null>(null);
  const [hoveredDemo, setHoveredDemo] = useState<{ group: string; pct: number; count: number; color: string } | null>(null);

  const totalVoters = activeAnalytics.demographics.reduce((acc, curr) => acc + curr.count, 0);

  // Compute conic gradient dynamically from demographics
  let cumulativePct = 0;
  const gradientStops = activeAnalytics.demographics.map((item) => {
    const start = cumulativePct;
    cumulativePct += item.pct;
    return `${item.color} ${start}% ${cumulativePct}%`;
  });
  const conicGradient = `conic-gradient(${gradientStops.join(', ')})`;

  // Dynamic coordinates for SVG Area/Line Chart
  const svgWidth = 500;
  const svgHeight = 220;
  const padLeft = 50;
  const padRight = 25;
  const padTop = 20;
  const padBottom = 35;
  const chartW = svgWidth - padLeft - padRight;
  const chartH = svgHeight - padTop - padBottom;
  const yMax = 2000;
  const yTicks = [0, 500, 1000, 1500, 2000];

  const points = activeAnalytics.weeklyDemand.map((d, i) => {
    const x = padLeft + (i / Math.max(1, activeAnalytics.weeklyDemand.length - 1)) * chartW;
    const y = padTop + chartH - (d.validations / yMax) * chartH;
    return { ...d, x, y };
  });

  const linePathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`, '');
  const areaPathD = `${linePathD} L ${points[points.length - 1].x.toFixed(1)},${(padTop + chartH).toFixed(1)} L ${points[0].x.toFixed(1)},${(padTop + chartH).toFixed(1)} Z`;

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Consumer demand, demographics, pricing signals and {selectedStartup.name} product ideas.
          </p>
        </div>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 self-start sm:self-auto">
          {selectedStartup.name} · Real-time consumer telemetry
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Consumer Demand Over Time — Actual Responsive SVG Area & Line Graph */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Consumer Demand Over Time</h3>
              <p className="text-xs text-slate-500">Weekly validation volume & submission momentum</p>
            </div>
            {hoveredWeek ? (
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 animate-fade-in">
                {hoveredWeek.week}: {hoveredWeek.validations.toLocaleString()} validations
              </span>
            ) : (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                +475% Momentum Growth
              </span>
            )}
          </div>

          <div className="relative w-full pt-1">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                <linearGradient id="demandAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.32" />
                  <stop offset="70%" stopColor="#4f46e5" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Reference Gridlines and Y-axis Labels */}
              {yTicks.map((tick) => {
                const y = padTop + chartH - (tick / yMax) * chartH;
                return (
                  <g key={tick}>
                    <line
                      x1={padLeft}
                      y1={y}
                      x2={svgWidth - padRight}
                      y2={y}
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray={tick === 0 ? 'none' : '3 3'}
                      className="text-slate-200 dark:text-slate-800"
                    />
                    <text
                      x={padLeft - 8}
                      y={y + 3.5}
                      textAnchor="end"
                      className="fill-slate-400 text-[10px] font-semibold"
                    >
                      {tick.toLocaleString()}
                    </text>
                  </g>
                );
              })}

              {/* Smooth Gradient Area Fill */}
              <path d={areaPathD} fill="url(#demandAreaGradient)" />

              {/* High-Contrast Line Path */}
              <path
                d={linePathD}
                fill="none"
                stroke="#4f46e5"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points, Interactivity & Labels */}
              {points.map((p) => {
                const isHovered = hoveredWeek?.week === p.week;
                return (
                  <g
                    key={p.week}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredWeek(p)}
                    onMouseLeave={() => setHoveredWeek(null)}
                  >
                    {/* X-axis Week Label */}
                    <text
                      x={p.x}
                      y={svgHeight - 12}
                      textAnchor="middle"
                      className={`text-[11px] font-bold transition-colors ${
                        isHovered ? 'fill-indigo-600 font-black' : 'fill-slate-500'
                      }`}
                    >
                      {p.week}
                    </text>

                    {/* Data Node Halo and Dot */}
                    {isHovered && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="10"
                        fill="#4f46e5"
                        fillOpacity="0.2"
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isHovered ? '6' : '4.5'}
                      fill="#ffffff"
                      stroke="#4f46e5"
                      strokeWidth={isHovered ? '3.5' : '2.5'}
                      className="transition-all duration-150"
                    />

                    {/* Value Badge above dot */}
                    <text
                      x={p.x}
                      y={p.y - 10}
                      textAnchor="middle"
                      className={`text-[10px] font-extrabold transition-opacity ${
                        isHovered ? 'fill-indigo-700 opacity-100 font-black' : 'fill-slate-400 opacity-70'
                      }`}
                    >
                      {p.validations}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
            <span>X-Axis: Timeline (W1 to W6)</span>
            <span>Hover points for exact validation count</span>
          </div>
        </Card>

        {/* Demographic Distribution with interactive donut & hover tooltips */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Demographic Distribution</h3>
              <p className="text-xs text-slate-500">Age split of engaged respondents</p>
            </div>
            {hoveredDemo && (
              <span className="text-xs font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 animate-fade-in">
                {hoveredDemo.group} — {hoveredDemo.pct}% ({hoveredDemo.count.toLocaleString()} voters)
              </span>
            )}
          </div>

          <div className="flex items-center justify-center py-2">
            <div
              className="w-40 h-40 rounded-full relative flex items-center justify-center shadow-xs transition-transform duration-200 hover:scale-105 cursor-pointer"
              style={{ background: conicGradient }}
            >
              <div className="w-24 h-24 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
                <span className="text-[10px] font-bold text-slate-400">
                  {hoveredDemo ? hoveredDemo.group : 'Total Voters'}
                </span>
                <b className="text-sm font-black text-slate-900">
                  {hoveredDemo ? `${hoveredDemo.count.toLocaleString()}` : totalVoters.toLocaleString()}
                </b>
                {hoveredDemo && (
                  <span className="text-[10px] font-bold text-indigo-600">
                    {hoveredDemo.pct}% share
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Clean Legend with Hover Tooltips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
            {activeAnalytics.demographics.map((demo) => {
              const isHovered = hoveredDemo?.group === demo.group;
              return (
                <div
                  key={demo.group}
                  className={`p-2 rounded-xl text-center cursor-pointer transition-all border ${
                    isHovered ? 'bg-slate-100 border-slate-300 shadow-xs' : 'bg-slate-50/70 border-transparent hover:bg-slate-100'
                  }`}
                  onMouseEnter={() => setHoveredDemo(demo)}
                  onMouseLeave={() => setHoveredDemo(null)}
                  title={`${demo.group} — ${demo.pct}% — ${demo.count.toLocaleString()} voters`}
                >
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: demo.color }}></span>
                    <span className="text-xs font-bold text-slate-700">{demo.group}</span>
                  </div>
                  <div className="text-[11px] font-extrabold text-slate-900">{demo.pct}%</div>
                  <div className="text-[9px] text-slate-400">{demo.count.toLocaleString()} votes</div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Price Sensitivity */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Price Sensitivity</h3>
            <p className="text-xs text-slate-500">Consumer acceptance rate across price tiers for {selectedStartup.name}</p>
          </div>

          <div className="space-y-3.5 pt-1">
            {activeAnalytics.priceSensitivity.map(({ price, acceptancePct }) => (
              <div key={price} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{price}</span>
                  <span className="text-amber-700 font-extrabold">{acceptancePct}% acceptance</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-300"
                    style={{ width: `${acceptancePct}%` }}
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

        {/* Ideas by Product Area */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Ideas by Product Area</h3>
            <p className="text-xs text-slate-500">
              Submission volume across {selectedStartup.name}'s active categories
            </p>
          </div>

          <div className="space-y-3.5 pt-1">
            {activeAnalytics.productAreaDemand.map(({ area, count, pct }) => (
              <div key={area} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{area}</span>
                  <span className="text-indigo-600 font-extrabold">{count} ideas ({pct}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
