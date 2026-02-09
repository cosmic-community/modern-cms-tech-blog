import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'
import type { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const author = post.metadata?.author
  const categories = post.metadata?.categories || []
  const featuredImage = post.metadata?.featured_image

  return (
    <Link href={`/posts/${post.slug}`} className="group block">
      <article className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10]">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={250}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((cat) => (
                <CategoryBadge key={cat.id} category={cat} size="xs" />
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.metadata?.excerpt && (
            <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-1">
              {post.metadata.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50 text-sm text-gray-400">
            {author?.metadata?.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=48&h=48&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={24}
                height={24}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-gray-600 font-medium text-xs">
              {author?.metadata?.name || author?.title || ''}
            </span>
            {post.metadata?.published_date && (
              <>
                <span>·</span>
                <span className="text-xs">
                  {new Date(post.metadata.published_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </>
            )}
            {post.metadata?.reading_time && (
              <>
                <span>·</span>
                <span className="text-xs">{post.metadata.reading_time} min</span>
              </>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}