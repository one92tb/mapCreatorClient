import React, { Component } from "react";
import { Auth } from "./components/Auth/Auth";
console.log(process.env);
class App extends Component {
  render() {
    return <Auth />;
  }
}

export default App;
