import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';

export const CompanyConceptLabPage: React.FC = () => {
  const {
    conceptLabIdea,
    setConceptLabIdea,
    simulationResult,
    runConsumerTestSimulation,
    selectedStartup,
    showToast,
  } = useApp();

  const revenue = (conceptLabIdea.sellingPrice * conceptLabIdea.expectedSales) / 100000;
  const totalUnitCost =
    conceptLabIdea.unitCost + conceptLabIdea.marketingUnit + conceptLabIdea.distributionUnit;
  const totalCost = (totalUnitCost * conceptLabIdea.expectedSales) / 100000;
  const contribution = revenue - totalCost;
  const margin = revenue > 0 ? Math.round((contribution / revenue) * 1000) / 10 : 0;

  // Dynamic Scenario Analysis Calculations
  const conservativeUnits = 5000;
  const conservativeRev = Math.round((conceptLabIdea.sellingPrice * conservativeUnits) / 1000);
  const conservativeCost = Math.round((totalUnitCost * conservativeUnits) / 1000);
  const conservativeContrib = conservativeRev - conservativeCost;

  const expectedUnits = conceptLabIdea.expectedSales;
  const expectedRev = Math.round((conceptLabIdea.sellingPrice * expectedUnits) / 1000);
  const expectedCost = Math.round((totalUnitCost * expectedUnits) / 1000);
  const expectedContrib = expectedRev - expectedCost;

  const optimisticUnits = 20000;
  const optimisticRev = Math.round((conceptLabIdea.sellingPrice * optimisticUnits) / 1000);
  const optimisticCost = Math.round((totalUnitCost * optimisticUnits) / 1000);
  const optimisticContrib = optimisticRev - optimisticCost;

  const maxVal = Math.max(1, optimisticRev, expectedRev, conservativeRev);
  const calcHeightPct = (val: number) => {
    const pct = Math.max(10, Math.min(100, Math.round((Math.max(0, val) / maxVal) * 100)));
    return `${pct}%`;
  };

  const handleProceedToPrototype = () => {
    showToast(`"${conceptLabIdea.name}" advanced to pilot prototyping batch!`);
  };

  const handleRunSimulation = () => {
    runConsumerTestSimulation(conceptLabIdea);
  };

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Concept Lab & Formulation
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Test unit economics, package weights, and simulate consumer acceptance for {selectedStartup.name}.
          </p>
        </div>
        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 self-start sm:self-auto">
          Active Concept: {conceptLabIdea.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Concept Formulation Card */}
        <Card className="p-6 border-slate-200 bg-white space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Product Concept Parameters</h3>
            <span className="text-xs font-bold text-slate-400">R&D Lab</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                CONCEPT NAME
              </label>
              <input
                type="text"
                value={conceptLabIdea.name}
                onChange={(e) => setConceptLabIdea({ ...conceptLabIdea, name: e.target.value })}
                className="w-full text-xs font-bold rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            {/* Packaging, Weight/Volume, and Target Age */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  PACKAGE TYPE
                </label>
                <input
                  type="text"
                  value={conceptLabIdea.packageType}
                  onChange={(e) => setConceptLabIdea({ ...conceptLabIdea, packageType: e.target.value })}
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  WEIGHT / VOL
                </label>
                <input
                  type="text"
                  value={conceptLabIdea.weightVolume || '35g'}
                  onChange={(e) => setConceptLabIdea({ ...conceptLabIdea, weightVolume: e.target.value })}
                  className="w-full text-xs font-bold rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="e.g. 35g"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  TARGET AGE
                </label>
                <input
                  type="text"
                  value={conceptLabIdea.targetAge}
                  onChange={(e) => setConceptLabIdea({ ...conceptLabIdea, targetAge: e.target.value })}
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Selling Price & Unit Production Cost */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  SELLING PRICE (₹)
                </label>
                <input
                  type="number"
                  value={conceptLabIdea.sellingPrice}
                  onChange={(e) => setConceptLabIdea({ ...conceptLabIdea, sellingPrice: Number(e.target.value) || 0 })}
                  className="w-full text-xs font-bold rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  UNIT PRODUCTION COST (₹)
                </label>
                <input
                  type="number"
                  value={conceptLabIdea.unitCost}
                  onChange={(e) => setConceptLabIdea({ ...conceptLabIdea, unitCost: Number(e.target.value) || 0 })}
                  className="w-full text-xs font-bold rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Marketing & Distribution per unit */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  MARKETING / UNIT (₹)
                </label>
                <input
                  type="number"
                  value={conceptLabIdea.marketingUnit}
                  onChange={(e) => setConceptLabIdea({ ...conceptLabIdea, marketingUnit: Number(e.target.value) || 0 })}
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  DISTRIBUTION / UNIT (₹)
                </label>
                <input
                  type="number"
                  value={conceptLabIdea.distributionUnit}
                  onChange={(e) => setConceptLabIdea({ ...conceptLabIdea, distributionUnit: Number(e.target.value) || 0 })}
                  className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                EXPECTED FIRST-MONTH SALES (UNITS)
              </label>
              <input
                type="number"
                value={conceptLabIdea.expectedSales}
                onChange={(e) => setConceptLabIdea({ ...conceptLabIdea, expectedSales: Number(e.target.value) || 0 })}
                className="w-full text-xs font-bold rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Real-time Dynamic Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center sm:text-left">
              <b className="text-base font-black text-slate-900">₹{revenue.toFixed(1)}L</b>
              <span className="text-[10px] text-slate-400 block">Projected revenue</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center sm:text-left">
              <b className="text-base font-black text-slate-900">₹{totalCost.toFixed(1)}L</b>
              <span className="text-[10px] text-slate-400 block">Estimated total cost</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center sm:text-left">
              <b className="text-base font-black text-emerald-700">₹{contribution.toFixed(1)}L</b>
              <span className="text-[10px] text-slate-400 block">Projected contribution</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-center sm:text-left">
              <b className="text-base font-black text-indigo-600">{margin}%</b>
              <span className="text-[10px] text-slate-400 block">Contribution margin</span>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            className="w-full py-2.5 font-bold text-xs bg-indigo-600 hover:bg-indigo-700 shadow-sm"
            onClick={handleRunSimulation}
          >
            ⚗ Launch Consumer Test Simulation
          </Button>
        </Card>

        {/* Dynamic Scenario Analysis & Results */}
        <div className="space-y-6">
          {/* Scenario Analysis with Live Reactive Bars */}
          <Card className="p-6 border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900">Scenario Analysis</h3>
              <span className="text-[11px] font-semibold text-emerald-600">
                Live recalculating
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Illustrative ₹ thousands · revenue (indigo) / cost (amber) / contribution (teal)
            </p>

            {/* Real-time Dynamic Bars Graphic */}
            <div className="h-44 flex items-end justify-between gap-4 border-b border-slate-200 px-4 pt-4">
              {/* Conservative Group (5k units) */}
              <div className="flex-1 flex items-end justify-center gap-1.5 h-full">
                <div
                  className="w-4 sm:w-5 bg-indigo-600 rounded-t-md relative transition-all duration-300"
                  style={{ height: calcHeightPct(conservativeRev) }}
                  title={`Revenue: ₹${conservativeRev}K`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    {conservativeRev}
                  </span>
                </div>
                <div
                  className="w-4 sm:w-5 bg-amber-500 rounded-t-md relative transition-all duration-300"
                  style={{ height: calcHeightPct(conservativeCost) }}
                  title={`Cost: ₹${conservativeCost}K`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    {conservativeCost}
                  </span>
                </div>
                <div
                  className="w-4 sm:w-5 bg-teal-500 rounded-t-md relative transition-all duration-300"
                  style={{ height: calcHeightPct(conservativeContrib) }}
                  title={`Contribution: ₹${conservativeContrib}K`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    {conservativeContrib}
                  </span>
                </div>
              </div>

              {/* Expected Group (expectedSales units) */}
              <div className="flex-1 flex items-end justify-center gap-1.5 h-full">
                <div
                  className="w-4 sm:w-5 bg-indigo-600 rounded-t-md relative transition-all duration-300"
                  style={{ height: calcHeightPct(expectedRev) }}
                  title={`Revenue: ₹${expectedRev}K`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    {expectedRev}
                  </span>
                </div>
                <div
                  className="w-4 sm:w-5 bg-amber-500 rounded-t-md relative transition-all duration-300"
                  style={{ height: calcHeightPct(expectedCost) }}
                  title={`Cost: ₹${expectedCost}K`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    {expectedCost}
                  </span>
                </div>
                <div
                  className="w-4 sm:w-5 bg-teal-500 rounded-t-md relative transition-all duration-300"
                  style={{ height: calcHeightPct(expectedContrib) }}
                  title={`Contribution: ₹${expectedContrib}K`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    {expectedContrib}
                  </span>
                </div>
              </div>

              {/* Optimistic Group (20k units) */}
              <div className="flex-1 flex items-end justify-center gap-1.5 h-full">
                <div
                  className="w-4 sm:w-5 bg-indigo-600 rounded-t-md relative transition-all duration-300"
                  style={{ height: calcHeightPct(optimisticRev) }}
                  title={`Revenue: ₹${optimisticRev}K`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    {optimisticRev}
                  </span>
                </div>
                <div
                  className="w-4 sm:w-5 bg-amber-500 rounded-t-md relative transition-all duration-300"
                  style={{ height: calcHeightPct(optimisticCost) }}
                  title={`Cost: ₹${optimisticCost}K`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    {optimisticCost}
                  </span>
                </div>
                <div
                  className="w-4 sm:w-5 bg-teal-500 rounded-t-md relative transition-all duration-300"
                  style={{ height: calcHeightPct(optimisticContrib) }}
                  title={`Contribution: ₹${optimisticContrib}K`}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 whitespace-nowrap">
                    {optimisticContrib}
                  </span>
                </div>
              </div>
            </div>

            {/* Legend & Unit Subtitles */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-xs bg-indigo-600 inline-block"></span> Revenue
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-xs bg-amber-500 inline-block"></span> Cost
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-xs bg-teal-500 inline-block"></span> Contribution
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <b className="text-slate-900 block font-bold">5k units</b>
                <span className="text-[10px] text-slate-400">Conservative</span>
              </div>
              <div className="p-2 bg-indigo-50/70 rounded-xl border border-indigo-100">
                <b className="text-indigo-700 block font-bold">{(expectedUnits / 1000).toFixed(0)}k units</b>
                <span className="text-[10px] text-indigo-500">Expected ({expectedUnits.toLocaleString()})</span>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <b className="text-slate-900 block font-bold">20k units</b>
                <span className="text-[10px] text-slate-400">Optimistic</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Consumer Test Results & Validation Scores Section */}
      {!simulationResult ? (
        <Card className="p-8 sm:p-10 border-2 border-dashed border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/40 via-white to-white dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-900 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center text-2xl shadow-xs">
            ⚗
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 mb-1">
              <span>🔒 Results Locked</span>
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Launch Consumer Test Simulation to View Results
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Adjust concept parameters above (selling price, package weight, production and marketing unit economics), then click "Launch Consumer Test Simulation" to test against 1,240 verified consumers and view real-time validation telemetry.
            </p>
          </div>
          <div className="pt-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleRunSimulation}
              className="font-bold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 dark:shadow-none px-6 py-2.5 cursor-pointer text-xs"
            >
              ⚗ Launch Consumer Test Simulation
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="p-6 sm:p-7 border-slate-200 bg-white space-y-6 shadow-sm animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Consumer Test Results & Validation Scores
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Simulation Complete
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Live feedback signals gathered from verified IdeaBridge consumer panels.
              </p>
            </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRunSimulation}
            className="text-xs font-bold self-start sm:self-auto"
          >
            {simulationResult ? '↻ Re-Run Test Panel' : '⚗ Run Panel Simulation'}
          </Button>
        </div>

        {/* 4 Summary Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Consumers Tested</span>
            <b className="text-2xl font-black text-slate-900 mt-0.5 block">
              {simulationResult ? simulationResult.consumersTested.toLocaleString() : '1,240'}
            </b>
            <span className="text-[11px] text-slate-500 mt-0.5 block">Verified panel testers</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Positive Purchase Intent</span>
            <b className="text-2xl font-black text-emerald-700 mt-0.5 block">
              {simulationResult ? `${simulationResult.wouldBuyPercentage}%` : '82%'}
            </b>
            <span className="text-[11px] text-emerald-600 mt-0.5 block">High commercial fit</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Median Acceptable Price</span>
            <b className="text-2xl font-black text-indigo-700 mt-0.5 block">
              ₹{simulationResult ? simulationResult.medianPrice : Math.round(conceptLabIdea.sellingPrice * 0.94)}
            </b>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              vs ₹{conceptLabIdea.sellingPrice} proposed MSRP
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Top Consumer Concern</span>
            <b className="text-xs font-extrabold text-slate-900 mt-1 block leading-snug">
              {simulationResult ? simulationResult.topConcern : 'Texture preservation across shelf-life'}
            </b>
            <span className="text-[10px] text-amber-600 font-semibold mt-0.5 block">Watchpoint for R&D</span>
          </div>
        </div>

        {/* Opportunity Scores Breakdown: Marketing Opportunity vs Overall Opportunity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Marketing Opportunity Score Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                Marketing Opportunity Score
              </span>
              <b className="text-xl font-black text-indigo-600">
                {simulationResult ? `${simulationResult.marketingScore}%` : '84%'}
              </b>
            </div>

            <div className="space-y-2 text-xs pt-1">
              {(simulationResult?.marketingBars || [
                { label: 'Concept Clarity', score: 86 },
                { label: 'Packaging Appeal', score: 82 },
                { label: 'Perceived Quality', score: 79 },
                { label: 'Uniqueness vs Competition', score: 88 },
              ]).map((bar, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>{bar.label}</span>
                    <span className="font-bold text-slate-900">{bar.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${bar.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Opportunity Score Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                Overall Opportunity Score
              </span>
              <b className="text-xl font-black text-emerald-700">
                {simulationResult ? `${simulationResult.opportunityScore}%` : '88%'}
              </b>
            </div>

            <div className="space-y-2 text-xs pt-1">
              {(simulationResult?.overallBars || [
                { label: 'Price-to-Value Match', score: 84 },
                { label: 'Repeat Purchase Intent', score: 78 },
                { label: 'Recommendation Potential', score: 85 },
                { label: 'Market Readiness', score: 88 },
              ]).map((bar, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between font-semibold text-slate-700">
                    <span>{bar.label}</span>
                    <span className="font-bold text-slate-900">{bar.score}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                      style={{ width: `${bar.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Recommendation Banner & Action CTA */}
        <div className="p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
              <span>✦</span>
              <span>AI Formulation Recommendation</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl leading-relaxed">
              {simulationResult?.aiRecommendation ||
                `Strong validation signals across 1,240 tested consumers. The ${conceptLabIdea.weightVolume || '35g'} packaging at ₹${conceptLabIdea.sellingPrice} delivers healthy contribution margin (${margin}%) with high purchase intent (82%). Recommended to advance to pilot batch production.`}
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleProceedToPrototype}
            className="font-bold bg-indigo-600 hover:bg-indigo-700 text-white shrink-0 self-start sm:self-auto"
          >
            Proceed to Prototype →
          </Button>
        </div>
      </Card>
      )}
    </div>
  );
};
