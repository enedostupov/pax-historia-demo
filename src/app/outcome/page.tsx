'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { SCENARIOS } from '@/data/scenarios';
import { Metrics, meetsCondition } from '@/types/game';
import MetricsDisplay from '@/components/MetricsDisplay';

function OutcomePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const scenarioId = searchParams.get('scenario');
  const scenario = SCENARIOS.find(s => s.id === scenarioId);

  const metrics: Metrics = {
    stability: parseInt(searchParams.get('stability') || '50'),
    economy: parseInt(searchParams.get('economy') || '50'),
    military: parseInt(searchParams.get('military') || '50'),
  };

  if (!scenario) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Scenario not found</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  const outcome = scenario.outcomes
    .sort((a, b) => a.priority - b.priority)
    .find(o => meetsCondition(metrics, o.condition))
    || scenario.outcomes[scenario.outcomes.length - 1];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">

        <div className="text-center mb-12">
          <div className="text-6xl mb-4">{scenario.country.flag}</div>
          <h1 className="text-4xl font-bold mb-2">{outcome.title}</h1>
          <p className="text-slate-400">{scenario.title} • {scenario.year}</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Timeline</h2>
          <p className="text-slate-300 leading-relaxed text-lg mb-6">
            {outcome.description}
          </p>

          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-lg font-semibold mb-2 text-slate-400">Historical Comparison</h3>
            <p className="text-slate-300 leading-relaxed">
              {outcome.historicalComparison}
            </p>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Final State</h2>
          <MetricsDisplay metrics={metrics} />
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => router.push(`/game?scenario=${scenario.id}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={() => router.push('/')}
            className="bg-slate-700 hover:bg-slate-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}

export default function OutcomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800" />}>
      <OutcomePageContent />
    </Suspense>
  );
}
