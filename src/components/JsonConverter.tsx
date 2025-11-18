import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { useState } from 'react'
import { encode } from '@toon-format/toon'
import { 
  Sparkles,
  Copy,
  Download,
  RotateCcw,
  CheckCircle,
  Upload,
  Lightbulb,
  FileJson,
  Zap,
  TrendingDown,
  Clock,
  Shield,
  Loader2
} from 'lucide-react'

// Enhanced example JSON data for the dedicated page
const jsonExamples = {
  simple: {
    name: "Simple Object",
    data: {
      name: "John Doe",
      age: 30,
      email: "john@example.com"
    }
  },
  array: {
    name: "User Array",
    data: {
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
  },
  complex: {
    name: "API Response",
    data: {
      status: "success",
      data: {
        products: [
          {
            id: 101,
            name: "Laptop Pro",
            category: "electronics",
            price: 1299.99,
            specs: {
              cpu: "Intel i7",
              ram: "16GB",
              storage: "512GB SSD"
            },
            reviews: [
              { user: "john_d", rating: 5, comment: "Excellent performance" },
              { user: "tech_reviewer", rating: 4, comment: "Great value for money" }
            ]
          },
          {
            id: 102,
            name: "Wireless Mouse",
            category: "accessories",
            price: 49.99,
            specs: {
              type: "optical",
              wireless: true,
              battery: "rechargeable"
            },
            reviews: [
              { user: "office_worker", rating: 4, comment: "Comfortable and reliable" }
            ]
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          hasNext: false
        }
      },
      timestamp: "2024-11-18T00:30:00Z"
    }
  }
}

export function JsonConverter() {
  const [activeExample, setActiveExample] = useState('array')
  const [jsonInput, setJsonInput] = useState(JSON.stringify(jsonExamples.array.data, null, 2))
  const [toonOutput, setToonOutput] = useState('')
  const [inputTokens, setInputTokens] = useState(0)
  const [outputTokens, setOutputTokens] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | undefined>()

  // Simple token counting function (approximation)
  const countTokens = (text: string) => {
    return Math.ceil(text.length / 4) // Rough GPT token estimation
  }

  const handleExampleChange = (exampleKey: string) => {
    setActiveExample(exampleKey)
    setJsonInput(JSON.stringify(jsonExamples[exampleKey as keyof typeof jsonExamples].data, null, 2))
    setToonOutput('')
    setInputTokens(0)
    setOutputTokens(0)
    setError(undefined)
  }

  const handleConvert = async () => {
    if (!jsonInput.trim()) return
    
    setIsConverting(true)
    setError(undefined)
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300))
    
    try {
      const parsed = JSON.parse(jsonInput)
      const converted = encode(parsed)
      setToonOutput(converted)
      setInputTokens(countTokens(jsonInput))
      setOutputTokens(countTokens(converted))
    } catch (error) {
      setError('Invalid JSON format. Please check your syntax.')
      setToonOutput('')
      setInputTokens(0)
      setOutputTokens(0)
    } finally {
      setIsConverting(false)
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
    const currentExample = jsonExamples[activeExample as keyof typeof jsonExamples]
    setJsonInput(JSON.stringify(currentExample.data, null, 2))
    setToonOutput('')
    setInputTokens(0)
    setOutputTokens(0)
    setCopied(false)
    setError(undefined)
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
    <div className="space-y-8">
      {/* Example Selector */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-4">Try Different Examples</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {Object.entries(jsonExamples).map(([key, example]) => (
            <Button
              key={key}
              onClick={() => handleExampleChange(key)}
              variant={activeExample === key ? "default" : "outline"}
              size="sm"
              className="flex items-center gap-2"
            >
              <FileJson size={16} />
              {example.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Control Panel */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={handleConvert}
          disabled={isConverting}
          size="lg"
          className="flex items-center gap-2 px-8 py-3"
        >
          {isConverting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <RotateCcw size={18} />
          )}
          {isConverting ? 'Converting...' : 'Convert to TOON'}
        </Button>
        
        <Button
          onClick={handleReset}
          variant="outline"
          size="lg"
          className="flex items-center gap-2 px-8 py-3"
        >
          <Upload size={18} />
          Reset Example
        </Button>
        
        {toonOutput && (
          <>
            <Button
              onClick={handleCopy}
              variant="outline"
              size="lg"
              className="flex items-center gap-2 px-8 py-3"
            >
              {copied ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <Copy size={18} />
              )}
              {copied ? 'Copied!' : 'Copy TOON'}
            </Button>
            
            <Button
              onClick={handleDownload}
              variant="outline"
              size="lg"
              className="flex items-center gap-2 px-8 py-3"
            >
              <Download size={18} />
              Download .toon
            </Button>
          </>
        )}
      </div>

      {/* Statistics */}
      {inputTokens > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
          <Card className="relative overflow-hidden">
            <BorderBeam />
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                $<NumberTicker value={Math.round((inputTokens - outputTokens) * 0.00001 * 100) / 100} />
              </div>
              <div className="text-sm text-muted-foreground">Cost Savings*</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Editor Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* JSON Input */}
        <Card className="relative overflow-hidden">
          <BorderBeam />
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <FileJson size={24} />
              JSON Input
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <textarea
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full h-[500px] p-4 border border-border rounded-lg font-mono text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Paste your JSON data here..."
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
            <CardTitle className="flex items-center gap-2 text-xl">
              <Sparkles size={24} />
              TOON Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <textarea
                value={error || toonOutput}
                readOnly
                className={`w-full h-[500px] p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none ${
                  error ? 'bg-red-50 text-red-700 border-red-200' : 'bg-muted/50'
                }`}
                placeholder="TOON format will appear here..."
                style={{
                  lineHeight: '1.5',
                  fontSize: '13px'
                }}
              />
              {!toonOutput && !error && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <FileJson size={48} className="mx-auto mb-3 opacity-50" />
                    <p className="text-lg font-medium">Ready to Convert</p>
                    <p className="text-sm">Click "Convert to TOON" to see the magic</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features & Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <TrendingDown className="w-8 h-8 mx-auto mb-3 text-green-500" />
            <h4 className="font-semibold mb-2">Token Reduction</h4>
            <p className="text-sm text-muted-foreground">
              Average 30-60% reduction in token count for JSON data
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Zap className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
            <h4 className="font-semibold mb-2">Lightning Fast</h4>
            <p className="text-sm text-muted-foreground">
              Convert massive JSON files in milliseconds
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="w-8 h-8 mx-auto mb-3 text-blue-500" />
            <h4 className="font-semibold mb-2">100% Private</h4>
            <p className="text-sm text-muted-foreground">
              All processing happens in your browser
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-3 text-purple-500" />
            <h4 className="font-semibold mb-2">Real-time</h4>
            <p className="text-sm text-muted-foreground">
              See results instantly as you type
            </p>
          </CardContent>
        </Card>
      </div>

      {/* JSON-specific Tips */}
      <Card className="bg-accent/10 border-accent/30">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lightbulb size={20} className="text-accent" />
            JSON Optimization Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground mb-2">Best Results:</h4>
              <ul className="space-y-1">
                <li>• Arrays with similar object structures</li>
                <li>• API responses with metadata</li>
                <li>• Nested objects with repeated patterns</li>
                <li>• Large datasets with consistent schemas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Optimization Notes:</h4>
              <ul className="space-y-1">
                <li>• Longer property names save more tokens</li>
                <li>• Repeated structures benefit most</li>
                <li>• Deep nesting increases savings</li>
                <li>• Arrays of objects show dramatic improvements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground">
        <p>* Cost savings based on GPT-4 pricing ($0.01/1K tokens). Actual savings may vary.</p>
      </div>
    </div>
  )
}
