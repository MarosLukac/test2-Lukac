import React, { Component } from "react";
import Car from "./Car";
import CarDetail from "./CarDetail";
import EditCarForm from "./EditCarForm";
import NewCarForm from "./NewCarForm";
import { Switch, Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      clickedCar: null,
      editedCar: null,
      showForm: false
    };
  }
  componentDidMount() {
    console.log("m");
    fetch("http://localhost:3300/api/cars")
      .then(res => res.json())
      .then(data => {
        this.setState({
          cars: data
        });
        console.log(data);
      })
      .catch(console.log);
  }
  

  render() {
    const { cars, clickedCar, editedCar } = this.state;
    const { history, match } = this.props;
    return (
      <div className="container">
        <Switch>
          <Route path={`${match.url}/car-detail/:id`}>
            <CarDetail car={clickedCar} />
          </Route>
          <Route path={`${match.url}/form-edit/:id`}>
            <EditCarForm editedCar={editedCar} />
          </Route>
          <Route path={`${match.url}/form-new`}>
            <NewCarForm />
          </Route>
          
          <Route path={`/`}>
            <h1 className="mb-5">Cars:</h1>
            <div className="mb-5">
              <ul className="list-group mb-3">
                {cars.map((car, i) => {
                  return (
                    <Car
                      key={i}
                      car={car}
                      showDetail={this.showDetail}
                      editHandler={() => {
                        this.editHandler(car);
                        history.push(`${match.url}/form-edit/${car._id}`);
                      }}
                      deleteHandler={this.deleteHandler}
                    />
                  );
                })}
              </ul>
              <button
                className="btn btn-primary float-right mb-5"
                onClick={() => {
                  history.push(`${match.url}/form-new`);
                }}
              >
                Add task
              </button>
            </div>
          </Route>
        </Switch>
      </div>
    );
  }

  deleteHandler = car => {
    const { cars } = this.state;
    this.setState({
      cars: cars.filter(oneCar => oneCar._id !== car._id)
    });
    fetch(`http://localhost:3300/api/cars/${car._id}`, {
      method: "DELETE"
    });
  };

  showDetail = car => {
    const { history, match } = this.props;
    this.setState({
      clickedCar: car
    });

    history.push(`${match.url}/car-detail/${car._id}`);
  };

  editHandler = car => {
    this.setState({
      showForm: true,
      editedCar: car
    });
  };


  
}

export default withRouter(Cars);
