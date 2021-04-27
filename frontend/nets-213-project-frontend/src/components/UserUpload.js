import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  Container,
  Grid,
  IconButton,
  FormHelperText,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import UserResults from "./UserResults";
// import sendPhotos from "../Network";

class UserUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { speed: "", files: [], submitReady: false };
  }
  render() {
    if (this.state.submitReady) {
      return <UserResults UserId={this.props.UserId}></UserResults>;
    }
    return (
      <div>
        <br></br>
        <br></br>
        <Container size="lg" style={{ justify: "center" }}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <div style={{ width: 500 }}>
                <b>Upload your photos:</b>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                />
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <AddIcon></AddIcon>
                  </IconButton>
                </label>
                <br></br>
                <br></br>
                {this.state.files.length < 1 ? (
                  <div
                    style={{ height: 100, width: 100, backgroundColor: "gray" }}
                  ></div>
                ) : (
                  <div>Some pics</div>
                )}
              </div>
            </Grid>
            <Grid item>
              <div>
                <FormControl>
                  <InputLabel>Speed</InputLabel>
                  <Select
                    native
                    value={this.state.speed}
                    onChange={(e) => {
                      this.setState({ speed: e.target.value });
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={10}>Intermediate</option>
                    <option value={20}>Fast</option>
                  </Select>
                  <FormHelperText>Time taken for response</FormHelperText>
                </FormControl>
              </div>
            </Grid>
          </Grid>

          <br></br>
          <br></br>
          <br></br>
        </Container>
        <Container size="lg" style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (this.state.speed === "") {
                alert("You must select a speed!");
              } else if (this.state.files.length !== 2) {
                alert("You must upload exatly 2 photos!");
              } else {
                this.setState({ submitReady: true });
              }
            }}
          >
            Submit
          </Button>
        </Container>
      </div>
    );
  }
}
export default UserUpload;
