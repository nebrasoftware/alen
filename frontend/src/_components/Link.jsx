import styled from 'styled-components';
import { Link } from 'react-router-dom'

import rem from '../_utils/rem';
import { red, violetRed, lightGrey } from '../_utils/colors';

export const StyledLink = styled.a`
  display: inline-block;
  color: inherit;
  cursor: pointer;
  padding: ${rem(2)} ${rem(8)};
  margin: ${rem(-2)} ${rem(-8)};
  @media (min-width: ${1000 / 16}em) {
    border-radius: ${rem(3)};
    &:hover {
      background: ${lightGrey};
    }
  }
`;

export const InlineLink = styled.a.attrs({
  target: '_blank',
  rel: 'noopener',
})`
  color: ${p => (p['data-white'] ? 'white' : violetRed)};
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: ${p => (p['data-white'] ? 'white' : red)};
  }
`;

const Link = ({ children, className, inline, unstyled, white, ...rest }) => {
  let Child = StyledLink;
  if (inline) {
    Child = InlineLink;
  } else if (unstyled) {
    Child = 'a';
  }

  let dataAttrs;
  if (white) {
    dataAttrs = { 'data-white': white };
  }

  return (
    <UnstyledLink {...rest}>
      <Child href={rest.href} className={className} aria-label={rest['aria-label']} {...dataAttrs}>
        {children}
      </Child>
    </UnstyledLink>
  );
};

export default Link;