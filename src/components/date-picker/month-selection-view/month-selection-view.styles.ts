import styled, { css } from "styled-components";

const MonthGrid = styled.div`
  display: grid;
  width: 304px;
  height: 304px;
  grid-template-columns: 3fr 4fr;
  gap: 0.25rem;

  .option-list {
    display: grid;
    gap: 0.25rem;
    padding: 0 0.25rem;
    overflow: auto;
    align-content: flex-start;
    &::-webkit-scrollbar {
      width: 4px;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #666;
    }
    &::-webkit-scrollbar-thumb:hover {
      background: #aaa;
    }
  }

  .year {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Option = styled.button<{ $highlighted: boolean }>`
  height: 2.5rem;
  width: 100%;
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

  ${({ $highlighted }) =>
    $highlighted &&
    css`
      background-color: #646cff;
      color: #fff;
    `}
`;

export { MonthGrid, Option };
