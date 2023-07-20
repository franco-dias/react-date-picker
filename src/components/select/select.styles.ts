import styled from "styled-components";

export const SelectContainer = styled.button`
  width: 280px;
  display: flex;
  height: 46px;
  box-sizing: border-box;
  padding: 0.25rem 1rem;
  align-items: center;
  background-color: #333;
  border-radius: 0.5rem;
  border: 1px solid transparent;

  &:focus-within {
    border-color: #646cff;
    & svg {
      fill: #646cff;
    }
  }
  & select {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent;
    outline: none;
    color: #fff;
    font-size: 1rem;
  }
`;
