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

  // Update page title based on direction
  useEffect(() => {
    const title = direction === 'json-to-toon' 
      ? 'JSON to TOON Converter - Free Online Tool'
      : 'TOON to JSON Converter - Free Online Tool'
    document.title = title
  }, [direction])

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
      
      {/* SEO Content (hidden but crawlable) */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
        <h1>JSON to TOON Converter - Free Online Tool for Token Optimization</h1>
        <p>
          Convert JSON to TOON format online for free. TOON (Token-Oriented Object Notation) 
          reduces LLM token usage by 30-60% compared to standard JSON. Perfect for ChatGPT, 
          Claude, Google Gemini, and other AI language models.
        </p>
        <h2>Features</h2>
        <ul>
          <li>Free JSON to TOON converter with real-time results</li>
          <li>TOON to JSON conversion support</li>
          <li>Token estimation and savings calculator</li>
          <li>Multiple delimiter options (comma, tab, pipe)</li>
          <li>Key folding for nested data structures</li>
          <li>No registration or sign-up required</li>
        </ul>
        <h2>Why Use TOON Format?</h2>
        <p>
          TOON format is specifically designed for Large Language Models (LLMs) and AI prompts. 
          By reducing token count, you can save money on API calls, fit more data in context 
          windows, and improve response times. TOON achieves this through efficient tabular 
          representation of uniform arrays and minimal syntax overhead.
        </p>
        <h2>How to Convert JSON to TOON</h2>
        <ol>
          <li>Paste your JSON data into the input field</li>
          <li>Select your preferred delimiter (comma, tab, or pipe)</li>
          <li>Choose key folding options if needed</li>
          <li>View the TOON output instantly</li>
          <li>See token savings in real-time</li>
        </ol>
      </div>
    </div>
  )
}

export default App
