import styled, { css } from 'styled-components';
import rem from '../_utils/rem';
import icon from '../_static/logoNegative.png';

const Logo = styled.div`
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  background-position: center;
  background-size: contain;
  background-image: url(${icon});
  background-repeat: no-repeat;
  width: 100%;
  height: ${rem(75)};
`

export default Logo;