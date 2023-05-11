import styled from 'styled-components';
import * as constants from '../../util/constants';

interface ContainerProps {
  width: string;
  isdisabled?: boolean;
}

const DropDownContainer = styled.div<ContainerProps>`
  border: 2px solid ${constants.colorSecondary};
  display: inline-flex;
  border-radius: 0.25em;
  padding: 0;
  cursor: pointer;
  align-items: center;
  justify-content: right;
  position: relative;
  min-width: 60px;
  height: 2.5em;
  width: ${(props) => props.width || 'max-content'};

  &.dropdown-focused {
    ${constants.mediaSmall} {
      position: fixed;
      top: 20px;
      padding: 0.2em 0;
      left: 0;
      z-index: 10;
      background-color: white;
      width: calc(100% - 20px) !important;
      min-width: calc(100% - 20px) !important;
      left: 10px;
      right: 10px;

      & > div > span {
        display: none;
      }
    }
  }

  &[data-isdisabled='true'] {
    border-color: ${constants.colorSecondary}77 !important;
    cursor: no-drop !important;
    * {
      cursor: inherit !important;
    }
  }

  &:focus-within {
    border-color: ${constants.colorPrimary};
  }

  & > div {
    width: 100%;
    max-width: 100%;
    min-width: 0;

    input {
      width: 100%;
      border: none;
      background-color: transparent;
      outline: none;
      min-width: 0;

      &:read-only {
        cursor: pointer;
      }
    }
  }

  ${constants.mediaLarge} {
    min-width: 90%;

    & > div {
      min-width: initial;
    }
  }

  &:hover {
    & #dd-svg path {
      stroke: ${constants.colorPrimary};
    }
  }
`;

export default DropDownContainer;
