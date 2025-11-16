import { useState, useEffect } from 'react'
import { encode, decode } from '@toon-format/toon'
import { Header } from './components/Header'
import { ConversionOptions, type Direction, type Delimiter } from './components/ConversionOptions'
import { EditorPanel } from './components/EditorPanel'
import { Stats } from './components/Stats'
import './App.css'

// Simple token estimator (approximation)
function estimateTokens(text: string): number {
  // Rough approximation: ~4 chars per token
  return Math.ceil(text.length / 4)
}

function App() {
  const [direction, setDirection] = useState<Direction>('json-to-toon')
  const [delimiter, setDelimiter] = useState<Delimiter>(',')
  const [keyFolding, setKeyFolding] = useState<'off' | 'safe'>('off')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  // Convert whenever input or options change
  useEffect(() => {
    if (!input.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      if (direction === 'json-to-toon') {
        const parsed = JSON.parse(input)
        const result = encode(parsed, {
          delimiter,
          keyFolding,
          indent: 2,
        })
        setOutput(result)
        setError('')
      } else {
        const parsed = decode(input, { indent: 2 })
        const result = JSON.stringify(parsed, null, 2)
        setOutput(result)
        setError('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Conversion failed')
      setOutput('')
    }
  }, [input, direction, delimiter, keyFolding])

  const inputTokens = estimateTokens(input)
  const outputTokens = estimateTokens(output)
  const savings = input && output ? ((inputTokens - outputTokens) / inputTokens) * 100 : 0

  const inputPlaceholder = direction === 'json-to-toon' 
    ? `{\n  "users": [\n    { "id": 1, "name": "Alice", "role": "admin" },\n    { "id": 2, "name": "Bob", "role": "user" }\n  ]\n}`
    : `users[2]{id,name,role}:\n  1,Alice,admin\n  2,Bob,user`

  return (
    <div className="app">
      <Header />
      <ConversionOptions
        direction={direction}
        onDirectionChange={setDirection}
        delimiter={delimiter}
        onDelimiterChange={setDelimiter}
        keyFolding={keyFolding}
        onKeyFoldingChange={setKeyFolding}
      />
      <div className="editor-container">
        <EditorPanel
          title={direction === 'json-to-toon' ? 'JSON Input' : 'TOON Input'}
          value={input}
          onChange={setInput}
          placeholder={inputPlaceholder}
          error={error}
        />
        <EditorPanel
          title={direction === 'json-to-toon' ? 'TOON Output' : 'JSON Output'}
          value={output}
          onChange={() => {}}
          readOnly
        />
      </div>
      {input && output && !error && (
        <Stats
          inputTokens={inputTokens}
          outputTokens={outputTokens}
          savings={savings}
        />
      )}
    </div>
  )
}

export default App
