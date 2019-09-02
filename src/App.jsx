import React from "react";
import "./App.css";
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import AllTopicsPage from "./pages/AllTopicsPage";
import ArticlePage from "./pages/ArticlePage";
import AllArticlesPage from "./pages/AllArticlesPage";
import AllUsersPage from "./pages/AllUsersPage";
import AddArticlePage from "./pages/AddArticlePage";
import SignInPage from "./pages/SignInPage";
import LogInPage from "./pages/LogInPage";
import LogOutPage from "./pages/LogOutPage";
import ProfilePage from "./pages/ProfilePage";
import Info from "./components/Info";

class App extends React.Component {
  state = {
    loggedInUser: null
  };
  render() {
    const { loggedInUser } = this.state;
    return (
      <div className="App">
        <Navigation
          loggedInUser={loggedInUser}
          setLoggedInUser={this.setLoggedInUser}
        />
        <Header />
        <Info />
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
          <AddArticlePage path="article/form" loggedInUser={loggedInUser} />
          <SignInPage path="/signin" />
          <LogInPage path="/login" setLoggedInUser={this.setLoggedInUser} />
          <LogOutPage path="/logout" setLoggedInUser={this.setLoggedInUser} />
          <ProfilePage path="/users/:loggedInUser" />

          <Homepage default />
        </Router>
      </div>
    );
  }
  setLoggedInUser = loggedInUser => {
    this.setState({ loggedInUser });
  };
}

export default App;
