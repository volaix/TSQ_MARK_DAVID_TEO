import { GetPostsHomeQuery } from "@/__generated__/graphql"
import React from "react"
import { useDrag, useDrop } from "react-dnd"



//------------------TYPES-------------------
interface DraggablePostProps {
  post: SingleClientPost
  index: number
  updateLocal: (dragIndex: number, hoverIndex: number) => void
  updateDb: (draggedIndex: number, droppedIndex: number) => void
}
type SingleClientPost = NonNullable<
  NonNullable<GetPostsHomeQuery["clientPosts"]>[number]
>

//-----------------COMPONENT-----------------
export default function DraggablePost({
  post,
  index,
  updateLocal,
  updateDb,
}: DraggablePostProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: "post",
    item: { id: post.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "post",
    drop(item: { index: number }) {
      const draggedIndex = item.index  // Original selected index
      const droppedIndex = index       // Current drop target index

      updateLocal(item.index, index)
      updateDb(draggedIndex, droppedIndex)
    },
  })


  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={`bg-white p-2 mb-2 rounded shadow cursor-move ${isDragging ? "opacity-50" : ""}`}
    >
      {post.title}
      {/* Order: {post.order} */}
    </div>
  )
}
