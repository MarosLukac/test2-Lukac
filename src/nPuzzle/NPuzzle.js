import React, { Component } from "react";
import { Field } from "./Core";
import GameState from "./GameState";
import FieldComponent from "./Field";
import { Switch, Route, withRouter } from "react-router-dom";
import RatingForm from "./RatingForm";
import Rating from "./Rating";

export class nPuzzle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      field: new Field(4, 4)
    };
  }

  render() {
    const { field } = this.state;
    const { match } = this.props;

    return (
      <div>
        <Switch>
          <Route path={`${match.path}/rating-form`}>
            <RatingForm handleNewGame={this.handleNewGame}/>
          </Route>

          <Route path={`${match.path}/`}>
            <GameState
              gameState={field.gameState}
              handleNewGame={this.handleNewGame}
              handleGoToRatingForm={this.handleGoToRatingFormular}
            />

            <FieldComponent
              field={field}
              handleChangePosition={this.handleChangePosition}
            />
            <Rating />
          </Route>
        </Switch>
      </div>
    );
  }

  handleChangePosition = (row, col) => {
    const { field } = this.state;
    field.changePosition(row, col);
    this.setState({ field: field });
  };
  handleNewGame = () => {
    const { history, match } = this.props;
    this.setState({ field: new Field(2, 2) });
    history.push(`${match.url}`);
  };

  handleGoToRatingFormular = () => {
    const { history, match } = this.props;
    history.push(`${match.url}/rating-form`);
  };
}

export default withRouter(nPuzzle);
