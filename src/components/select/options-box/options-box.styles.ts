import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { lighten } from "polished";

export const OptionsContainer = styled(motion.ul)<{
  $position: { left: number; top: number };
}>`
  min-width: 280px;
  max-width: 340px;
  border-radius: 0.5rem;
  margin: 0;

  padding: 0.5rem 0;
  background-color: #333;
  position: fixed;

  ${({ $position }) => css`
    left: ${$position.left}px;
    top: ${$position.top}px;
  `}

  > div {
    max-height: 340px;
    overflow-y: auto;
  }
`;

export const OptionItem = styled.li`
  width: 100%;
  border: none;
  display: flex;
  cursor: pointer;
  padding: 0.75rem;
  min-height: 44px;
  align-items: center;
  background-color: transparent;
  transition: background-color 0.2s ease;
  font-size: 1rem;
  box-sizing: border-box;
  overflow-y: auto;

  &:hover,
  &:active {
    background-color: ${lighten(0.05, "#333333")};
  }
`;
