import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Career Assistant - AI-Powered Career Guidance',
  description: 'Get personalized career advice, interview preparation, and professional guidance with our AI-powered career assistant platform.',
  keywords: 'career advice, AI career guidance, interview preparation, job search, professional development',
  authors: [{ name: 'Career Assistant Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Career Assistant - AI-Powered Career Guidance',
    description: 'Get personalized career advice and interview preparation with AI',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen bg-background">
          <main role="main">
            {children}
          </main>
        </div>
        
        {/* Footer */}
        <footer className="border-t bg-background">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-muted-foreground">
                © 2024 Career Assistant. AI-powered career guidance platform.
              </p>
              <div className="flex space-x-4 mt-2 md:mt-0">
                <span className="text-xs text-muted-foreground">
                  Powered by AI & Gemini
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}