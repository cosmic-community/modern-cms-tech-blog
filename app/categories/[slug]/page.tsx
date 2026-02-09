// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory, getCategories } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((cat) => ({
    slug: cat.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.metadata?.name || category.title} | Modern Tech Blog`,
    description: category.metadata?.description || '',
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const color = category.metadata?.color || '#6366f1'

  return (
    <div>
      {/* Hero */}
      <section
        className="py-16 md:py-20"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium mb-6 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All posts
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            />
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {category.metadata?.name || category.title}
            </h1>
          </div>
          {category.metadata?.description && (
            <p className="text-gray-500 text-lg max-w-2xl">
              {category.metadata.description}
            </p>
          )}
          <p className="text-sm text-gray-400 mt-4">
            {posts.length} article{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-16">
            No articles in this category yet.
          </p>
        )}
      </section>
    </div>
  )
}