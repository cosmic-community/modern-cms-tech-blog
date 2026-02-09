# Modern Tech Blog

![Modern Tech Blog](https://imgix.cosmicjs.com/c79d0260-d214-11f0-b693-79ceb5783a41-photo-1555949963-ff9fe0c870eb-1764964713798.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautifully designed, fully responsive modern tech blog built with **Next.js 16** and powered by **Cosmic**. Features category filtering, author profiles, full markdown article pages, and a slick mobile-first navigation.

## Features

- ⚡ **Next.js 16 App Router** with React Server Components
- 📱 **Fully responsive design** with animated mobile hamburger menu
- 🏷️ **Category filtering** with color-coded badges from your Cosmic content
- 👤 **Author profile pages** with bio, social links, and authored posts
- 📝 **Full Markdown rendering** with syntax highlighting
- 🖼️ **Optimized images** via Cosmic imgix CDN
- 🎨 **Tailwind CSS** with Inter font and custom theme
- 🔍 **SEO optimized** with semantic HTML and proper meta tags

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=693330252794e7afddb5382a&clone_repository=698a36b762fe9e5103c0d9a6)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "create a new blog post about the power of AI-enabled CMS"

### Code Generation Prompt

> "I want to build an app. Next.js, responsive, mobile nav, modern"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com) — Headless CMS for content management ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering
- [rehype-highlight](https://github.com/rehypejs/rehype-highlight) — Syntax highlighting

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd modern-tech-blog

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the blog.

### Environment Variables

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching all posts with author and category data

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a single post by slug

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'my-post-slug' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching posts by category

```typescript
const { objects: posts } = await cosmic.objects
  .find({ type: 'posts', 'metadata.categories': categoryId })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This blog uses three Cosmic object types:

| Object Type | Fields | Description |
|------------|--------|-------------|
| **Posts** | content (markdown), excerpt, featured_image, author, categories, published_date, reading_time | Blog articles |
| **Authors** | name, bio, avatar, role, twitter, github, website | Content creators |
| **Categories** | name, description, color | Content organization |

All content is fetched server-side using React Server Components for optimal performance and SEO.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the project on [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Add environment variables
5. Deploy!

<!-- README_END -->