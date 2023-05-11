import styled from 'styled-components';
import * as constants from '../../util/constants';

interface Props {
  size: 'big' | 'mid' | 'small';
  color?: 'primary' | 'secondary';
}

export const Title = styled.h1<Props>`
  font-size: ${(props) =>
    props.size === 'small'
      ? '1.5rem'
      : props.size === 'mid'
      ? '2rem'
      : '2.5rem'};
  margin: 0.3em 0.1em;
  padding: 0;
  text-align: center;
  color: ${(props) =>
    props.color && props.color === 'secondary'
      ? constants.colorSecondary
      : constants.colorPrimary};
`;
