import React from "react";
import {
  Button,
  Container,
  Grid,
  AppBar,
  Toolbar,
  CircularProgress,
} from "@material-ui/core";
import JobView from "./JobView";
import { getJobs, logSessionEnd } from "../Network";

class TurkerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [
        // {
        //   userid: 12345,
        //   photo_1_url:
        //     "https://i0.wp.com/bloggers.society19.com/wp-content/uploads/2015/11/Minimal-and-classy-Winter-outfits-mens-should-try_.jpg?resize=550%2C823&ssl=1",
        //   photo_2_url:
        //     "https://onpointfresh.com/wp-content/uploads/2016/08/tumblr_o379krD8hq1uceufyo1_1280.jpg",
        //   votes_limit: 1,
        // },
      ],
      doneJobIds: [],
      intervalId: 0,
      count: 0,
      endSessionClicked: false,
    };

    this.getJobToDelete = this.getJobToDelete.bind(this);
    this.requestNewJobs = this.requestNewJobs.bind(this);
  }

  getJobToDelete(viewsKey) {
    let oldJobsList = [viewsKey];
    const newOldJobsArray = this.state.doneJobIds.concat(oldJobsList);
    this.setState({ doneJobIds: newOldJobsArray });
    const newList = this.state.jobs.filter((job) => job.qID !== viewsKey);
    this.setState({ jobs: newList });
  }

  async requestNewJobs() {
    if (this.state.jobs.length > 5) {
      // TODO: end condition for set interval
      clearInterval(this.state.intervalId);
    }
    let newJobs = [];

    console.log("THIS IS COUNT: " + this.state.count);
    // TODO: Axios call
    newJobs = (await getJobs(this.state.count)) ?? [];

    // console.log("mock AXIOS call request new jobs");
    let newJobArray = newJobs;
    console.log("PREFILTER: " + JSON.stringify(newJobArray));
    newJobArray = newJobArray
      .filter((job) => !this.state.doneJobIds.includes(job.qID))
      .filter(
        (job) => !this.state.jobs.map((job1) => job1.qID).includes(job.qID)
      )
      .filter((job) => job.qID > this.state.count); // Ensures old jobs dont show up again to turker
    console.log("POSTFILTER: " + JSON.stringify(newJobArray));
    console.log("CURRENT STATE: " + JSON.stringify(this.state.jobs));

    let newCount = this.state.count;
    for (var i = 0; i < newJobArray.length; i++) {
      if (newJobArray[i].qId > newCount) {
        newCount = newJobArray[i].qId;
        console.log("new pic found");
      } else {
        console.log("no new pic found");
      }
    }

    // this.setState({ count: newCount, jobs: newJobArray });
    this.setState((prevState, props) => ({
      jobs: prevState.jobs.concat(newJobArray),
      count: newCount,
    }));
  }

  componentDidMount() {
    const intervalId = setInterval(this.requestNewJobs, 5000);
    this.setState({ intervalId: intervalId });
    let count = parseInt(this.props.location.search.split("count=")[1]);
    this.setState({ count: count });
  }

  render() {
    return (
      <div>
        <AppBar position="static" style={{ backgroundColor: "#4A8790" }}>
          <Toolbar>
            <Grid container justify="flex-end">
              Your MTurk ID: {this.props.match.params.id}
            </Grid>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="lg"
          style={{
            textAlign: "center",
            justifycontent: "center",
          }}
        >
          <p>
            <b>INSTRUCTIONS:</b> These polls will involve photos of various
            outfits or clothing items. Please select the item that looks more
            appealing to you, and enter a short comment explaining why. Click
            the "End Session!" button when you finish your session. This will
            give you a code which you need to enter into MTurk to receive your
            payment.
            <br></br>
            <span style={{ color: "red" }}>
              If you do not click "End Session!" you will not recieve a payment!
            </span>
          </p>
          <Button
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "orange" }}
            disabled={this.state.endSessionClicked}
            onClick={async (e) => {
              await logSessionEnd(this.props.match.params.id);
              alert(
                `Your confirmation code is: \n${Math.random()
                  .toString(16)
                  .substr(2, 10)}`
              );
              this.setState({ endSessionClicked: true });
            }}
          >
            End Session!
          </Button>

          <br></br>
          <br></br>
          <br></br>
          <h3>NEW POLLS</h3>

          <Container
            maxWidth="sm"
            style={{
              overflow: "auto",
              maxHeight: "650px",
            }}
          >
            {this.state.jobs.length > 0 ? (
              this.state.jobs.map((elem, key) => {
                return (
                  <div key={elem.qID}>
                    <JobView
                      photo_1={elem.image1}
                      photo_2={elem.image2}
                      userid={elem.qID}
                      workerId={this.props.match.params.id}
                      viewKey={key}
                      sendJobsToDelete={this.getJobToDelete}
                    ></JobView>
                    <br></br>
                    <br></br>
                  </div>
                );
              })
            ) : (
              <div>
                <p>No new jobs currently available.</p>
                <CircularProgress />
              </div>
            )}
          </Container>
          <br></br>
          <br></br>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              window.open(
                "https://www.google.com/search?q=how+to+choose+an+outfit",
                "_blank"
              );
            }}
          >
            Need Help?
          </Button>
          <br></br>
          <br></br>
        </Container>
      </div>
    );
  }
}
export default TurkerView;
