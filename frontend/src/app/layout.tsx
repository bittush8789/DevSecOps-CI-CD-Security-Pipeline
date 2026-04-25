import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DevSecOps Platform | Secure Dashboard',
  description: 'Enterprise-grade secure application monitoring and management.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 min-h-screen`}>
        <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">D</div>
                <span className="font-bold text-xl tracking-tight">DevSecOps<span className="text-indigo-500">Pipeline</span></span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="/" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                  <a href="/products" className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Products</a>
                  <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Logout</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-slate-900 py-8 text-center text-slate-500 text-sm">
          &copy; 2024 DevSecOps CI/CD Security Pipeline. Built for Enterprise Security.
        </footer>
      </body>
    </html>
  )
}
