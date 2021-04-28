import React from "react";
import { Button, Card, Container } from "@material-ui/core";
import JobViewImg from "./JobViewImg";
// import { sendVote } from "../Network";
class JobView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgHeight: "200px",
      imgWidth: "200px",
      submitImg: 0,
      textDesc: "",
    };
    this.getImg = this.getImg.bind(this);
  }

  getImg(selectedImagesObj) {
    if (selectedImagesObj.photo1Selected) {
      this.setState({ submitImg: 1 });
    } else if (selectedImagesObj.photo2Selected) {
      this.setState({ submitImg: 2 });
    } else {
      this.setState({ submitImg: 0 });
    }
  }

  render() {
    return (
      <div>
        <Card
          style={{
            width: "auto",
            height: "400px",
            backgroundColor: "#4A8790",
          }}
        >
          <Container maxWidth="lg" style={{ justify: "center" }}>
            <br></br>
            <JobViewImg
              viewKey={this.props.viewKey}
              photo_1={this.props.photo_1}
              photo_2={this.props.photo_2}
              imgheight={this.state.imgHeight}
              imgWidth={this.state.imgWidth}
              sendImg={this.getImg}
            ></JobViewImg>
            <br></br>
            <p style={{ color: "white" }}>
              Describe your chosen outfit in one word:
            </p>
            <input
              type="text"
              onChange={(e) => {
                this.setState({ textDesc: e.target.value });
              }}
            ></input>
          </Container>
          <br></br>
          <Button
            variant="outlined"
            style={{ color: "white" }}
            onClick={() => {
              if (this.state.submitImg > 0) {
                console.log("Mock submission axios call");
                // console.log(
                //   JSON.stringify({
                //     userid: this.props.userid,
                //     picture_vote: this.state.submitImg,
                //     comments: this.state.textDesc,
                //   })
                // );
                // TODO: Axios call
                // sendVote()
                this.props.sendJobsToDelete(this.props.userid);
              } else {
                alert("You must select an outfit before submitting!");
              }
            }}
          >
            SUBMIT
          </Button>
          <br></br>
        </Card>
      </div>
    );
  }
}
export default JobView;
