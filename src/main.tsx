import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalStyle } from './styles';
import styled from 'styled-components';
import Footer from "./Footer";
import 'virtual:fonts.css';
const SiteWrapper = styled.div`
  position: relative;
`;
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyle />
    <SiteWrapper>
        <App />
        <Footer backgroundActive={true} />
    </SiteWrapper>
  </React.StrictMode>
)
