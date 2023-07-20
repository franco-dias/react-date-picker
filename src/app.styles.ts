import styled from "styled-components";

export const PokemonOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 340px;
  > img {
    width: 4rem;
    height: 4rem;
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    > p {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }
    > span {
      font-size: 0.75rem;
      font-weight: 400;
    }
  }
`;
