import styled from 'styled-components';
import * as constants from '../../util/constants';

const DropDownListItem = styled.li`
  padding: 0.3em 0;
  margin: 0;
  width: max-content;
  max-width: 20em;
  min-width: 100%;
  text-align: center;

  color: black;

  &:hover,
  &.list-item-selected {
    color: white;
    background-color: ${constants.colorSecondary};
  }
`;

export default DropDownListItem;
