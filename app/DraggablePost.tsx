import React, { useState, useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Post } from "./PostList"

interface DraggablePostProps {
    post: Post
    index: number
    movePost: (dragIndex: number, hoverIndex: number) => void
}

export default function DraggablePost({ post, index, movePost }: DraggablePostProps) {
    const ref = React.useRef<HTMLDivElement>(null)

    const [, drop] = useDrop({
        accept: 'post',
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
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'post',
        item: { id: post.id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))

    return (
        <div
            ref={ref}
            className={`bg-white p-2 mb-2 rounded shadow cursor-move ${isDragging ? 'opacity-50' : ''
                }`}
        >
            {post.title}
        </div>
    )
}
