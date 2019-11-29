import React from "react";
import { Link } from "react-router-dom";

export default function CarDetail(props) {
  const { car } = props;
  console.log(car);
  return (
    <div>
      <h1>Car detail</h1>
      <div className="card mt-3" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title"><strong>Brand :</strong> {car ? car.brand : ""}</h5>
          <p className="card-text"><strong>SPZ :</strong> {car ? car.spz : ""}</p>
        </div>
      </div>
      <Link to="/cars">Go back</Link>
    </div>
  );
}
