import styled, { css } from "styled-components";

const MonthContainer = styled.div`
  display: grid;
  gap: 0.125rem;
  grid-template-columns: repeat(7, 1fr);
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
  }
`;

const DayObject = styled.button<{
  $highlighted?: boolean;
  $color?: string;
  $opaque?: boolean;
}>`
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;

  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 500;
  border-radius: 8px;
  font-family: inherit;
  background-color: #1a1a1a;
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

  ${({ $opaque }) =>
    $opaque &&
    css`
      color: #ababab;
      &:hover {
        border-color: #fff;
      }
    `}
`;

export { MonthHeader, MonthContainer, DayObject };
