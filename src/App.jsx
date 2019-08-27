import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Router } from "@reach/router";

import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import Topics from "./pages/Topics";
import ArticlePage from "./pages/ArticlePage";
import AllArticlesPage from "./pages/AllArticlesPage";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Header />
        <Router>
          <Homepage path="/" />
          <AllArticlesPage path="/articles" />
          <ArticlePage path="/articles/:article_id" />
          <Topics path="/topics" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
