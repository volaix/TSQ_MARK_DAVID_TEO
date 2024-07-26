'use client'
import React, { useState, useEffect } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import DraggablePost from './DraggablePost'

export interface Post {
    id: string | number
    title: string | null
}

interface PostListProps {
    data: {
        users?: Post[]
    }
}

const PostList: React.FC<PostListProps> = ({ data }) => {
    //-----------STATE-------------
    const [posts, setPosts] = useState<Post[]>(data?.users || [])

    //-----------HOOKS-------------
    useEffect(() => {
        setPosts(data?.users || [])
    }, [data?.users])

    const movePost = React.useCallback((dragIndex: number, hoverIndex: number) => {
        console.log('update post order here')
        setPosts((prevPosts) => {
            const newPosts = [...prevPosts]
            const draggedPost = newPosts[dragIndex]
            newPosts.splice(dragIndex, 1)
            newPosts.splice(hoverIndex, 0, draggedPost)
            return newPosts
        })
    }, [])

    //-----------RENDER--------
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="h-64 overflow-y-auto">
                {posts.map((post, index) => (
                    <DraggablePost key={post.id} post={post} index={index} movePost={movePost} />
                ))}
            </div>
        </DndProvider>
    )
}

export default PostList