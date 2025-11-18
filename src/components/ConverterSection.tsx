import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { useState } from 'react'
import { encode } from '@toon-format/toon'
import { 
  Code2, 
  Sparkles,
  Copy,
  Download,
  RotateCcw,
  CheckCircle,
  Upload,
  Lightbulb
} from 'lucide-react'

// Example JSON data for the live demo
const exampleData = {
  users: [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin", active: true },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user", active: false },
    { id: 3, name: "Carol Davis", email: "carol@example.com", role: "moderator", active: true }
  ],
  metadata: {
    total: 3,
    page: 1,
    generated: "2024-11-18T00:30:00Z"
  }
}

export function ConverterSection() {
  const [jsonInput, setJsonInput] = useState(JSON.stringify(exampleData, null, 2))
  const [toonOutput, setToonOutput] = useState('')
  const [inputTokens, setInputTokens] = useState(0)
  const [outputTokens, setOutputTokens] = useState(0)
  const [copied, setCopied] = useState(false)

  // Simple token counting function (approximation)
  const countTokens = (text: string) => {
    return Math.ceil(text.length / 4) // Rough GPT token estimation
  }

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(jsonInput)
      const converted = encode(parsed)
      setToonOutput(converted)
      setInputTokens(countTokens(jsonInput))
      setOutputTokens(countTokens(converted))
    } catch (error) {
      setToonOutput('Error: Invalid JSON format')
      setInputTokens(0)
      setOutputTokens(0)
    }
  }

  const handleCopy = async () => {
    if (toonOutput) {
      await navigator.clipboard.writeText(toonOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleReset = () => {
    setJsonInput(JSON.stringify(exampleData, null, 2))
    setToonOutput('')
    setInputTokens(0)
    setOutputTokens(0)
  }

  const handleDownload = () => {
    if (toonOutput) {
      const blob = new Blob([toonOutput], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'converted.toon'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const savings = inputTokens > 0 ? ((inputTokens - outputTokens) / inputTokens * 100) : 0

  return (
    <section id="converter" className="py-24 bg-linear-to-b from-background to-accent/5" aria-labelledby="converter-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="converter-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Try it Live
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See the power of TOON format in action. Convert your JSON data and watch the token savings.
          </p>
        </header>

        {/* Control Panel */}
        <div className="flex flex-wrap gap-4 mb-6 justify-center">
          <button
            onClick={handleConvert}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <RotateCcw size={18} />
            Convert to TOON
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
          >
            <Upload size={18} />
            Reset Example
          </button>
          {toonOutput && (
            <>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                {copied ? <CheckCircle size={18} className="text-green-600" /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy TOON'}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Download size={18} />
                Download
              </button>
            </>
          )}
        </div>

        {/* Statistics */}
        {inputTokens > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="relative overflow-hidden">
              <BorderBeam />
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  <NumberTicker value={inputTokens} />
                </div>
                <div className="text-sm text-muted-foreground">JSON Tokens</div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <BorderBeam />
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  <NumberTicker value={outputTokens} />
                </div>
                <div className="text-sm text-muted-foreground">TOON Tokens</div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <BorderBeam />
              <CardContent className="p-6 text-center">
                <div className="text-2xl font-bold text-accent mb-1">
                  <NumberTicker value={Math.round(savings)} />%
                </div>
                <div className="text-sm text-muted-foreground">Token Savings</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Editor Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* JSON Input */}
          <Card className="relative overflow-hidden">
            <BorderBeam />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Code2 size={20} />
                JSON Input
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full h-96 p-4 border border-border rounded-lg font-mono text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Paste your JSON here..."
                  style={{
                    lineHeight: '1.5',
                    fontSize: '13px'
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* TOON Output */}
          <Card className="relative overflow-hidden">
            <BorderBeam />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Sparkles size={20} />
                TOON Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <textarea
                  value={toonOutput}
                  readOnly
                  className="w-full h-96 p-4 border border-border rounded-lg font-mono text-sm bg-muted/50 resize-none focus:outline-none"
                  placeholder="TOON format will appear here..."
                  style={{
                    lineHeight: '1.5',
                    fontSize: '13px'
                  }}
                />
                {!toonOutput && (
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Code2 size={48} className="mx-auto mb-3 opacity-50" />
                      <p>Click "Convert to TOON" to see the result</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversion Tips */}
        <div className="mt-8 p-6 bg-accent/20 rounded-lg border border-accent/30">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Lightbulb size={20} className="text-accent" />
            Pro Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• TOON format reduces token count by eliminating redundant structure markers</li>
            <li>• Best results with nested objects and arrays containing similar structures</li>
            <li>• The more repetitive your JSON structure, the greater the token savings</li>
            <li>• Try pasting your own API responses to see real-world savings</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
