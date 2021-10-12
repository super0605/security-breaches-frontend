import React from "react";
import { ThemeProvider } from "styled-components";
import Layout from "../components/Layout";
import Home from "./Home";
import theme from "../theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme.light}>
      <Layout>
        {/* TODO: add app routes here */}
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
