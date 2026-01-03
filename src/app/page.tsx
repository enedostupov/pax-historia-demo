'use client';

import { SCENARIOS } from '@/data/scenarios';
import Link from 'next/link';

export default function HomePage() {
  const scenario = SCENARIOS[0];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Alternate History Simulator
          </h1>
          <p className="text-xl text-slate-300">
            Rewrite history. Make the call. Face the consequences.
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700 hover:border-slate-600 transition-colors">
          <div className="flex items-start gap-6">
            <div className="text-6xl">{scenario.country.flag}</div>
            <div className="flex-1">
              <div className="text-sm text-slate-400 mb-2">
                {scenario.country.name} • {scenario.year}
              </div>
              <h2 className="text-3xl font-bold mb-3">
                {scenario.title}
              </h2>
              <p className="text-slate-300 mb-6">
                {scenario.country.description}
              </p>

              <Link
                href={`/game?scenario=${scenario.id}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Start Scenario →
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 text-slate-400 text-sm">
          Built as a demo for Pax Historia • ~9 hours
        </div>
      </div>
    </main>
  );
}
