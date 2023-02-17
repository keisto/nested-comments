import '../styles/globals.css'
import { CommentProvider } from '../context/CommentContext'

export default function App({ Component, pageProps }) {
  return (
    <CommentProvider>
      <Component {...pageProps} />
    </CommentProvider>
  )
}
