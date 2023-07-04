import styled, { css } from "styled-components";

const GridContainer = styled.div`
  position: relative;
  display: grid;
  gap: 0.25rem;
  grid-template-columns: repeat(7, 1fr);
`;

const DayObject = styled.button<{
  $highlighted?: boolean;
  $color?: string;
  $opaque?: boolean;
}>`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;

  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 500;
  border-radius: 0.75rem;
  font-family: inherit;
  background-color: #303030;
  border: 1px solid transparent;
  transition: border-color 0.25s;
  &:not(:disabled):hover {
    border-color: #646cff;
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  &:disabled {
    cursor: unset;
  }

  ${({ $opaque }) =>
    $opaque &&
    css`
      color: #ababab;
      &:hover {
        border-color: #fff;
      }
    `}

  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}

  ${({ $highlighted }) =>
    $highlighted &&
    css`
      background-color: #646cff;
      color: #fff;
    `}
`;

export { DayObject, GridContainer };
