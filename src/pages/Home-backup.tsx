import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { motion } from 'motion/react'
import { useState } from 'react'
import { encode } from '@toon-format/toon'
import { 
  FileJson, 
  FileSpreadsheet, 
  Database, 
  Code2, 
  Zap, 
  TrendingDown,
  ArrowRight,
  Sparkles,
  Shield,
  Cpu,
  Globe,
  BarChart3,
  Copy,
  Download,
  RotateCcw,
  CheckCircle,
  Upload,
  Lightbulb
} from 'lucide-react'

const converterTools = [
  {
    id: 'json-to-toon',
    title: 'JSON to TOON',
    description: 'Convert JSON objects to token-efficient TOON format',
    icon: FileJson,
    href: '/json-to-toon',
    savings: '30-60%',
    popular: true,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'csv-to-toon',
    title: 'CSV to TOON',
    description: 'Transform CSV data into structured TOON format',
    icon: FileSpreadsheet,
    href: '/csv-to-toon',
    savings: '20-40%',
    popular: false,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'xml-to-toon',
    title: 'XML to TOON',
    description: 'Convert XML documents to compact TOON notation',
    icon: Code2,
    href: '/xml-to-toon',
    savings: '40-70%',
    popular: false,
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'api-access',
    title: 'API Access',
    description: 'Programmatic access to all TOON converters',
    icon: Database,
    href: '/api',
    savings: 'Custom',
    popular: true,
    color: 'from-orange-500 to-red-500',
  },
]

const features = [
  {
    id: 'token-efficiency',
    title: 'Massive Token Savings',
    description: 'Reduce LLM costs by up to 70% with our optimized TOON format. Perfect for large datasets and frequent API calls.',
    icon: TrendingDown,
    stats: { value: 70, suffix: '%', label: 'Token Reduction' },
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'lightning-fast',
    title: 'Lightning Fast Processing',
    description: 'Convert massive datasets in seconds. Our optimized algorithms handle files up to 100MB instantly.',
    icon: Zap,
    stats: { value: 99, suffix: '%', label: 'Faster Processing' },
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 'universal-support',
    title: 'Universal LLM Support',
    description: 'Compatible with ChatGPT, Claude, GPT-4, and all major language models. No vendor lock-in.',
    icon: Globe,
    stats: { value: 15, suffix: '+', label: 'LLM Platforms' },
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'developer-friendly',
    title: 'Developer-First API',
    description: 'RESTful API with comprehensive documentation. SDKs available for Python, JavaScript, and more.',
    icon: Code2,
    stats: { value: 5, suffix: '+', label: 'Programming Languages' },
    color: 'from-purple-500 to-violet-500',
  },
  {
    id: 'enterprise-ready',
    title: 'Enterprise Security',
    description: 'SOC 2 compliant with end-to-end encryption. No data retention, complete privacy guaranteed.',
    icon: Shield,
    stats: { value: 100, suffix: '%', label: 'Data Privacy' },
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 'real-time',
    title: 'Real-time Conversion',
    description: 'Stream large files with real-time progress. Handle gigabyte datasets without memory issues.',
    icon: Cpu,
    stats: { value: 1, suffix: 'GB+', label: 'File Support' },
    color: 'from-indigo-500 to-purple-500',
  },
]

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
    generated: "2025-11-18T00:30:00Z"
  }
}

