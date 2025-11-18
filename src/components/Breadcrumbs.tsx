import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
  current?: boolean
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <a 
            href="/" 
            className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home size={16} className="mr-1" />
            Home
          </a>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={16} className="text-muted-foreground mx-2" />
            {item.href && !item.current ? (
              <a 
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span 
                className={item.current ? "text-foreground font-medium" : "text-muted-foreground"}
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
