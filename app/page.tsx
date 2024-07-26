'use client'
import Image from "next/image"
import dynamic from 'next/dynamic'
const DynamicPostList = dynamic(() => import('./PostList'), { ssr: false })

import { useQuery, gql, useMutation } from "@apollo/client"
import PostList from "./PostList"

export default function Home() {
  const { loading, error, data: postListResponse, refetch } = useQuery(gql`
  query getUsers {
    users {
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

      {/* <div className="h-4/5 w-1/3 px-4 py-6 flex flex-col gap-2 overflow-y-auto max-h-[700px] border border-orange-400 rounded"> */}
      <h1>list of all posts</h1>
      <section>
        <DynamicPostList data={postListResponse} />
      </section>
      {/* {postListResponse?.users?.map(({ id, title }: Record<string, string | null | number>) => {
        return (
          <div key={id}>{title}</div>
        )
      }
      )}  */}
    </main>
  )
}
