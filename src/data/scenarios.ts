// src/data/scenarios.ts

import { Country, Scenario } from '@/types/game';

export const USA: Country = {
  id: 'usa',
  name: 'United States',
  flag: '🇺🇸',
  description: 'Superpower facing nuclear crisis'
};

// Cuban Missile Crisis (1962) - historical scenario with 3 decision points
export const CUBAN_MISSILE_CRISIS: Scenario = {
  id: 'cuban-missile-crisis',
  title: 'Cuban Missile Crisis',
  year: 1962,
  country: USA,
  initialMetrics: {
    stability: 70,
    economy: 80,
    military: 85
  },
  decisions: [
    {
      id: 'decision-1',
      title: 'Soviet missiles discovered in Cuba',
      context: 'U-2 spy planes have photographed Soviet nuclear missiles in Cuba, just 90 miles from Florida. Your advisors are divided on how to respond.',
      choices: [
        {
          id: 'blockade',
          text: 'Naval Blockade',
          description: 'Quarantine Cuba to prevent more missiles',
          impact: { stability: -5, military: 10 }
        },
        {
          id: 'airstrike',
          text: 'Surgical Air Strike',
          description: 'Destroy missile sites immediately',
          impact: { stability: -15, military: 5, economy: -10 }
        },
        {
          id: 'diplomacy',
          text: 'Direct Negotiation',
          description: 'Open back-channel talks with Khrushchev',
          impact: { stability: 5, military: -5 }
        }
      ]
    },
    {
      id: 'decision-2',
      title: 'Soviet ships approach blockade',
      context: 'Soviet vessels are approaching the quarantine line. Will they stop or cross? The world watches.',
      choices: [
        {
          id: 'hold-firm',
          text: 'Hold Firm',
          description: 'Maintain blockade, prepare for confrontation',
          impact: { stability: -10, military: 15 }
        },
        {
          id: 'offer-deal',
          text: 'Offer Deal',
          description: 'Propose secret removal of Turkish missiles',
          impact: { stability: 10, economy: -5 }
        },
        {
          id: 'UN-intervention',
          text: 'UN Intervention',
          description: 'Escalate through United Nations',
          impact: { stability: 0, military: -5 }
        }
      ]
    },
    {
      id: 'decision-3',
      title: 'Final Resolution',
      context: 'Tensions peak. Both nations are on the brink. How do you end this crisis?',
      choices: [
        {
          id: 'public-deal',
          text: 'Public Agreement',
          description: 'Soviet withdrawal, US pledges no Cuba invasion',
          impact: { stability: 20, economy: 10 }
        },
        {
          id: 'secret-deal',
          text: 'Secret Deal',
          description: 'Trade Cuban missiles for Turkish missiles',
          impact: { stability: 15, military: -10 }
        },
        {
          id: 'military-ready',
          text: 'Show of Force',
          description: 'Prepare for potential conflict',
          impact: { stability: -20, military: 20, economy: -15 }
        }
      ]
    }
  ],
  outcomes: [
    {
      priority: 1,
      condition: { minStability: 70, minEconomy: 70 },
      title: 'Diplomatic Victory',
      description: 'You navigated the crisis with steady diplomacy. The Soviet Union withdrew missiles, and both superpowers stepped back from the brink. Your leadership is praised globally.',
      historicalComparison: 'Close to historical outcome: Kennedy used blockade + secret diplomacy to resolve the crisis peacefully.'
    },
    {
      priority: 2,
      condition: { minMilitary: 90 },
      title: 'Military Escalation',
      description: 'Your aggressive stance pushed the Soviets to withdraw, but at a cost. International relations are strained, and the arms race accelerates.',
      historicalComparison: 'More aggressive than history: Kennedy avoided direct military confrontation.'
    },
    {
      priority: 3,
      condition: { maxStability: 49 },
      title: 'Crisis Mismanaged',
      description: 'Your decisions led to chaos. Either war broke out, or the political fallout destroyed your presidency. The world teeters on edge.',
      historicalComparison: 'Worse than history: The real crisis was resolved through careful calibration.'
    },
    {
      priority: 999, // Fallback
      condition: {},
      title: 'Uncertain Resolution',
      description: 'The crisis ends, but the outcome is unclear. Both nations survive, but trust is damaged.',
      historicalComparison: 'Different from history: Kennedy achieved a clearer resolution.'
    }
  ]
};

export const SCENARIOS = [CUBAN_MISSILE_CRISIS];
