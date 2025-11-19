import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'motion/react'
import { Menu, Github, Twitter, ChevronDown, FileJson, FileSpreadsheet, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'What is TOON?', href: '/what-is-toon' },
  { name: 'API Access', href: '/api' },
  { name: 'Features', href: '/#features' },
  { name: 'Examples', href: '/#examples' },
  { name: 'Documentation', href: '/#docs' },
]

const tools = [
  { 
    name: 'JSON Converter', 
    href: '/json-to-toon',
    icon: FileJson,
    description: 'Convert JSON to TOON format'
  },
  { 
    name: 'CSV Converter', 
    href: '/csv-to-toon',
    icon: FileSpreadsheet,
    description: 'Transform CSV to TOON format'
  },
  { 
    name: 'API Access', 
    href: '/api',
    icon: Database,
    description: 'Programmatic converter access'
  },
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
                MyToonTools
              </AnimatedShinyText>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium transition-colors relative group text-foreground/80 hover:text-foreground">
                    Tools
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {tools.map((tool) => {
                    const isActive = location.pathname === tool.href
                    return (
                      <DropdownMenuItem key={tool.name} asChild>
                        <Link to={tool.href} className="flex items-center gap-3 p-3">
                          <tool.icon className={`w-4 h-4 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`} />
                          <div>
                            <div className={`font-medium ${isActive ? 'text-foreground' : 'text-foreground'}`}>{tool.name}</div>
                            <div className="text-xs text-muted-foreground">{tool.description}</div>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    )
                  })}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Regular Navigation Items */}
              {navigation.map((item, index) => {
                const isActive = item.href.startsWith('/#') 
                  ? location.pathname === '/' && location.hash === item.href.substring(1)
                  : location.pathname === item.href
                
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: (index + 1) * 0.1 }}
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
              <a href="https://github.com/MyToonTools" target="_blank" rel="noopener noreferrer">
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
                    <span className="text-xl font-bold tracking-tight">MyToonTools</span>
                  </Link>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col space-y-3">
                    {/* Mobile Tools Section */}
                    <div className="px-2">
                      <div className="text-sm font-semibold text-foreground mb-3">Tools</div>
                      <div className="space-y-2 pl-2">
                        {tools.map((tool) => {
                          const isActive = location.pathname === tool.href
                          return (
                            <Link
                              key={tool.name}
                              to={tool.href}
                              className={`flex items-center gap-3 py-2 text-sm transition-colors ${
                                isActive ? 'text-foreground' : 'text-foreground/80 hover:text-foreground'
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              <tool.icon className={`w-4 h-4 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`} />
                              <div>
                                <div className={`font-medium ${isActive ? 'text-foreground' : ''}`}>{tool.name}</div>
                                <div className="text-xs text-muted-foreground">{tool.description}</div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                    
                    {/* Separator */}
                    <div className="border-t mx-2"></div>
                    
                    {/* Regular Navigation */}
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
                      <a href="https://github.com/MyToonTools" target="_blank" rel="noopener noreferrer">
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
