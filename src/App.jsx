import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Header />
        <Router>
          <Homepage path="/" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;

// /api/articles
