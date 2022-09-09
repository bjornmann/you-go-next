import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  html, body, #root{
    min-height: 100%;
  }
  body {
    padding: 0;
    margin: 0;
    background-color: #fbf5e3;
  }
  h1{
    font-size: 25px;
  }
`