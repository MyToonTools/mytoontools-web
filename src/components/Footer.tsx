export function Footer() {
  return (
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
  )
}
