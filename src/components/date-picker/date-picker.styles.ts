import styled, { css } from "styled-components";

const MonthContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  width: 24rem;
  gap: 0.5rem;
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    width: 3rem;
    height: 3rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
  }
`;

const DayObject = styled.button<{ $highlighted: boolean }>`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;

  font-size: 1em;
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

  ${({ $highlighted }) =>
    $highlighted &&
    css`
      background-color: #646cff;
    `}
`;

export { MonthHeader, MonthContainer, DayObject };
