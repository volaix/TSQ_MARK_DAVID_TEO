"use client"
import React, { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import DraggablePost from "./DraggablePost"
import { gql, useMutation, useQuery } from "@apollo/client"
import { Post } from "./api/graphql/util"

interface PostListProps {
  data: {
    clientPosts?: Post[]
  }
  refetch: () => void
}

const orderMin = 10000
const PostList: React.FC<PostListProps> = ({ data , refetch}) => {
  //-----------STATE-------------
  const [posts, setPosts] = useState<Post[]>(data?.clientPosts || [])
  const [updateClientPost] = useMutation(gql`
  mutation UpdateClientPost($id: ID!, $order: Int!) {
    updateClientPost(id: $id, order: $order) {
      id
      order
    }
  }
`)

  //-----------HOOKS-------------
  useEffect(() => {
    setPosts(data?.clientPosts || [])
  }, [data?.clientPosts])

  //-----------FUNCTIONS-------------
  const updateMongoDb = React.useCallback(
    async (toIndex: number, selectedPost: Post) => {
      const preIndex = posts[toIndex - 1]?.order ?? orderMin
      const postIndex = posts[toIndex + 1]?.order ?? 100000
      const order = Math.floor((preIndex + postIndex) / 2)
      const variables = { id: selectedPost.id, order }
      if (variables.id && variables.order) {
        try {
          await updateClientPost({
            variables
          })
          await refetch()
        } catch (error) {
          console.error("Error updating post:", error)
        }
      }
    },
    [posts, refetch, updateClientPost]
  )

  const movePost = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts]
        const draggedPost = newPosts[dragIndex]
        newPosts.splice(dragIndex, 1)
        newPosts.splice(hoverIndex, 0, draggedPost)
        return newPosts
      })
    },
    []
  )

  //-----------RENDER--------
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-64 overflow-y-auto">
        {posts.map((post, index) => (
          <DraggablePost
            key={post.id}
            post={post}
            index={index}
            movePost={movePost}
            onDropComplete={updateMongoDb}
          />
        ))}
      </div>
    </DndProvider>
  )
}

export default PostList
