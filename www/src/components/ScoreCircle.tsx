
interface ScoreCircleProps {
  width: number;
  height: number;
  score: number; // Note: score is currently unused in the rendering logic
  label?: string;
}

export function ScoreCircle({ width, height, score, label }: ScoreCircleProps) {
  const viewBox = `0 0 ${width} ${height}`;
  const radius = Math.min(width, height) * 0.45;
  const centerX = width / 2;
  const centerY = height / 2;
  const strokeWidth = width > 100 ? 5 : 4;
  const circumference = 2 * Math.PI * radius;

  // TODO: Implement animation logic to update stroke-dashoffset based on the score prop
  const strokeDashoffset = circumference; // Placeholder, should be calculated based on score

  return (
    <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
      <svg className="w-full h-full" viewBox={viewBox}>
        <circle
          className="fill-green-500/10"
          r={radius}
          cx={centerX}
          cy={centerY}
        ></circle>
        <circle
          className="fill-none stroke-green-500 score-circle"
          r={radius}
          cx={centerX}
          cy={centerY}
          style={{ strokeWidth, strokeDasharray: circumference, strokeDashoffset }} // Use calculated strokeDashoffset here
        ></circle>
      </svg>
      <span
        className="score-value absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium text-green-500 font-mono"
        style={{ fontSize: width > 100 ? '1.875rem' : '1.125rem' }}
      >
        {/* TODO: Display the actual score prop */}
        0 
      </span>
      {label && (
        <span className="text-sm text-gray-500 dark:text-gray-400 absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
} 