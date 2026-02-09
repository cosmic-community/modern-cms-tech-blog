import Link from 'next/link'
import MobileNav from '@/components/MobileNav'
import { getCategories } from '@/lib/cosmic'

export default async function Header() {
  const categories = await getCategories()

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl">📝</span>
            <span className="font-bold text-lg tracking-tight group-hover:text-indigo-400 transition-colors">
              Modern Tech Blog
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              Home
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {category.metadata?.name || category.title}
              </Link>
            ))}
          </nav>

          {/* Mobile Nav Toggle */}
          <MobileNav categories={categories} />
        </div>
      </div>
    </header>
  )
}