import styled from 'styled-components';
import * as constants from '../../util/constants';

const Backdrop = styled.div`
  background-color: black;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  ${constants.mediaSmall} {
    opacity: 0.5;
    width: 100%;
    height: 100%;
  }
`;

export default Backdrop;
