import React from "react";
import { Button, Container, Grid, AppBar, Toolbar } from "@material-ui/core";
import UserUpload from "./UserUpload";

const useStyles = {
  background: "#b8d7dc",
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px #244A50",
  color: "black",
};

//  This is the page that users see
class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { postPhase: false };
  }
  render() {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#4A8790" }}>
          <Toolbar>
            <Grid container justify="flex-end">
              <Button
                edge="end"
                variant="contained"
                color="primary"
                size="large"
                style={useStyles}
                align="right"
              >
                Post
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          {/* <h1 align="center">
            <b>Welcome to SecondOpinion!</b>
          </h1>
          <p align="center">Click "Post" to post a poll and begin</p> */}
          <UserUpload></UserUpload>
        </Container>
      </div>
    );
  }
}
export default UserView;
