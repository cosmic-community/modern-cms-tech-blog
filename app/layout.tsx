import type { Metadata } from 'next'
import Header from '@/components/Header'
import CosmicBadge from '@/components/CosmicBadge'
import './globals.css'

export const metadata: Metadata = {
  title: 'Modern Tech Blog',
  description: 'Insights on AI, web development, cloud computing, and modern technology.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-gray-400 py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📝</span>
                <span className="text-white font-semibold text-lg">Modern Tech Blog</span>
              </div>
              <p className="text-sm">
                © {new Date().getFullYear()} Modern Tech Blog. Powered by{' '}
                <a
                  href="https://www.cosmicjs.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cosmic
                </a>
              </p>
            </div>
          </div>
        </footer>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}