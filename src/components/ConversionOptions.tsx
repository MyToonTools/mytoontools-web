import './ConversionOptions.css'

export type Direction = 'json-to-toon' | 'toon-to-json'
export type Delimiter = ',' | '\t' | '|'

interface ConversionOptionsProps {
  direction: Direction
  onDirectionChange: (direction: Direction) => void
  delimiter: Delimiter
  onDelimiterChange: (delimiter: Delimiter) => void
  keyFolding: 'off' | 'safe'
  onKeyFoldingChange: (keyFolding: 'off' | 'safe') => void
}

export function ConversionOptions({
  direction,
  onDirectionChange,
  delimiter,
  onDelimiterChange,
  keyFolding,
  onKeyFoldingChange,
}: ConversionOptionsProps) {
  return (
    <div className="options">
      <div className="option-group">
        <label className="option-label">Direction:</label>
        <div className="button-group">
          <button
            className={`option-button ${direction === 'json-to-toon' ? 'active' : ''}`}
            onClick={() => onDirectionChange('json-to-toon')}
          >
            JSON → TOON
          </button>
          <button
            className={`option-button ${direction === 'toon-to-json' ? 'active' : ''}`}
            onClick={() => onDirectionChange('toon-to-json')}
          >
            TOON → JSON
          </button>
        </div>
      </div>

      {direction === 'json-to-toon' && (
        <>
          <div className="option-group">
            <label className="option-label">Delimiter:</label>
            <div className="button-group">
              <button
                className={`option-button ${delimiter === ',' ? 'active' : ''}`}
                onClick={() => onDelimiterChange(',')}
              >
                Comma
              </button>
              <button
                className={`option-button ${delimiter === '\t' ? 'active' : ''}`}
                onClick={() => onDelimiterChange('\t')}
              >
                Tab
              </button>
              <button
                className={`option-button ${delimiter === '|' ? 'active' : ''}`}
                onClick={() => onDelimiterChange('|')}
              >
                Pipe
              </button>
            </div>
          </div>

          <div className="option-group">
            <label className="option-label">Key Folding:</label>
            <div className="button-group">
              <button
                className={`option-button ${keyFolding === 'off' ? 'active' : ''}`}
                onClick={() => onKeyFoldingChange('off')}
              >
                Off
              </button>
              <button
                className={`option-button ${keyFolding === 'safe' ? 'active' : ''}`}
                onClick={() => onKeyFoldingChange('safe')}
              >
                Safe
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
