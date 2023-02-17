import Head from 'next/head'
import CommentList from '../components/CommentList'

export default function Home() {
  return (
    <>
      <Head>
        <title>Nested Comments</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="p-12 sm:py-24 max-w-3xl mx-auto">
        <div className="flex items-center space-x-1 border-b pb-4 mb-6">
          <span className="text-5xl self-start sm:self-center">📙</span>
          <div>
            <h1 className="text-2xl font-bold">Comments</h1>
            <p className="text-sm text-gray-500">
              Note: Comments are not stored in a database and will clear after
              refresh.
            </p>
          </div>
        </div>

        <CommentList />
      </main>
    </>
  )
}
