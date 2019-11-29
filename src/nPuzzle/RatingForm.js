import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class RatingForm extends Component {
  constructor(props) {
    super(props);
    this.initialState = { rating: 1 };
    this.state = this.initialState;
  }

  render() {
    const { rating } = this.state;
    
    return (
      <div className="mb-5">
        <h1> Rating </h1>
        <form>
          <div className="form-group">
            <label>Rate this game from 1 to 5:</label>
            <input
              className="form-control"
              type="number"
              name="rating"
              min="1"
              max="5"
              value={rating}
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
            className="btn btn-secondary mr-2"
            type="button"
            onClick={() => this.resetHandler()}
          >
            Reset
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
  };

  handleSubmit = () => {
 
    console.log("bbb");
    fetch("http://localhost:3300/api/ratings", {
      method: "POST",
      body: JSON.stringify({
        rating: this.state.rating
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.routeToNPuzzle();
      })
      .catch(console.log);
    
  };

  resetHandler = () => {
    this.setState(this.initialState);
  };

  cancelHandler = () => {
    this.routeToNPuzzle();
  };

  routeToNPuzzle() {
    const { history } = this.props;
    const {handleNewGame} = this.props
    history.goBack();
    handleNewGame();
  }
}

export default withRouter(RatingForm);
