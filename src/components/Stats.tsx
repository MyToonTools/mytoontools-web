import './Stats.css'

interface StatsProps {
  inputTokens: number
  outputTokens: number
  savings: number
}

export function Stats({ inputTokens, outputTokens, savings }: StatsProps) {
  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-label">Input Tokens:</span>
        <span className="stat-value">{inputTokens.toLocaleString()}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Output Tokens:</span>
        <span className="stat-value">{outputTokens.toLocaleString()}</span>
      </div>
      <div className="stat-item highlight">
        <span className="stat-label">Savings:</span>
        <span className={`stat-value ${savings > 0 ? 'positive' : savings < 0 ? 'negative' : ''}`}>
          {savings > 0 ? '−' : savings < 0 ? '+' : ''}{Math.abs(savings).toFixed(1)}%
        </span>
      </div>
    </div>
  )
}
