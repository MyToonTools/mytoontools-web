import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu, Github, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'JSON Converter', href: '/json-to-toon' },
  { name: 'Features', href: '/#features' },
  { name: 'Examples', href: '/#examples' },
  { name: 'Documentation', href: '/#docs' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-bold text-sm">
                J
              </div>
              <AnimatedShinyText className="text-xl font-bold tracking-tight">
                JTOON
              </AnimatedShinyText>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item, index) => {
                const isActive = item.href.startsWith('/#') 
                  ? location.pathname === '/' && location.hash === item.href.substring(1)
                  : location.pathname === item.href
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item.href.startsWith('/#') ? (
                      <a
                        href={item.href}
                        className={`text-sm font-medium transition-colors relative group ${
                          isActive ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
                        }`}
                      >
                        {item.name}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`} />
                      </a>
                    ) : (
                      <Link
                        to={item.href}
                        className={`text-sm font-medium transition-colors relative group ${
                          isActive ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
                        }`}
                      >
                        {item.name}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        }`} />
                      </Link>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="https://github.com/Santaval/jtoon" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <ShimmerButton
              shimmerColor="#ffffff"
              shimmerSize="0.1em"
              shimmerDuration="2s"
              borderRadius="8px"
              background="rgba(0, 0, 0, 1)"
              className="text-sm"
            >
              <Link to="/json-to-toon">
                Get Started
              </Link>
            </ShimmerButton>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open main menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col space-y-6 pt-6">
                  {/* Mobile Logo */}
                  <Link to="/" className="flex items-center space-x-2 px-2" onClick={() => setIsOpen(false)}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-primary/80 text-primary-foreground font-bold text-sm">
                      J
                    </div>
                    <span className="text-xl font-bold tracking-tight">JTOON</span>
                  </Link>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-3">
                    {navigation.map((item, index) => {
                      const isActive = item.href.startsWith('/#') 
                        ? location.pathname === '/' && location.hash === item.href.substring(1)
                        : location.pathname === item.href
                      
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          {item.href.startsWith('/#') ? (
                            <a
                              href={item.href}
                              className={`block px-2 py-2 text-base font-medium transition-colors rounded-md ${
                                isActive 
                                  ? 'text-foreground bg-accent' 
                                  : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </a>
                          ) : (
                            <Link
                              to={item.href}
                              className={`block px-2 py-2 text-base font-medium transition-colors rounded-md ${
                                isActive 
                                  ? 'text-foreground bg-accent' 
                                  : 'text-foreground/80 hover:text-foreground hover:bg-accent'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Mobile Social Links */}
                  <div className="flex items-center space-x-4 px-2 pt-4 border-t">
                    <Button variant="ghost" size="sm" asChild>
                      <a href="https://github.com/Santaval/jtoon" target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  {/* Mobile CTA */}
                  <div className="px-2 pt-2">
                    <ShimmerButton
                      shimmerColor="#ffffff"
                      shimmerSize="0.1em"
                      shimmerDuration="2s"
                      borderRadius="8px"
                      background="rgba(0, 0, 0, 1)"
                      className="w-full text-sm"
                    >
                      <Link to="/json-to-toon" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </ShimmerButton>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
