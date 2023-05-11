import styled from 'styled-components';

const constants = {
  colorSecondary: '#ffc107',
};

interface Props {
  type?: 'button' | 'submit' | 'reset';
  kind?: 'standard' | 'outlined' | 'standardOld';
}

const outlined = `
    background-color: transparent;
    border: 1px solid ${constants.colorSecondary};
    color: ${constants.colorSecondary};
    transition: background-color 0.2s ease-in;
    margin: 5px 0;
    
    &:not([disabled]):hover {
        background-color: ${constants.colorSecondary}; 
        color: white;
    }
    `;
const standardOld = `
    background-color: ${constants.colorSecondary};
    border: none;
    color: white;
    text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
    transition: box-shadow 0.2s ease-in;

    &:not([disabled]):hover {
        box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.26);
    }
`;

const standard = `
    background-color: ${constants.colorSecondary};
    border: 1px solid ${constants.colorSecondary};
    color: white;
    transition: background-color 0.2s ease-in;

    &:not([disabled]):hover {
        background-color: transparent; 
        color: ${constants.colorSecondary};
        border: 1px solid ${constants.colorSecondary};
    }
`;

export const Button = styled.button<Props>`
  box-sizing: border-box;
  border-radius: 0.25em;
  padding: 0.25em 0.8em;
  margin: 5px 5px;
  font-size: 1rem;
  font-weight: 700;
  height: 2.5em;
  cursor: pointer;

  &:disabled {
    color: #0000002b;
  }

  ${(props) =>
    props.kind === 'outlined'
      ? outlined
      : props.kind === 'standardOld'
      ? standardOld
      : standard}
`;
