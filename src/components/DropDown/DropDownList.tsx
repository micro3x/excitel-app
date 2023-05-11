import styled from 'styled-components';
import * as constants from '../../util/constants';
import Backdrop from './Backdrop';

export type Kind = 'standard' | 'popup';

interface ListProps {
  kind: Kind;
}

const DropDownList = styled.ul<ListProps>`
  display: inline-flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  border: 2px solid ${constants.colorPrimary};
  position: absolute;
  z-index: 10;
  background-color: white;
  padding: 0.2em 0;
  border-radius: 0.2em;
  min-width: inherit;
  max-height: 20em;
  overflow: auto;
  width: 100%;
  animation: popupAnimation 200ms ease-in;
  left: ${(props) => (props.kind === 'standard' ? '-2px' : '50%')};
  top: ${(props) => (props.kind === 'standard' ? '1.3em' : '0')};
  transform: ${(props) =>
    props.kind === 'standard' ? '' : 'translate(-50%, -50%)'};

  @keyframes popupAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  ${constants.mediaSmall} {
    margin: 10px 10px;
    position: fixed;
    font-size: 2rem;
    border: 3px solid ${constants.colorSecondary};
    max-height: 70vh;
    left: 0;
    right: 0;
    top: 2em;
    min-width: initial;
    /* transform: translate(0, -50%); */

    ${Backdrop} {
      visibility: visible;
    }
  }
`;

export default DropDownList;
