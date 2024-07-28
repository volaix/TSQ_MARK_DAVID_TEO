import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import * as React from 'react'

const items = [
  {
    title: 'Dashboard',
  },
  {
    title: 'Mobile integration',
  },
  {
    title: 'Available on all platforms',
  },
]

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0)

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index)
  }

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={6}>
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

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            useFlexGap
            sx={{
              width: '100%',
            }
            }
          >
            {items.map(({ title, }, index) => (
              <Card
                key={index}
                variant="outlined"
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index
                        ? 'primary.light'
                        : 'grey.200'
                    }
                    return selectedItemIndex === index ? 'primary.dark' : 'grey.800'
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >

                  <Box sx={{ textTransform: 'none' }}>
                    <Typography
                      color="text.primary"
                      variant="body2"
                      fontWeight="bold"
                    >
                      {title}
                    </Typography>


                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  )
}
