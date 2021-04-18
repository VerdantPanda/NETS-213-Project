import React from "react";
class TurkerView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Turker View</h1>
        <p>This is what a Amazon Mturk worker will view</p>
        <p>Worker ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}
export default TurkerView;
