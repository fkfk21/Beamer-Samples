import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Components
import { About } from '@/component/page/about';
import { Footer } from '@/component/page/footer';
import { Button, Link, Stack } from '@mui/material';

function usePDFs() {
  const [pdfs, setPDFs] = React.useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPDFs = async () => {
      const response = await fetch(`/${__PROJECT_BASENAME__}/files.txt`);
      const content = await response.text();
      const pdfs_list = content.split('\n');
      const pdfs = pdfs_list.reduce((acc, pdf) => {
        const theme_name = pdf.split('.')[0];
        acc[theme_name] = pdf;
        return acc;
      }, {} as Record<string, string>);

      setPDFs(pdfs);
    };

    fetchPDFs();
  }, []);

  return pdfs;
}

export function MainPage() {
  const pdfs = usePDFs();
  const [selected_pdf, setSelectedPDF] = useState<string | null>(null);

  const handlePDFClick = (pdf: string) => {
    console.log(`set pdf: ${pdf}`);
    setSelectedPDF(pdf);
  };

  return (
    <>
      <Typography variant="h4" px={3}>
        Beamer Samples
      </Typography>

      <Box display="flex" height="80vh" width={'100%'}>
        {/* ボタンを縦に並べるエリア */}
        <Box maxHeight={'80vh'} p={2} sx={{ overflowY: 'auto' }}>
          <Stack spacing={2}>
            {Object.entries(pdfs).map(([theme_name, pdf], index) => (
              <Button
                key={index}
                sx={{ textTransform: 'none' }}
                variant={selected_pdf === pdf ? 'outlined' : 'contained'}
                onClick={() => handlePDFClick(pdf)}
              >
                {theme_name}
              </Button>
            ))}
          </Stack>
        </Box>

        {/* PDF表示エリア */}
        <Box flexGrow={1} p={2}>
          {selected_pdf ? (
            <Box width={'100%'} height={'100%'} border={'1px solid'}>
              <iframe
                src={`/${__PROJECT_BASENAME__}/${selected_pdf}`}
                width={'100%'}
                height={'100%'}
                style={{ border: 'none' }}
                title={selected_pdf}
              ></iframe>
            </Box>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <p>PDFファイルを選択してください</p>
            </Box>
          )}
        </Box>
      </Box>

      <Container maxWidth="md">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <About />
          <Footer />
        </Box>
      </Container>
    </>
  );
}

export default MainPage;
