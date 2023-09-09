'use client';
import { useScrollTrigger, Slide, AppBar, Toolbar, Typography, CssBaseline } from '@mui/material';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar() {
  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <AppBar>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h6' component='div'>
              MUSICGPT
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}
