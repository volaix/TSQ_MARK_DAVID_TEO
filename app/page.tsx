'use client'
import Image from "next/image"

import { useQuery, gql, useMutation } from "@apollo/client"

export default function Home() {
  const { loading, error, data, refetch } = useQuery(gql`
  query getUsers {
    users {
      id
      title
      order
    }
  }
`)

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      {error && <p>Error : {error.message}</p>}
      {loading && <p>Loading Posts...</p>}

      <div className="h-4/5 w-1/3 px-4 py-6 flex flex-col gap-2 overflow-y-auto max-h-[700px] border border-orange-400 rounded">
        <h1>list of all posts</h1>
        {data?.users?.map((user: Record<string, string | null | number>) => {
          return (
            <div key={user?.id}>{user.title}</div>
          )
        }
          // <Fragment key={user?.id}>
          //   <UserBadge user={user} refetch={refetch} />
          // </Fragment>
        )}
      </div>
      {/* <div className="h-4/5 w-1/3 px-2 py-5 justify-center flex border border-orange-400 rounded"> */}
      {/* <UserForm refetch={refetch} /> */}
      {/* </div> */}




    </main>
  )
}
