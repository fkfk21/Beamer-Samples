import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.min.mjs';
// pdfjsLib.GlobalWorkerOptions.workerSrc = `@/node _pdfjs-dist/build/pdf.worker.min.js`;

// Components
import { About } from '@/component/page/about';
import { Footer } from '@/component/page/footer';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  Grid2,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
  CardContent,
  CardHeader,
} from '@mui/material';
import { GitHub, PictureAsPdfOutlined } from '@mui/icons-material';

type ThumbnailResult = {
  uri: string;
  width: number;
  height: number;
};

async function generateThumbnail(pdf_path: string, page_number: number, scale: number) {
  try {
    // PDFドキュメントを読み込む
    const pdf = await pdfjsLib.getDocument(pdf_path).promise;
    const page = await pdf.getPage(page_number); // 指定されたページを取得

    // ビューポートとスケールの設定
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // PDFページをキャンバスにレンダリング
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    await page.render(renderContext).promise;

    // キャンバスを画像URLに変換
    const uri = canvas.toDataURL('image/png');

    // ページ情報を返す
    return {
      uri,
      width: canvas.width,
      height: canvas.height,
    };
  } catch (error) {
    console.error('Error fetching PDF page info:', error);
    throw error;
  }
}

function usePDFs() {
  const [pdfs, setPDFs] = React.useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPDFs = async () => {
      const response = await fetch(`/${__PROJECT_BASENAME__}/files.txt`);
      const content = await response.text();
      const pdfs_list = content.split('\n');
      const pdfs = pdfs_list.reduce((acc, pdf) => {
        if (pdf === '') return acc;
        if (!pdf.endsWith('.pdf')) return acc;
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

function useThumbnails(pdfs: Record<string, string>) {
  const [thumbnails, setThumbnails] = React.useState<Record<string, ThumbnailResult>>({});

  useEffect(() => {
    const fetchThumbnails = async () => {
      // 各PDFのサムネイルを非同期に取得
      const thumbnailsArray = await Promise.all(
        Object.entries(pdfs).map(async ([theme_name, pdf]) => {
          const thumbnail = await generateThumbnail(`/${__PROJECT_BASENAME__}/${pdf}`, 1, 0.7);
          console.log(thumbnail.width, thumbnail.height);
          return { theme_name, thumbnail };
        }),
      );

      // サムネイルをオブジェクトに変換
      const thumbnails = thumbnailsArray.reduce((acc, { theme_name, thumbnail }) => {
        acc[theme_name] = thumbnail;
        return acc;
      }, {} as Record<string, ThumbnailResult>);

      // 状態を更新
      setThumbnails(thumbnails);
    };

    fetchThumbnails();
  }, [pdfs]);

  return thumbnails;
}

export function MainPage() {
  const pdfs = usePDFs();
  const thumbnails = useThumbnails(pdfs);

  const [selected_pdf, setSelectedPDF] = useState<string | null>(null);

  const handlePDFClick = (pdf: string) => {
    console.log(`set pdf: ${pdf}`);
    setSelectedPDF(pdf);
  };

  const theme = useTheme();
  const is_small_window = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Typography variant="h4" px={3}>
        Beamer Samples
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <GitHub sx={{ mr: 1 }} />
        <Link
          href="https://github.com/fkfk21/Beamer-Samples"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github Repository
        </Link>
      </Box>

      <Box display="flex" height="80vh" width={'100%'} boxShadow={1}>
        {/* ボタンを縦に並べるエリア */}
        {is_small_window ? (
          // 画面が小さいときはボタンのみ表示
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
        ) : (
          // 画面が大きいときはサムネ付きのボタンを表示
          <Box
            display={'flex'}
            maxHeight={'80vh'}
            maxWidth={{
              sm: '20%',
              md: '30%',
              lg: '40%',
              xl: '50%',
            }}
            p={2}
            sx={{ overflowY: 'auto' }}
          >
            <Grid2 container rowSpacing={2} columnSpacing={1}>
              {Object.entries(pdfs).map(([theme_name, pdf], index) => (
                <Grid2 key={index} size={{ xl: 3, lg: 4, md: 6, sm: 12 }}>
                  <Card sx={{ width: 'fit-content', boxShadow: 3 }}>
                    <CardActionArea onClick={() => handlePDFClick(pdf)}>
                      <CardMedia
                        component="img"
                        height={thumbnails[theme_name]?.height}
                        width={thumbnails[theme_name]?.width}
                        src={thumbnails[theme_name]?.uri}
                        alt={theme_name}
                        sx={{
                          outline: '1px solid',
                        }}
                      />
                      <CardContent>
                        <Typography
                          variant="h6"
                          align="center"
                          fontWeight="Bold"
                          color={selected_pdf === pdf ? 'error' : 'textPrimary'}
                        >
                          {theme_name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        )}

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

      {/* PDFを新しいタブで開くリンク */}
      {selected_pdf && (
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <PictureAsPdfOutlined sx={{ mr: 1 }} />
          <Link
            href={`/${__PROJECT_BASENAME__}/${selected_pdf}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open PDF in new tab
          </Link>
        </Box>
      )}

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
