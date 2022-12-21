export const STYLE_TEMPLATE = '{% mermaidStyle %}';
export const EDGE_TEMPLATE = '{% edges %}';
export const MERMAID_TEMPLATE = `
  <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>

  <script>
      mermaid.initialize({startOnLoad:true});
  </script>
  <style>
    ${STYLE_TEMPLATE}
  </style>
  <div class="mermaid">
          graph LR
          ${EDGE_TEMPLATE}
  </div>
`;
export const HTML_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Dependency Graph</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <script
      src="https://unpkg.com/react@latest/umd/react.development.js"
      crossorigin="anonymous"
    ></script>
    <script src="https://unpkg.com/react-dom@latest/umd/react-dom.development.js"></script>
    <script
      src="https://unpkg.com/@mui/material@latest/umd/material-ui.development.js"
      crossorigin="anonymous"
    ></script>
    <script
      src="https://unpkg.com/babel-standalone@latest/babel.min.js"
      crossorigin="anonymous"
    ></script>
    <!-- Fonts to support Material Design -->
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <!-- Icons to support Material Design -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      const {
        colors,
        CssBaseline,
        ThemeProvider,
        Typography,
        Container,
        createTheme,
        Box,
        SvgIcon,
        Link,
      } = MaterialUI;

      // Create a theme instance.
      const theme = createTheme({
        palette: {
          primary: {
            main: '#556cd6',
          },
          secondary: {
            main: '#19857b',
          },
          error: {
            main: colors.red.A400,
          },
        },
      });

      function App() {
        return (
          <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
              <Typography variant="h3" component="h1" gutterBottom>
                Nestjs Dependency Graph
              </Typography>
              <Typography variant="h5" component="h1" gutterBottom>
                drawed by mermaid-js <Link underline="hover" href="https://mermaid.js.org/#/">
                here 
              </Link>
              </Typography>
              
            </Box>
          </Container>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          
          <CssBaseline />
          <App />
        </ThemeProvider>,
      );
    </script>
    ${MERMAID_TEMPLATE}

  </body>
</html>
`;
