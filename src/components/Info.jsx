import React, { Component } from "react";
import { Alert, Button } from "react-bootstrap";

class Info extends Component {
  state = {
    show: true
  };
  render() {
    const { show } = this.state;
    return (
      <div>
        <Alert show={show} variant="warning">
          <Alert.Heading>
            <strong>Important</strong>
          </Alert.Heading>
          <p>
            You have to log in to be able to use all the features in the app.
          </p>
          <p>
            You can choose from existing users e.g:{" "}
            <strong>jessjelly, tickle122, grumpy19,</strong>
          </p>
          <p>
            or create your own profile. Logging in can be done simply by typing
            in <strong>just</strong> username{" "}
            <strong>(password is not required)</strong>.
          </p>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => this.setShow(false)}
              variant="outline-warning"
            >
              Close me.
            </Button>
          </div>
        </Alert>

        {!show && (
          <Button
            className="infoButton"
            variant="warning"
            onClick={() => this.setShow(true)}
          >
            Important
          </Button>
        )}
      </div>
    );
  }
  setShow = arg => {
    this.setState({ show: arg });
  };
}

export default Info;
