import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { IBM_Plex_Sans } from '@next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600']
})
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={ibmPlexSans.className}>
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools initialIsOpen={false} />
      <Analytics />
    </QueryClientProvider>
  )
}
