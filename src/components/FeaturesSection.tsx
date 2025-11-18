import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { motion } from 'motion/react'
import { 
  TrendingDown,
  Zap,
//   Shield,
//   Cpu,
  Globe,
  BarChart3,
//   Code2,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    id: 'token-efficiency',
    title: 'Massive Token Savings',
    description: 'Reduce LLM costs by up to 70% with our optimized TOON format.',
    icon: TrendingDown,
    stats: { value: 70, suffix: '%', label: 'Token Reduction' },
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'lightning-fast',
    title: 'Lightning Fast Processing',
    description: 'Convert massive datasets in seconds.',
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
//   {
//     id: 'developer-friendly',
//     title: 'Developer-First API',
//     description: 'RESTful API with comprehensive documentation. SDKs available for Python, JavaScript, and more.',
//     icon: Code2,
//     stats: { value: 5, suffix: '+', label: 'Programming Languages' },
//     color: 'from-purple-500 to-violet-500',
//   },
//   {
//     id: 'enterprise-ready',
//     title: 'Enterprise Security',
//     description: 'SOC 2 compliant with end-to-end encryption. No data retention, complete privacy guaranteed.',
//     icon: Shield,
//     stats: { value: 100, suffix: '%', label: 'Data Privacy' },
//     color: 'from-red-500 to-pink-500',
//   },
//   {
//     id: 'real-time',
//     title: 'Real-time Conversion',
//     description: 'Stream large files with real-time progress. Handle gigabyte datasets without memory issues.',
//     icon: Cpu,
//     stats: { value: 1, suffix: 'GB+', label: 'File Support' },
//     color: 'from-indigo-500 to-purple-500',
//   },
]

export function FeaturesSection() {
  return (
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
              <NumberTicker value={100} />+
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
              <NumberTicker value={1} />k+
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
              onClick={() => {window.location.href = '/json-to-toon'}}
            >
              <a href="/json-to-toon" className="flex items-center gap-2">
                Try Free Converter
                <ArrowRight className="w-4 h-4" />
              </a>
            </ShimmerButton>
            
            {/* <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="px-8 py-3 text-base"
            >
              <a href="#api" className="flex items-center gap-2">
                View API Docs
                <Code2 className="w-4 h-4" />
              </a>
            </Button> */}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
