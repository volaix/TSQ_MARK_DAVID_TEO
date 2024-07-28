import React from "react"
import { useDrag, useDrop } from "react-dnd"
import { Post } from "./api/graphql/util"
import { GetPostsHomeQuery } from "@/__generated__/graphql"

//------------------TYPES-------------------
interface DraggablePostProps {
  post: SingleClientPost
  index: number
  movePost: (dragIndex: number, hoverIndex: number) => void
  onDropComplete: (fromIndex: number, selected: SingleClientPost) => void
}
type SingleClientPost = NonNullable<
  NonNullable<GetPostsHomeQuery["clientPosts"]>[number]
>

//-----------------COMPONENT-----------------
export default function DraggablePost({
  post,
  index,
  movePost,
  onDropComplete,
}: DraggablePostProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  const [, drop] = useDrop({
    accept: "post",
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      movePost(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
    drop(item: { index: number }) {
      onDropComplete(item.index, post)
      return
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "post",
    item: { id: post.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`bg-white p-2 mb-2 rounded shadow cursor-move ${isDragging ? "opacity-50" : ""}`}
    >
      {post.title}
      Order: {post.order}
    </div>
  )
}
