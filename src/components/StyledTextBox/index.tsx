import React from 'react';
import styled from 'styled-components';
import * as constants from '../../util/constants';

const StyledTextBoxInput = styled.input`
  margin: 0px;
  padding: 5px 10px;
  background-color: #fff;
  border: 2px solid ${constants.colorSecondary};
  border-radius: 5px;
  height: 3em;
  min-width: 250px;
  &:focus {
    border-color: ${constants.colorPrimary};
    outline-color: ${constants.colorPrimary};
  }

  &:focus,
  &:not(:placeholder-shown),
  &:-webkit-autofill {
    & + span {
      display: block;
    }
  }

  &:focus::placeholder {
    color: transparent;
  }

  ${constants.mediaLarge} {
    display: block;
    min-width: 100%;
    &:before {
      display: block;
    }
  }
`;

const StyledTextBoxSpan = styled.span`
  display: none;
  position: absolute;
  top: -0.4em;
  left: 15px;
  font-size: 0.8em;
  background: #fff;
  color: gray;
  font-style: italic;
  padding: 0 0.3em;
  line-height: 1em;
`;

const StyledTextBoxWrapper = styled.div`
  display: inline-block;
  width: fit-content;
  height: fit-content;
  position: relative;
  margin: 0;
  padding: 0;
  min-width: 250px;
  ${constants.mediaLarge} {
    display: block;
    min-width: 100%;
    &:before {
      display: block;
    }
  }
`;

const StyledTextBox = (props: React.HTMLProps<HTMLInputElement>) => {
  return (
    <StyledTextBoxWrapper>
      <StyledTextBoxInput {...(props as any)} />
      <StyledTextBoxSpan>{props.placeholder}</StyledTextBoxSpan>
    </StyledTextBoxWrapper>
  );
};

export default StyledTextBox;
