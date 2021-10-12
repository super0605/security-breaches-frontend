import React from "react";

import { Container, MainContainer, MainContent } from "./styled";

const Layout = ({ children }) => {
  return (
    <Container>
      <MainContainer>
        <MainContent>{children}</MainContent>
      </MainContainer>
    </Container>
  );
};

export default Layout;
