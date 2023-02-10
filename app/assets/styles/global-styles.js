import { createGlobalStyle } from 'styled-components';
import { isNative, isMobileOnly } from 'utils/platform';
import SanFranciscoTextRegular from '../fonts/SanFranciscoText-Regular.ttf';
import SanFranciscoTextMedium from '../fonts/SanFranciscoText-Medium.ttf';

const GlobalStyle = createGlobalStyle`
 @font-face {
    font-family: 'San Francisco Text';
    font-style: normal;
    src: url(${SanFranciscoTextRegular}) format('truetype');
  }
  @font-face {
    font-family: 'San Francisco Text Medium';
    font-style: normal;
    src: url(${SanFranciscoTextMedium}) format('truetype');
  }

  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    min-width: ${isMobileOnly ? 'auto' : '768px'};
    min-height: 100vh;
  }

  body {
    font-family: 'San Francisco Text', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 14px;
  }

  body[style*='overflow: hidden'] {
    -webkit-overflow-scrolling: auto;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  input[type="text"] {
    word-break: normal
  }
  
  p,
  label {
    font-family: 'San Francisco Text', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.5em;
  }

  a,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  label {
    user-select: ${isNative ? 'none' : 'unset'};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:hover {
    text-decoration: none;
    color: inherit;
  }

  h4 {
    font-weight: 400;
  }

  :focus { outline: none; }

  button {
    border: none;
    cursor: pointer;
  }
`;

export default GlobalStyle;