export default function Home() {
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main content with top padding to account for fixed navbar */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden py-24 sm:py-32" aria-labelledby="hero-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Hero Content */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <Badge variant="secondary" className="mb-4 px-3 py-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Multiple Format Support
                </Badge>
                
                <h1 id="hero-heading" className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                  Convert Any Data to{' '}
                  <AnimatedGradientText
                    className="inline-block text-4xl sm:text-6xl lg:text-7xl font-bold"
                    colorFrom="#3b82f6"
                    colorTo="#8b5cf6"
                  >
                    TOON Format
                  </AnimatedGradientText>
                </h1>
                
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  Professional suite of TOON converters and API tools. Transform JSON, CSV, XML and more 
                  into token-efficient format that <strong>reduces LLM costs by up to 70%</strong>.
                </p>
              </motion.div>

              {/* Quick Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center items-center gap-8 mb-12 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span>Up to 70% token reduction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span>Instant conversion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-500" />
                  <span>API available</span>
                </div>
              </motion.div>
            </div>

            {/* Converter Tools Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              {converterTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                  <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 h-full">
                    <BorderBeam 
                      size={120} 
                      duration={8} 
                      colorFrom="#3b82f6" 
                      colorTo="#8b5cf6"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    
                    <CardHeader className="text-center pb-3">
                      <div className={`mx-auto mb-3 w-12 h-12 rounded-lg bg-linear-to-br ${tool.color} flex items-center justify-center`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      <CardTitle className="text-lg font-semibold flex items-center justify-center gap-2">
                        {tool.title}
                        {tool.popular && (
                          <Badge variant="default" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </CardTitle>
                      
                      <CardDescription className="text-sm">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-green-500 mb-1">
                          {tool.savings}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Token Savings
                        </div>
                      </div>
                      
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm" 
                        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                      >
                        <a href={tool.href}>
                          Try Now
                          <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Main CTA Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ShimmerButton
                  shimmerColor="#ffffff"
                  shimmerSize="0.1em"
                  shimmerDuration="2s"
                  borderRadius="8px"
                  background="rgba(59, 130, 246, 1)"
                  className="px-8 py-3 text-base font-semibold bg-linear-to-r from-blue-500 to-purple-500"
                >
                  <a href="/json-to-toon" className="flex items-center gap-2">
                    Start Converting
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </ShimmerButton>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild
                  className="px-8 py-3 text-base"
                >
                  <a href="#features">
                    View Documentation
                  </a>
                </Button>
              </div>
              
              <p className="mt-6 text-sm text-muted-foreground max-w-md mx-auto">
                No registration required • Free forever • Open source
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-muted/50" aria-labelledby="features-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.header 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <Badge variant="secondary" className="mb-4 px-3 py-1">
                <BarChart3 className="w-3 h-3 mr-1" />
                Powerful Features
              </Badge>
              
              <h2 id="features-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Why Choose{' '}
                <AnimatedGradientText
                  className="inline-block text-3xl sm:text-4xl lg:text-5xl font-bold"
                  colorFrom="#3b82f6"
                  colorTo="#8b5cf6"
                >
                  MyToonTools?
                </AnimatedGradientText>
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                The most efficient way to optimize your data for AI models. 
                Trusted by developers worldwide for mission-critical applications.
              </p>
            </motion.header>

            {/* Statistics Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  <NumberTicker value={70} />%
                </div>
                <div className="text-sm text-muted-foreground">Token Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  <NumberTicker value={15000} />+
                </div>
                <div className="text-sm text-muted-foreground">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  <NumberTicker value={99} />.<NumberTicker value={9} />%
                </div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  <NumberTicker value={1} />B+
                </div>
                <div className="text-sm text-muted-foreground">Tokens Saved</div>
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                    <BorderBeam 
                      size={120} 
                      duration={10 + index} 
                      colorFrom="#3b82f6" 
                      colorTo="#8b5cf6"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    />
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-xl bg-linear-to-br ${feature.color}`}>
                          <feature.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            <NumberTicker value={feature.stats.value} />
                            {feature.stats.suffix}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {feature.stats.label}
                          </div>
                        </div>
                      </div>
                      
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-16"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Ready to optimize your AI workflows?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Join thousands of developers who have already saved millions of tokens and reduced their LLM costs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ShimmerButton
                  shimmerColor="#ffffff"
                  shimmerSize="0.1em"
                  shimmerDuration="2s"
                  borderRadius="8px"
                  background="rgba(59, 130, 246, 1)"
                  className="px-8 py-3 text-base font-semibold bg-linear-to-r from-blue-500 to-purple-500"
                >
                  <a href="/json-to-toon" className="flex items-center gap-2">
                    Try Free Converter
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </ShimmerButton>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  asChild
                  className="px-8 py-3 text-base"
                >
                  <a href="#api" className="flex items-center gap-2">
                    View API Docs
                    <Code2 className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Converter Section */}
        <section id="converter" className="py-24 bg-gradient-to-b from-background to-accent/5" aria-labelledby="converter-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
              <h2 id="converter-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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

        {/* Examples Section */}
        {/* <section id="examples" className="py-24 bg-muted/50" aria-labelledby="examples-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <header className="text-center">
              <h2 id="examples-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                See It In Action
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Real examples showing the token savings you can achieve
              </p>
            </header>
          </div>
        </section> */}

        {/* Documentation Section */}
        {/* <section id="docs" className="py-24" aria-labelledby="docs-heading">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <header className="text-center">
              <h2 id="docs-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Documentation
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Learn everything about the TOON format and how to use it
              </p>
            </header>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t" role="contentinfo">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              © 2025 MyToonTools. Built with ❤️ for the AI community.
            </p>
            <nav className="mt-4" aria-label="Footer navigation">
              <ul className="flex justify-center space-x-6 text-sm">
                <li><a href="#home" className="text-muted-foreground hover:text-foreground">Home</a></li>
                <li><a href="#features" className="text-muted-foreground hover:text-foreground">Features</a></li>
                <li><a href="#converter" className="text-muted-foreground hover:text-foreground">Converter</a></li>
                <li><a href="https://github.com/MyToonTools" className="text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
