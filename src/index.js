import React from "react";
import ReactDOM from "react-dom";
import Client from "./Client"
import { createHashHistory } from "history";

const hist = createHashHistory();

ReactDOM.hydrate(
  <Client hist={hist}/>,
  document.getElementById("root")
);
