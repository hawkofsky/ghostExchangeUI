import { url } from 'inspector';
import {createGlobalStyle} from 'styled-components';
import TrixiePlain from './Trixie-Plain.otf';

export const GlobalFonts = createGlobalStyle`
  @font-face {
    font-family: TrixiePlain;
    font-style: normal;
    font-weight: 400;
    src: url(${TrixiePlain}) format('opentype');
  }
`