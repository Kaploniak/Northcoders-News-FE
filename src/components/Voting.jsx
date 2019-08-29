import React, { Component } from "react";
import * as api from "../api";
import Button from "react-bootstrap/Button";

class Voting extends Component {
  state = {
    likesChange: 0,
    err: null
  };
  render() {
    const { votes } = this.props;
    const { likesChange, err } = this.state;
    return (
      <>
        <div className="voting">
          <Button
            className="votingDownButton"
            variant="danger"
            onClick={() => this.updateLikes(-1)}
            disabled={likesChange === -1}
          >
            Unlike it.
          </Button>
          <p className="likes">{votes + likesChange}</p>
          <Button
            className="votingUpButton"
            variant="success"
            onClick={() => this.updateLikes(1)}
            disabled={likesChange === 1}
          >
            Like it!
          </Button>
        </div>
        {err && err.status + err.msg}
      </>
    );
  }

  updateLikes = likeDifference => {
    const { article_id, comment_id } = this.props;
    this.setState(currentState => {
      return { likesChange: currentState.likesChange + likeDifference };
    });
    api.patchVotes({ likeDifference, article_id, comment_id }).catch(err => {
      this.setState(currentState => {
        return {
          likesChange: currentState.likeChanges - likeDifference,
          err: { status: 500, msg: "Couldn't vote at this time" }
        };
      });
    });
  };
}

export default Voting;
