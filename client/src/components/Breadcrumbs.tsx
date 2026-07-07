import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-3">
      <ol className="flex items-center gap-1 text-xs text-gray-500" itemScope itemType="https://schema.org/BreadcrumbList">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-gray-800 transition-colors" itemProp="item">
                <span itemProp="name">{crumb.label}</span>
              </Link>
            ) : (
              <span className="text-gray-800 font-medium" itemProp="name">{crumb.label}</span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
            {i < crumbs.length - 1 && <ChevronRight className="h-3 w-3 flex-shrink-0" />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
