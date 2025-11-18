import { Navbar } from '@/components/Navbar'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { ConverterSection } from '@/components/ConverterSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main content with top padding to account for fixed navbar */}
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <ConverterSection />
        
        {/* Examples Section - Commented out for future implementation */}
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

        {/* Documentation Section - Commented out for future implementation */}
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

      <Footer />
    </div>
  )
}
