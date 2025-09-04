import { createGlobalStyle } from 'styled-components';
import NanumSquareNeoTTVariable from '@/assets/fonts/NanumSquareNeo-Variable.woff2';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'NanumSquareNeo-Variable';
    font-style: normal;
    font-weight: 100 900;
    src: url(${NanumSquareNeoTTVariable}) format('woff2-variations');
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'NanumSquareNeo-Variable';
    font-style: normal;
    line-height: 1.4;
    letter-spacing: -0.025em; 
  }

  p, h1, h2, h3 {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    &:focus {
      outline: none;
    }
  }

  img {
    border: none;
  }
`;

export default GlobalStyle;
