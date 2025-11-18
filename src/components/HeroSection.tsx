import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { 
  FileJson, 
  FileSpreadsheet, 
  Database, 
  Code2, 
  TrendingDown,
  ArrowRight,
  Sparkles,
  Zap
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

export function HeroSection() {
  return (
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
                    {tool.id === 'json-to-toon' ? (
                      <Link to={tool.href}>
                        Try Now
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ) : (
                      <a href={tool.href}>
                        Try Now
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
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
              <Link to="/json-to-toon" className="flex items-center gap-2">
                Start Converting
                <ArrowRight className="w-4 h-4" />
              </Link>
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
  )
}
