'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { SCENARIOS } from '@/data/scenarios';
import { Metrics } from '@/types/game';
import MetricsDisplay from '@/components/MetricsDisplay';

function GamePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const scenarioId = searchParams.get('scenario');

  useEffect(() => {
    if (!scenarioId) {
      router.push('/');
    }
  }, [scenarioId, router]);

  const scenario = SCENARIOS.find(s => s.id === scenarioId);

  const [currentDecisionIndex, setCurrentDecisionIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>(
    scenario?.initialMetrics || { stability: 50, economy: 50, military: 50 }
  );
  const [choiceHistory, setChoiceHistory] = useState<string[]>([]);

  if (!scenarioId) {
    return null;
  }

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

  const currentDecision = scenario.decisions[currentDecisionIndex];
  const isLastDecision = currentDecisionIndex === scenario.decisions.length - 1;

  const handleChoice = (choiceId: string) => {
    const choice = currentDecision.choices.find(c => c.id === choiceId);
    if (!choice) return;

    const newMetrics = {
      stability: Math.max(0, Math.min(100, metrics.stability + (choice.impact.stability || 0))),
      economy: Math.max(0, Math.min(100, metrics.economy + (choice.impact.economy || 0))),
      military: Math.max(0, Math.min(100, metrics.military + (choice.impact.military || 0))),
    };

    setMetrics(newMetrics);
    setChoiceHistory([...choiceHistory, choiceId]);

    if (isLastDecision) {
      const queryParams = new URLSearchParams({
        scenario: scenario.id,
        stability: newMetrics.stability.toString(),
        economy: newMetrics.economy.toString(),
        military: newMetrics.military.toString(),
      });
      router.push(`/outcome?${queryParams.toString()}`);
    } else {
      setCurrentDecisionIndex(currentDecisionIndex + 1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{scenario.title}</h1>
              <p className="text-slate-400">
                Decision {currentDecisionIndex + 1} of {scenario.decisions.length}
              </p>
            </div>
            <div className="text-4xl">{scenario.country.flag}</div>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentDecisionIndex + 1) / scenario.decisions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="md:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 sticky top-8">
              <h3 className="text-lg font-semibold mb-4">National Metrics</h3>
              <MetricsDisplay metrics={metrics} />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">

            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h2 className="text-2xl font-bold mb-3">{currentDecision.title}</h2>
              <p className="text-slate-300 leading-relaxed">{currentDecision.context}</p>
            </div>

            <div className="space-y-4">
              {currentDecision.choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice.id)}
                  className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500 rounded-lg p-6 text-left transition-all group"
                >
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                    {choice.text}
                  </h3>
                  <p className="text-slate-400">{choice.description}</p>

                  <div className="mt-3 flex gap-3 text-sm">
                    {choice.impact.stability !== undefined && (
                      <span className={choice.impact.stability > 0 ? 'text-green-400' : 'text-red-400'}>
                        Stability {choice.impact.stability > 0 ? '+' : ''}{choice.impact.stability}
                      </span>
                    )}
                    {choice.impact.economy !== undefined && (
                      <span className={choice.impact.economy > 0 ? 'text-green-400' : 'text-red-400'}>
                        Economy {choice.impact.economy > 0 ? '+' : ''}{choice.impact.economy}
                      </span>
                    )}
                    {choice.impact.military !== undefined && (
                      <span className={choice.impact.military > 0 ? 'text-green-400' : 'text-red-400'}>
                        Military {choice.impact.military > 0 ? '+' : ''}{choice.impact.military}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800" />}>
      <GamePageContent />
    </Suspense>
  );
}
