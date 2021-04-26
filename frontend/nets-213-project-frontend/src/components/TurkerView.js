import React from "react";
import { Button, Container, Grid, AppBar, Toolbar } from "@material-ui/core";
import JobView from "./JobView";

class TurkerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [
        {
          userid: 12345,
          photo_1_url:
            "https://i0.wp.com/bloggers.society19.com/wp-content/uploads/2015/11/Minimal-and-classy-Winter-outfits-mens-should-try_.jpg?resize=550%2C823&ssl=1",
          photo_2_url:
            "https://onpointfresh.com/wp-content/uploads/2016/08/tumblr_o379krD8hq1uceufyo1_1280.jpg",
          votes_limit: 1,
        },
        {
          userid: 54321,
          photo_1_url:
            "https://i0.wp.com/bloggers.society19.com/wp-content/uploads/2015/11/Minimal-and-classy-Winter-outfits-mens-should-try_.jpg?resize=550%2C823&ssl=1",
          photo_2_url:
            "https://onpointfresh.com/wp-content/uploads/2016/08/tumblr_o379krD8hq1uceufyo1_1280.jpg",
          votes_limit: 1,
        },
        {
          userid: 53435,
          photo_1_url:
            "https://i0.wp.com/bloggers.society19.com/wp-content/uploads/2015/11/Minimal-and-classy-Winter-outfits-mens-should-try_.jpg?resize=550%2C823&ssl=1",
          photo_2_url:
            "https://onpointfresh.com/wp-content/uploads/2016/08/tumblr_o379krD8hq1uceufyo1_1280.jpg",
          votes_limit: 1,
        },
      ],
    };

    this.getJobToDelete = this.getJobToDelete.bind(this);
  }

  getJobToDelete(viewsKey) {
    const newList = this.state.jobs.filter((job) => job.userid !== viewsKey);
    this.setState({ jobs: newList });
  }

  requestNewJobs() {
    // TODO: Axios call
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
            <b>INSTRUCTIONS:</b> Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <h3>NEW POLLS</h3>
          <Container
            maxWidth="sm"
            style={{
              overflow: "auto",
              maxHeight: "650px",
            }}
          >
            {this.state.jobs.length > 0
              ? this.state.jobs.map((elem, key) => {
                  return (
                    <div key={elem.userid}>
                      <JobView
                        photo_1={elem.photo_1_url}
                        photo_2={elem.photo_2_url}
                        userid={elem.userid}
                        viewKey={key}
                        sendJobsToDelete={this.getJobToDelete}
                      ></JobView>
                      <br></br>
                      <br></br>
                    </div>
                  );
                })
              : "No jobs currently available."}
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
