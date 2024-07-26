'use client'
import PostList from './PostList'

import { gql, useQuery } from "@apollo/client"

export default function Home() {
  const { loading, error, data: postListResponse, refetch } = useQuery(gql`
  query getPostsHome {
    clientPosts {
      id
      title
      order
    }
  }
`)

  console.log('postListResponse: ', postListResponse)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {error && <p>Error : {error.message}</p>}
      {loading && <p>Loading Posts...</p>}
      <h1>list of all posts</h1>
      <section>
        <PostList data={postListResponse} />
      </section>
    </main>
  )
}
