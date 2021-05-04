import React from "react";
import { Button, Container, Grid, AppBar, Toolbar } from "@material-ui/core";
import UserUpload from "./UserUpload";
import { getWorkerCount } from "../Network";

//  This is the page that users see
class UserView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postPhase: false,
      UserId: Math.random().toString(16).substr(2, 10),
      workerCount: 0,
    };

    this.updateOnlineUsers = this.updateOnlineUsers.bind(this);
  }

  async componentDidMount() {
    setInterval(this.updateOnlineUsers, 5000);
  }

  async updateOnlineUsers() {
    let count = await getWorkerCount();
    this.setState({ workerCount: count.data });
    console.log("user count: " + JSON.stringify(count.data));
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#4A8790" }}>
          <Toolbar>
            {this.state.workerCount} workers online
            <Grid container justify="flex-end">
              <Button
                edge="end"
                variant="contained"
                color="primary"
                size="large"
                style={{
                  background: "#b8d7dc",
                  borderRadius: 3,
                  boxShadow: "0 3px 5px 2px #244A50",
                  color: "black",
                  display: this.state.postPhase ? "none" : "",
                }}
                align="right"
                onClick={() => {
                  this.setState({ postPhase: true });
                }}
              >
                Post
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg">
          {!this.state.postPhase ? (
            <div>
              <h1 align="center">
                <b>Welcome to SecondOpinion!</b>
              </h1>
              <p align="center">Click "Post" to post a poll and begin</p>
            </div>
          ) : (
            <UserUpload UserId={this.state.UserId}></UserUpload>
          )}
        </Container>
      </div>
    );
  }
}
export default UserView;
