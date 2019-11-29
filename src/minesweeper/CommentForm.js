import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { player: "", comment: "", date: "" };
  }

  render() {
    const { player, comment } = this.state;

    return (
      <div>
        <form>
          <div className="form-group">
            <label>Name:</label>
            <input
              className="form-control"
              type="text"
              name="player"
              value={player}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Comment:</label>
            <input
              className="form-control"
              type="text"
              name="comment"
              value={comment}
              onChange={this.handleChange}
            />
          </div>

          <button
            className="btn btn-primary mr-2"
            type="button"
            onClick={() => this.handleSubmit()}
          >
            Submit
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => this.cancelHandler()}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }

  handleChange = event => {
    console.log(event.target);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    //console.log(this.state.player)
  };

  handleSubmit = () => {
    fetch("http://localhost:3300/api/comments", {
      method: "POST",
      body: JSON.stringify({
        player: this.state.player,
        comment: this.state.comment
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => this.routeToMinesweeper());
  };

  cancelHandler = () => {
    this.routeToMinesweeper();
  };

  routeToMinesweeper() {
    console.log("ideeem");
    const { history } = this.props;
    history.goBack();
  }
}

export default withRouter(CommentForm);
