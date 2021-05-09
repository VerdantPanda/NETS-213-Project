import React from 'react';
import {
  Container,
  Grid,
  LinearProgress,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';
import { getVotes, sendFinalResponse } from '../Network';

class UserResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfitA: 0,
      outfitB: 0,
      totalVotes: 0,
      pollInterval: null,
      outfitInterval: null,
      comments: [''],
      outfitDecided: false,
      decideDialog: false,
      chosenOutfit: null,
      doneFinally: false,
    };
    this.pollVotes = this.pollVotes.bind(this);
    this.askIfDone = this.askIfDone.bind(this);
  }

  async componentDidMount() {
    let intervalId = setInterval(this.pollVotes, 5000);
    let intervalId2 = setInterval(this.askIfDone, 30000);

    this.setState({ pollInterval: intervalId, outfitInterval: intervalId2 });
    this.pollVotes();
    await this.pollVotes();
  }

  askIfDone() {
    this.setState({ decideDialog: true });
  }

  async pollVotes() {
    console.log('USERID: ' + this.props.UserId);
    let theResults = await getVotes(this.props.UserId);
    let results = theResults.data;
    // const results = {
    //   // MOCK
    //   Votes_photo_1: 8,
    //   Votes_photo_2: 11,
    //   Comments: [],
    // };
    // console.log("RESULTS: " + results);
    // console.log("RESULTS: " + JSON.stringify(results));

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
    return !this.state.doneFinally ? (
      <div style={{ textAlign: 'center' }}>
        <br></br>
        <br></br>
        <h1>Your Poll:</h1>
        <Container size="lg" style={{ justify: 'center' }}>
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

        <Container size="lg" style={{ textAlign: 'center' }}>
          <LinearProgress
            variant="buffer"
            value={this.state.outfitA}
            valueBuffer={0}
          />{' '}
          <div>
            <i>OUTFIT A</i>
          </div>
          <br></br>
          <br></br>
          <LinearProgress
            variant="buffer"
            value={this.state.outfitB}
            valueBuffer={0}
            color="secondary"
          />{' '}
          <div>
            <i>OUTFIT B</i>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </Container>
        <Dialog
          open={this.state.decideDialog}
          onClose={(e) => {
            this.setState({ decideDialog: false });
          }}
        >
          <DialogTitle>Select Final Outfit</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Have you decided on an outfit?
            </DialogContentText>{' '}
            <FormControl component="fieldset">
              <RadioGroup
                name="outfit"
                value={this.state.chosenOutfit}
                onChange={(e) => {
                  this.setState({ chosenOutfit: e.target.value });
                }}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Outfit A"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Outfit B"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => {
                this.setState({ decideDialog: false });
              }}
              color="primary"
              autoFocus
            >
              Not yet
            </Button>
            <Button
              onClick={async (e) => {
                if (this.state.chosenOutfit) {
                  // console.log('MOCK AXIOS CALL to submit chosen outfit.');
                  console.log('This was chosen: ' + this.state.chosenOutfit);
                  await sendFinalResponse(
                    this.props.UserId,
                    parseInt(this.state.chosenOutfit)
                  );
                  this.setState({ decideDialog: false, doneFinally: true });
                  clearInterval(this.state.outfitInterval);
                  clearInterval(this.state.pollInterval);
                }
              }}
              color="primary"
            >
              Sumbit
            </Button>
          </DialogActions>
        </Dialog>
        <h3>
          {this.state.totalVotes} vote{this.state.totalVotes !== 1 ? 's' : ''}{' '}
          recieved
        </h3>
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
    ) : (
      <div>
        <div style={{ textAlign: 'center' }}>
          <br></br>
          <br></br>
          <h1>You chose Outfit {this.state.chosenOutfit}!</h1>
          <Container size="lg" style={{ justify: 'center' }}>
            <img
              alt={this.state.chosenOutfit === 'A' ? 'pic_1_url' : 'pic_2_url'}
              src={
                this.state.chosenOutfit === 'A'
                  ? this.props.pic_1_url
                  : this.props.pic_2_url
              }
              style={{ height: 200, width: 200 }}
            ></img>
          </Container>
        </div>
      </div>
    );
  }
}
export default UserResults;
