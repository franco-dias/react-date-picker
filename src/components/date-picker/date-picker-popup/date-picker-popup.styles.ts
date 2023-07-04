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

const Header = styled.div`
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

export { MonthContainer, Header };
