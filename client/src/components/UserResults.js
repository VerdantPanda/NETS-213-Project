import React from "react";
import { Container, Grid, LinearProgress, Chip } from "@material-ui/core";
import { getVotes } from "../Network";

class UserResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitA: 0,
      outfitB: 0,
      totalVotes: 0,
      pollInterval: null,
      comments: [""],
    };
    this.pollVotes = this.pollVotes.bind(this);
  }

  async componentDidMount() {
    let intervalId = setInterval(this.pollVotes, 5000);
    this.setState({ pollInterval: intervalId });
    await this.pollVotes();
  }

  async pollVotes() {
    console.log("USERID: " + this.props.UserId);
    let theResults = await getVotes(this.props.UserId);
    let results = theResults.data;
    console.log("RESULTS: " + results);
    console.log("RESULTS: " + JSON.stringify(results));
    // let results = {
    //   // MOCK
    //   Votes_photo_1: 0,
    //   Votes_photo_2: 0,
    //   Comments: [],
    // };

    let total = results.Votes_photo_1 + results.Votes_photo_2;
    let aNum = Math.floor((100.0 * results.Votes_photo_1) / total);
    let bNum = Math.floor((100.0 * results.Votes_photo_2) / total);

    this.setState({
      outfitA: aNum,
      outfitB: bNum,
      comments: results.Comments,
      totalVotes: total,
    });
    if (total > 20) {
      clearInterval(this.state.pollInterval);
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <br></br>
        <br></br>
        <h1>Your Poll:</h1>
        <Container size="lg" style={{ justify: "center" }}>
          <Grid container spacing={10} justify="center">
            <Grid item>
              <h3>A</h3>
              {/* <div
                style={{ height: 200, width: 200, backgroundColor: "gray" }}
              ></div> */}
              <img
                alt="pic_1_url"
                src={this.props.pic_1_url}
                style={{ height: 200, width: 200 }}
              ></img>
            </Grid>
            <Grid item>
              <div>
                <h3>B</h3>
                {/* <div
                  style={{ height: 200, width: 200, backgroundColor: "gray" }}
                ></div> */}
                <img
                  alt="pic_2_url"
                  src={this.props.pic_2_url}
                  style={{ height: 200, width: 200 }}
                ></img>
              </div>
            </Grid>
          </Grid>
        </Container>

        <br></br>
        <br></br>
        <br></br>

        <Container size="lg" style={{ textAlign: "center" }}>
          <LinearProgress
            variant="buffer"
            value={this.state.outfitA}
            valueBuffer={this.state.outfitA > 0 ? this.state.outfitA + 10 : 0}
          />{" "}
          <div>
            <i>OUTFIT A</i>
          </div>
          <br></br>
          <br></br>
          <LinearProgress
            variant="buffer"
            value={this.state.outfitB}
            valueBuffer={this.state.outfitB > 0 ? this.state.outfitB + 10 : 0}
            color="secondary"
          />{" "}
          <div>
            <i>OUTFIT B</i>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </Container>
        <h4>Comments:</h4>
        {this.state.comments === null ? <p>No comments to show.</p> : null}
        {this.state.comments.map((comment, key) => (
          <Chip
            key={key}
            style={{ marginLeft: 10, marginRight: 10, marginBottom: 10 }}
            label={comment}
            onClick={() => {}}
          ></Chip>
        ))}
        <br></br>
        <br></br>
      </div>
    );
  }
}
export default UserResults;
