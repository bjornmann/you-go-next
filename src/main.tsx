import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalStyle } from './styles';
import styled, { ThemeProvider } from 'styled-components';
import Footer from "./Footer";
import ygnTheme from "./theme";
import 'virtual:fonts.css';
const SiteWrapper = styled.div`
  position: relative;
`;
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={ygnTheme}>
      <GlobalStyle />
      <SiteWrapper>
        <App />
        <Footer />
      </SiteWrapper>
    </ThemeProvider>
  </React.StrictMode>
)
