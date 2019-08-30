import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import ErrorPage from "../pages/ErrorPage";
import Loading from "../utils/Loading";
import * as api from "../api";

class ProfilePage extends Component {
  state = {
    user: {},
    isLoading: true,
    err: null
  };
  render() {
    const { user, isLoading, err } = this.state;
    if (err) return <ErrorPage err={err} />;
    if (isLoading) return <Loading text="Loading the profile..." />;
    return (
      <div className="profile">
        <Card style={{ width: "35rem" }} className="card">
          <Card.Body>
            <Card.Img
              className="profilePicture"
              variant="top"
              src={user.avatar_url}
              alt={`username avatar`}
            />

            <Card.Title>Username: {user.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Name: {user.name}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    );
  }
  componentDidMount() {
    this.fetchUserByUsername();
  }

  fetchUserByUsername = () => {
    const { loggedInUser } = this.props;
    console.log(loggedInUser, "<<<<<<");
    api
      .getUsersByUsername({ username: loggedInUser })
      .then(({ user }) => {
        this.setState({ user, isLoading: false });
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  };
}

export default ProfilePage;
