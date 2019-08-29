import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
// import Footer from "./components/Footer";
import AllTopicsPage from "./pages/AllTopicsPage";
import ArticlePage from "./pages/ArticlePage";
import AllArticlesPage from "./pages/AllArticlesPage";
import AllUsersPage from "./pages/AllUsersPage";
import AddArticlePage from "./pages/AddArticlePage";

class App extends React.Component {
  state = {
    loggedInUser: "jessjelly"
    // loggedInUser: null
  };
  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="App">
        <Navigation loggedInUser={loggedInUser} />
        <Header />
        <Router>
          <Homepage path="/" />
          <AllArticlesPage
            path="/articles/:topic/topics"
            loggedInUser={loggedInUser}
          />
          <AllArticlesPage
            path="/articles/:author/authors"
            loggedInUser={loggedInUser}
          />
          <AllArticlesPage path="/articles" loggedInUser={loggedInUser} />
          <ArticlePage
            path="/article/:article_id"
            loggedInUser={loggedInUser}
          />
          <AllTopicsPage path="/topics" loggedInUser={loggedInUser} />
          <AllUsersPage path="/users" />
          <AddArticlePage path="article/form" />
          <Homepage default />
        </Router>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
