import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DAppProvider } from "@usedapp/core";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

ReactDOM.render(

  <React.StrictMode>
    <BrowserRouter>
    <DAppProvider config={{}}>
      <ChakraProvider theme={theme}>
          <App />
      </ChakraProvider>
    </DAppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
