import type { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'xs' | 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const color = category.metadata?.color || '#6366f1'

  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  }

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${sizeClasses[size]}`}
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      {category.metadata?.name || category.title}
    </span>
  )
}