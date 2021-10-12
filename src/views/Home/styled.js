import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomeRow = styled.div`
  display: grid;
  gap: 16px;
  margin-bottom: ${({ mb }) => mb};
  grid-template-columns: repeat(3, minmax(310px, 1fr));
`;
