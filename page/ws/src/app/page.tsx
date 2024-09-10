import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Components
import { About } from '@/component/page/about';
import { Footer } from '@/component/page/footer';
import { LogoViteJs } from '@/component/page/logo';

export function Page() {
  return (
    <>
      <h1>React Github Actions Test</h1>

      <Container maxWidth="sm">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LogoViteJs />
          <Typography sx={{ mt: 3 }} variant="h5" component="h1" gutterBottom>
            Vite.js + React.JS + TypeScript + MUI v5
          </Typography>
          <About />
          <Footer />
        </Box>
      </Container>
    </>
  );
}

export default Page;
