// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import CategoryBadge from '@/components/CategoryBadge'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | Modern Tech Blog`,
    description: post.metadata?.excerpt || '',
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const author = post.metadata?.author
  const categories = post.metadata?.categories || []

  return (
    <article>
      {/* Hero */}
      <div className="relative bg-gray-900">
        {post.metadata?.featured_image && (
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=2400&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1200}
            height={450}
            className="w-full h-64 md:h-96 object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12 w-full">
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((cat) => (
                  <CategoryBadge key={cat.id} category={cat} size="sm" />
                ))}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-300 text-sm">
              {author && (
                <Link
                  href={`/authors/${author.slug}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  {author.metadata?.avatar && (
                    <img
                      src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                      alt={author.metadata?.name || author.title}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                    />
                  )}
                  <div>
                    <span className="font-medium text-white block">
                      {author.metadata?.name || author.title}
                    </span>
                    {author.metadata?.role && (
                      <span className="text-gray-400 text-xs">{author.metadata.role}</span>
                    )}
                  </div>
                </Link>
              )}
              <span className="text-gray-500">·</span>
              {post.metadata?.published_date && (
                <span>
                  {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
              {post.metadata?.reading_time && (
                <>
                  <span className="text-gray-500">·</span>
                  <span>{post.metadata.reading_time} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-indigo-600 hover:prose-a:text-indigo-500 prose-img:rounded-xl prose-code:text-indigo-600 prose-pre:bg-gray-900">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {post.metadata?.content || ''}
          </ReactMarkdown>
        </div>

        {/* Author Bio */}
        {author && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-start gap-4 group"
            >
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wider font-medium mb-1">
                  Written by
                </p>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {author.metadata?.name || author.title}
                </h3>
                {author.metadata?.bio && (
                  <p className="text-gray-500 mt-1 text-sm">{author.metadata.bio}</p>
                )}
              </div>
            </Link>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}