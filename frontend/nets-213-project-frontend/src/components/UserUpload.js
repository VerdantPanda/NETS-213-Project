import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

class UserUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { speed: "" };
  }
  render() {
    return (
      <div>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Speed</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.speed}
            onChange={(event) => {
              this.setState({ speed: event.target.value });
            }}
            style={{ minWidth: "70px" }}
          >
            <MenuItem value={"Intermediate"}>Intermediate</MenuItem>
            <MenuItem value={"Fast"}>Fast</MenuItem>
          </Select>
        </FormControl>
      </div>
    );
  }
}
export default UserUpload;

/*
<input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />

*/
