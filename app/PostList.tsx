"use client"
import { GetPostsHomeQuery, useUpdateClientPostMutation } from "@/__generated__/graphql"
import React, { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import DraggablePost from "./DraggablePost"

//--------------TYPES-------------------
type PostListProps = {
  data: GetPostsHomeQuery
  refetch: () => void
}
type ClientPostsType = NonNullable<GetPostsHomeQuery["clientPosts"]>

//-----------UTIL---------------------
const orderMin = 10000

//---------------------COMPONENT-----------------
const PostList: React.FC<PostListProps> = ({ data, refetch }) => {
  //-----------STATE-------------
  const [posts, setPosts] = useState<ClientPostsType>(data.clientPosts || [])
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0)

  const [updateClientPost] = useUpdateClientPostMutation({
    refetchQueries: ["getPostsHome"],
  })

  //-----------HOOKS-------------
  useEffect(() => {
    setPosts(data?.clientPosts || [])
  }, [data?.clientPosts])

  //-----------FUNCTIONS-------------
  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index)
  }

  const updateMongoDb = React.useCallback(
    async (draggedId: string, droppedToIndex: number) => {
      const preIndex = posts[droppedToIndex - 1]?.order ?? orderMin
      const postIndex = posts[droppedToIndex + 1]?.order ?? 100000
      const order = Math.floor((preIndex + postIndex) / 2)
      const variables = { id: draggedId, order }
      if (variables.id && variables.order) {
        try {
          await updateClientPost({
            variables,
          })
        } catch (error) {
          console.error("Error updating post:", error)
        }
      }
    },
    [posts, updateClientPost]
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
      {/* <div className="h-96 overflow-y-auto"> */}
      {posts.map((post, index) => {
        if (post === null) return

        return <DraggablePost
          selectedItemIndex={selectedItemIndex}
          key={post.id}
          post={post}
          index={index}
          updateLocal={movePost}
          updateDb={updateMongoDb}
          handleItemClick={handleItemClick}
        />
      })}
      {/* </div> */}
    </DndProvider>
  )
}

export default PostList
