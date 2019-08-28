import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Footer from "./components/Footer";
import AllTopicsPage from "./pages/AllTopicsPage";
import ArticlePage from "./pages/ArticlePage";
import AllArticlesPage from "./pages/AllArticlesPage";

class App extends React.Component {
  state = {
    user: "jessjelly"
    // user: null
  };
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Navigation user={user} />
        <Header />
        <Router>
          <Homepage path="/" />
          <AllArticlesPage path="/articles/:query" />
          <AllArticlesPage path="/articles" />
          <ArticlePage path="/articles/:article_id" />
          <AllTopicsPage path="/topics" />
          <Homepage default />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
