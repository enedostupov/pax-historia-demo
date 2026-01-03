import { Metrics } from '@/types/game';

type Props = {
  metrics: Metrics;
  showLabels?: boolean;
};

export default function MetricsDisplay({ metrics, showLabels = true }: Props) {
  const metricsList = [
    {
      key: 'stability',
      label: 'Stability',
      value: metrics.stability,
      color: 'bg-blue-500'
    },
    {
      key: 'economy',
      label: 'Economy',
      value: metrics.economy,
      color: 'bg-green-500'
    },
    {
      key: 'military',
      label: 'Military',
      value: metrics.military,
      color: 'bg-red-500'
    },
  ];

  return (
    <div className="space-y-4">
      {metricsList.map((metric) => (
        <div key={metric.key}>
          {showLabels && (
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-slate-300">
                {metric.label}
              </span>
              <span className="text-sm font-bold text-white">
                {metric.value}
              </span>
            </div>
          )}
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${metric.color} transition-all duration-500 ease-out`}
              style={{ width: `${metric.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
