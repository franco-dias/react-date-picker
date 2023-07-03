import styled from "styled-components";

const InputContainer = styled.div`
  width: 280px;
  display: flex;
  box-sizing: border-box;
  padding: 0.25rem 0.25rem 0.25rem 1rem;
  align-items: center;
  background-color: #333;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  > input {
    flex: 1;
    height: 34px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 1rem;
  }

  &:focus-within {
    border-color: #646cff;
    & svg {
      fill: #646cff;
    }
  }
`;

const IconButton = styled.button`
  padding: 0;
  height: 2rem;
  width: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export { InputContainer, IconButton };
