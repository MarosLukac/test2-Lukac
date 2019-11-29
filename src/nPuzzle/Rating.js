import React, { Component } from "react";

export default class Rating extends Component {
  state = {
    ratingsData: []
  };

  componentDidMount() {
    console.log("aaa");
    fetch("http://localhost:3300/api/Ratings")
      .then(res => res.json())
      .then(data => {
        this.setState({
          ratingsData: data
        });
        console.log(data);
      })
      .catch(console.log);
  }

  render() {
    return (
      <table className="table">
        <RatingTableHeader />
        <RatingTableBody ratingsData={this.state.ratingsData} />
      </table>
    );
  }
}

function RatingTableHeader() {
  return (
    <thead>
      <tr>
        <th>Rating</th>
      </tr>
    </thead>
  );
}

function RatingTableBody({ ratingsData }) {
  let ranks = 0;
  let rows = ratingsData.map((rating, index) => rating.rating);
  for (let i = 0; i < rows.length; i++) {
    ranks = ranks + rows[i];
  }
  ranks = Math.floor((ranks / rows.length) * 100) / 100;

  return (
    <tbody>
      <tr>
        <td>{ranks}</td>
      </tr>
    </tbody>
  );
}
