'use client'
import PostList from './PostList'

import { useGetPostsHomeQuery } from '../__generated__/graphql'

export default function Home() {
  const { loading, error, data: postListResponse, refetch } = useGetPostsHomeQuery({ fetchPolicy: 'network-only'})
  console.log('this is rerendering')

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <section>
        <h1>list of all posts</h1>
        {error && <p>Error : {error.message}</p>}
        {loading && <p>Loading Posts...</p>}
        {postListResponse &&
          <PostList data={postListResponse} refetch={refetch} />
        }
      </section>
    </main>
  )
}
