import { motion } from "framer-motion";
import styled, { css } from "styled-components";

const MonthContainer = styled(motion.div).withConfig({
  shouldForwardProp: (prop) =>
    !["initial", "animate", "exit", "transition"].includes(prop),
})<{
  $position: { left: number; top: number };
}>`
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #333;
  position: fixed;
  ${({ $position }) => css`
    left: ${$position.left}px;
    top: ${$position.top}px;
  `}
`;

const GridContainer = styled.div`
  position: relative;
  display: grid;
  gap: 0.25rem;
  grid-template-columns: repeat(7, 1fr);
`;

const MonthHeader = styled.div`
  display: flex;
  padding: 0 1rem 1rem;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;

  > button {
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 400;
    white-space: nowrap;
    width: fit-content;
  }

  > h4 {
    margin: 0;
  }
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

export { MonthHeader, MonthContainer, GridContainer, DayObject };
