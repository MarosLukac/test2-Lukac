import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class EditCarForm extends Component {
  constructor(props) {
    super(props)
    const editedCar = props.editedCar
    this.initialState = editedCar
    this.state = this.initialState;
  }


  
  render() {
    const { brand, spz } = this.state;
    return (
      <div className="mb-5">
        <h1>Edit car</h1>
        <form>
          <div className="form-group">
            <label>Car brand:</label>
            <input
              className="form-control"
              type="text"
              name="brand"
              value={brand}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Car spz:</label>
            <input
              className="form-control"
              type="text"
              name="spz"
              value={spz}
              onChange={this.handleChange}
            />
          </div>

          <button
            className="btn btn-primary mr-2"
            type="button"
            onClick={() => this.handleSubmit(this.initialState)}
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

  handleSubmit = (editedCar) => {
    console.log(editedCar._id)
    fetch(`http://localhost:3300/api/cars/${editedCar._id}`, {
      method: "PUT",
      body: JSON.stringify({
        brand: this.state.brand,
        spz: this.state.spz
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(response => this.routeToCars());
  };



  resetHandler = () => {
    this.setState(this.initialState);
  };

  cancelHandler = () => {
    this.routeToCars();
  };

  routeToCars() {
    console.log("ideeem");
    const { history } = this.props;
    history.push('/cars');
  }
}

export default withRouter(EditCarForm);
