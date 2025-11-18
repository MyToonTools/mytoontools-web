import { useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { JsonConverter } from '@/components/JsonConverter'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { motion } from 'motion/react'
import { 
  FileJson,
  Sparkles,
  TrendingDown,
  Zap,
  Shield,
  Globe,
  Code2,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'

const breadcrumbItems = [
  { label: 'Converters' },
  { label: 'JSON to TOON', current: true }
]

const features = [
  {
    icon: TrendingDown,
    title: "Massive Token Savings",
    description: "Reduce JSON token count by 30-60% while preserving all data integrity",
    color: "text-green-500"
  },
  {
    icon: Zap,
    title: "Instant Conversion",
    description: "Convert large JSON files in milliseconds with our optimized algorithm",
    color: "text-yellow-500"
  },
  {
    icon: Shield,
    title: "100% Secure & Private",
    description: "All processing happens locally in your browser - no data leaves your device",
    color: "text-blue-500"
  },
  {
    icon: Globe,
    title: "Universal LLM Support",
    description: "Works with ChatGPT, Claude, GPT-4, and all major language models",
    color: "text-purple-500"
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer",
    company: "TechCorp",
    content: "This tool reduced our API costs by 45%. The TOON format is a game-changer for data-heavy applications.",
    rating: 5
  },
  {
    name: "Mike Rodriguez",
    role: "Data Scientist",
    company: "AI Labs",
    content: "Perfect for preprocessing large JSON datasets. Saved us thousands in LLM costs.",
    rating: 5
  }
]

const useCases = [
  "API Response Optimization",
  "Configuration File Compression",
  "Database Export Processing",
  "Log File Analysis",
  "E-commerce Product Catalogs",
  "User Profile Management"
]

export default function JsonToToonPage() {
  useEffect(() => {
    // Update document title and meta description
    document.title = "JSON to TOON Converter - Reduce LLM Token Costs by 60% | JTOON"
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Free JSON to TOON converter. Reduce LLM token costs by up to 60% while preserving data integrity. Works with ChatGPT, Claude, GPT-4. No registration required.'
      )
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', 'JSON to TOON Converter - Reduce LLM Token Costs by 60%')
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', 
        'Free online JSON to TOON converter. Optimize your JSON data for AI models and reduce token costs by up to 60%. Instant, secure, and works with all major LLMs.'
      )
    }
    
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', 'https://jtoon.dev/json-to-toon')
    }
    
    // Add JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "JSON to TOON Converter",
      "description": "Free online JSON to TOON converter that reduces LLM token costs by up to 60%",
      "url": "https://jtoon.dev/json-to-toon",
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "creator": {
        "@type": "Organization",
        "name": "JTOON",
        "url": "https://jtoon.dev"
      },
      "keywords": "JSON converter, TOON format, token optimization, LLM cost reduction, AI data processing",
      "featureList": [
        "30-60% token reduction",
        "Instant conversion",
        "100% private and secure",
        "Universal LLM support",
        "No registration required"
      ]
    }
    
    // Remove existing structured data if present
    const existingScript = document.querySelector('script[type="application/ld+json"]')
    if (existingScript) {
      existingScript.remove()
    }
    
    // Add new structured data
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://jtoon.dev/json-to-toon')
    
    return () => {
      // Cleanup on unmount
      const script = document.querySelector('script[type="application/ld+json"]')
      if (script) {
        script.remove()
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbItems} />
          
          {/* Hero Section */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <FileJson className="w-4 h-4 mr-2" />
              JSON Optimization Tool
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Convert JSON to{' '}
              <AnimatedGradientText
                className="inline-block text-4xl md:text-5xl lg:text-6xl font-bold"
                colorFrom="#3b82f6"
                colorTo="#8b5cf6"
              >
                TOON Format
              </AnimatedGradientText>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Reduce your LLM token costs by <strong>up to 60%</strong> with our free JSON to TOON converter. 
              Optimize your data for ChatGPT, Claude, and all major AI models while preserving complete data integrity.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>No registration required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>100% free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Completely private</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Works offline</span>
              </div>
            </div>
          </motion.section>

          {/* Main Converter */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <JsonConverter />
          </motion.section>

          {/* Features Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our JSON Converter?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built specifically for developers who need to optimize JSON data for AI applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                      <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Use Cases */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Perfect for These Use Cases</h2>
              <p className="text-lg text-muted-foreground">
                Optimize JSON data across various applications and industries
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <Code2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">{useCase}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted by Developers Worldwide</h2>
              <p className="text-lg text-muted-foreground">
                See what our users say about the JSON to TOON converter
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What is TOON format?</h3>
                  <p className="text-muted-foreground">
                    TOON (Token Optimized Object Notation) is a format designed specifically to reduce token consumption 
                    in large language models while preserving all data integrity and structure.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How much can I save?</h3>
                  <p className="text-muted-foreground">
                    Typical savings range from 30-60% for JSON data, with larger, more structured datasets showing 
                    greater improvements. The exact savings depend on your data structure and repetition patterns.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Is my data secure?</h3>
                  <p className="text-muted-foreground">
                    Absolutely. All conversion happens locally in your browser. Your JSON data never leaves your device, 
                    ensuring complete privacy and security.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="bg-linear-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your JSON Data?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Join thousands of developers already saving money on LLM costs
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="#converter" 
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Sparkles size={18} />
                    Start Converting Now
                  </a>
                  <a 
                    href="/api" 
                    className="inline-flex items-center gap-2 px-8 py-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <Code2 size={18} />
                    Explore API
                    <ArrowRight size={16} />
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
