"use client";
import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggablePost from "./DraggablePost";
import {  Post } from "./api/graphql/apolloHandler";

interface PostListProps {
  data: {
    clientPosts?: Post[];
  };
}

const orderMin = 10000
const PostList: React.FC<PostListProps> = ({ data }) => {
  //-----------STATE-------------
  const [posts, setPosts] = useState<Post[]>(data?.clientPosts || []);

  //-----------HOOKS-------------
  useEffect(() => {
    setPosts(data?.clientPosts || []);
  }, [data?.clientPosts]);

  //-----------FUNCTIONS-------------
  const updateMongoDb = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      console.log("        posts[dragIndex]: ", posts[dragIndex]);
      const preIndex =
        hoverIndex === 0 ? orderMin : posts[hoverIndex - 1]?.order ?? orderMin;
      const newEntry = {
        ...posts[dragIndex],
        order: (preIndex + posts[hoverIndex]?.order) / 2,
      };
      console.log("newEntry: ", newEntry);
    },
    [posts]
  );

  const movePost = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setPosts((prevPosts) => {
        const newPosts = [...prevPosts];
        const draggedPost = newPosts[dragIndex];
        newPosts.splice(dragIndex, 1);
        newPosts.splice(hoverIndex, 0, draggedPost);
        return newPosts;
      });
      updateMongoDb(dragIndex, hoverIndex);
    },
    [updateMongoDb]
  );

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
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default PostList;
