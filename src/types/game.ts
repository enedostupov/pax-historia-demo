// Game data types and helper functions

export type Country = {
  id: string;
  name: string;
  flag: string;
  description: string;
};

export type Metrics = {
  stability: number;
  economy: number;
  military: number;
};

export type Choice = {
  id: string;
  text: string;
  description: string;
  impact: Partial<Metrics>;
};

export type Decision = {
  id: string;
  title: string;
  context: string;
  choices: Choice[];
};

export type OutcomeCondition = {
  minStability?: number;
  maxStability?: number;
  minEconomy?: number;
  maxEconomy?: number;
  minMilitary?: number;
  maxMilitary?: number;
};

export type Outcome = {
  priority: number;
  condition: OutcomeCondition;
  title: string;
  description: string;
  historicalComparison: string;
};

export type Scenario = {
  id: string;
  title: string;
  year: number;
  country: Country;
  initialMetrics: Metrics;
  decisions: Decision[];
  outcomes: Outcome[];
};

export function meetsCondition(metrics: Metrics, condition: OutcomeCondition): boolean {
  if (condition.minStability !== undefined && metrics.stability < condition.minStability) return false;
  if (condition.maxStability !== undefined && metrics.stability > condition.maxStability) return false;
  if (condition.minEconomy !== undefined && metrics.economy < condition.minEconomy) return false;
  if (condition.maxEconomy !== undefined && metrics.economy > condition.maxEconomy) return false;
  if (condition.minMilitary !== undefined && metrics.military < condition.minMilitary) return false;
  if (condition.maxMilitary !== undefined && metrics.military > condition.maxMilitary) return false;
  return true;
}
