import { GetPostsHomeQuery } from "@/__generated__/graphql"
import React from "react"
import { useDrag, useDrop } from "react-dnd"
import { Typography, Box, useTheme, Card, ButtonBase } from "@mui/material"

interface DraggablePostProps {
  post: SingleClientPost
  index: number
  updateLocal: (dragIndex: number, hoverIndex: number) => void
  updateDb: (draggedIndex: number, droppedIndex: number) => void
  selectedItemIndex: number | null
  handleItemClick?: (index: number) => void
}

type SingleClientPost = NonNullable<
  NonNullable<GetPostsHomeQuery["clientPosts"]>[number]
>

export default function DraggablePost({
  post,
  index,
  updateLocal,
  updateDb,
  selectedItemIndex,
  handleItemClick
}: DraggablePostProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const theme = useTheme()

  const [{ isDragging }, drag] = useDrag({
    type: "post",
    item: { id: post.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

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
      updateLocal(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
    drop(item: { index: number }) {
      updateDb(item.index, index)
    },
  })

  drag(drop(ref))

  return (
    <Card
      ref={ref}
      variant="outlined"
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        mb: 2,
        backgroundColor:
          selectedItemIndex === index ? 'action.selected' : 'background.paper',
        borderColor: (theme) => {
          if (theme.palette.mode === 'light') {
            return selectedItemIndex === index
              ? 'primary.light'
              : 'grey.300'
          }
          return selectedItemIndex === index ? 'primary.dark' : 'grey.800'
        },
      }}
    >
      <ButtonBase
        onClick={() => handleItemClick?.(index)}
        sx={{
          width: '100%',
          height: '100%',
          display: 'block',
          textAlign: 'left',
        }}
      >
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            gap: 2.5,
          }}
        >
          <Typography
            color="text.primary"
            variant="body1"
            fontWeight="bold"
          >
            {post.title}
          </Typography>
        </Box>
      </ButtonBase>
    </Card>
  )
}