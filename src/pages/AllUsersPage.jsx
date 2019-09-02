import React, { Component } from "react";
import Loading from "../utils/Loading";
import * as api from "../api";
import Card from "react-bootstrap/Card";
import { Link } from "@reach/router";
import ErrorPage from "../pages/ErrorPage";

class AllUsersPage extends Component {
  state = {
    users: [],
    isLoading: true,
    err: false
  };
  render() {
    const { users, isLoading, err } = this.state;
    if (err) return <ErrorPage err={err} />;
    if (isLoading) return <Loading text="Loading the users..." />;
    return (
      <>
        <h2>All users</h2>
        <div className="usersList">
          {users.map(user => {
            return (
              <Link
                to={`/articles/${user.username}/authors`}
                key={user.username}
              >
                <Card style={{ width: "18rem" }} className="card">
                  <Card.Body>
                    <Card.Img
                      variant="top"
                      src={user.avatar_url}
                      alt={`profile picture`}
                    />
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {user.username}
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Link>
            );
          })}
        </div>
      </>
    );
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers = () => {
    api
      .getAllUsers()
      .then(({ users }) => {
        this.setState({ users, isLoading: false });
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };
}

export default AllUsersPage;
