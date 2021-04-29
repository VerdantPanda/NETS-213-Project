import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Redirect } from "react-router";
import { logWorker } from "../Network";

class RedirectView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToUser: false,
      redirectToWorker: false,
      showDialog: false,
      workerId: "",
      count: 0,
    };
  }
  render() {
    if (this.state.redirectToUser) {
      return <Redirect to="/user"></Redirect>;
    }
    if (this.state.redirectToWorker) {
      return (
        <Redirect
          to={`/mturk/${this.state.workerId}?count=${this.state.count}`}
        ></Redirect>
      );
    }
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#4A8790" }}>
          <Toolbar>
            <Grid container justify="center">
              <h1>Select an option</h1>
            </Grid>
          </Toolbar>
        </AppBar>
        <br></br>
        <Container
          maxWidth="lg"
          style={{ justify: "center", textAlign: "center" }}
        >
          <Dialog
            open={this.state.showDialog}
            onClose={() => {
              this.setState({ showDialog: false });
            }}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Enter your Amazon Mechanical Turk Worker ID
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                In order to recieve proper compensation for your work you must
                enter in your Worker ID.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Worker ID"
                type="text"
                fullWidth
                onChange={(e) => {
                  this.setState({ workerId: e.target.value });
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                onClick={async () => {
                  let count = await logWorker(this.state.workerId);
                  // console.log("UMBRELLA: " + JSON.stringify(count));
                  this.setState({ count: count.data.count });
                  if (
                    this.state.workerId.length === 14 &&
                    this.state.workerId.match(/^[A-Za-z0-9]+$/)
                  ) {
                    this.setState({
                      showDialog: false,
                      redirectToWorker: true,
                    });
                  } else {
                    alert("Please enter a valid Worker ID");
                  }
                }}
                color="primary"
              >
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <Grid container spacing={10} justify="center">
            <Grid item>
              <Card
                style={{
                  width: 500,
                  backgroundColor: "#4A8790",
                  color: "white",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    this.setState({ redirectToUser: true });
                  }}
                >
                  <CardMedia
                    image="https://image.freepik.com/free-photo/young-afro-american-black-man-smiling-happy-taking-selfie-self-portrait-picture_1258-3260.jpg"
                    title="Fashionista"
                    style={{ height: 280 }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Submit Outfits
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Submit an outfit and get feedback
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card
                style={{
                  width: 500,
                  backgroundColor: "#4A8790",
                  color: "white",
                }}
              >
                <CardActionArea
                  onClick={() => {
                    this.setState({ showDialog: true });
                  }}
                >
                  <CardMedia
                    image="https://burst.shopifycdn.com/photos/happy-woman-on-computer.jpg?width=925&exif=1&iptc=1"
                    title="Turk Worker"
                    style={{ height: 280 }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Review Outfits
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Review outfits for compensation
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}
export default RedirectView;
