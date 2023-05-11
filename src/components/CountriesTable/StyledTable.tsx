import styled from 'styled-components';
import * as constants from '../../util/constants';

const StyledTable = styled.div`
  table {
    width: 80%;
    margin: auto;
    border-spacing: 0;
    box-shadow: 0px 0px 8px 2px #00000087;
    border-radius: 10px 10px 0 0;
    background-color: var(--colorPrimary);
    height: 50px;
    overflow: auto;

    thead {
      border-radius: inherit;
      height: 4em;
      tr {
        border-radius: inherit;
        background-color: #00000057;
      }

      th {
        border: 0;
        color: white;
        font-size: 1.2rem;
        font-weight: bold;
        position: relative;
        vertical-align: top;

        svg {
          width: 15px;
          height: 15px;
          fill: #00000057;
          stroke: #00000000;
          vertical-align: bottom;
          padding-bottom: 2px;
        }
      }
    }

    tr {
      border-radius: inherit;
    }

    th,
    td {
      margin: 0;
      padding: 0.3em 10px;
      border-bottom: 1px solid #eee;
      border-right: 0;

      &.sortable {
        cursor: pointer;
        white-space: nowrap;
      }
    }

    tbody tr {
      background: white;

      &:hover {
        background-color: #aaa;
        color: white;
      }

      &.table-row-even:not(:hover) {
        background-color: rgb(240 240 240);
      }
    }
  }

  ${constants.mediaLarge} {
    table {
      width: 100%;
      box-shadow: none;
      border-radius: 0;
      background-color: var(--colorPrimary);
    }

    .user-pending:first-of-type {
      border-left: 5px solid #ffa445; // ${constants.colorPending}; <= not enough contrast. Could change che pending color
    }
  }
`;

export default StyledTable;
