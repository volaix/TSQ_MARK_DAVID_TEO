'use client'
import PostList from './PostList'

import { Container, Grid, Stack, Typography } from '@mui/material'
import { useGetPostsHomeQuery } from '../__generated__/graphql'

export default function Home() {
  //-----------STATE----------
  const { loading, error, data: postListResponse, refetch } = useGetPostsHomeQuery({ fetchPolicy: 'network-only' })

  //----------RENDER-------------
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6">
      <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={6}>
            {/* --------HEADER---------- */}
            <header>
              <Typography component="h2" variant="h4" color="text.primary">
                Drag and Drop 300 Breakdance Titles
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: { xs: 2, sm: 4 } }}
              >
                Using our drag and drop editor, you can easily create and customize 300+ breakdance titles.
              </Typography>
            </header>

            {/* --------POST LIST------------ */}
            <Stack
              direction="column"
              // alignItems="flex-start"
              spacing={2}
              useFlexGap
              sx={{
                width: '100%',
                height: '24rem',
                overflowY: 'auto',
              }}
            >
              <section>
                {error && <p>Error : {error.message}</p>}
                {loading && <p>Loading Posts...</p>}
                {postListResponse &&
                  <PostList data={postListResponse} refetch={refetch} />
                }
              </section>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </main>
  )
}
