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
// import uploadToS3 from "../Network";

// import sendPhotos from "../Network";

class UserUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { speed: "", files: [], submitReady: false };
  }

  handleUpload(ev) {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    let file2 = this.uploadInput.files[1];
    // Split the filename to get the name and type
    let fileParts2 = this.uploadInput.files[1].name.split(".");
    let fileName2 = fileParts2[0];
    let fileType2 = fileParts2[1];
    console.log("Preparing the upload");
    console.log(file);
    console.log(file2);
    this.setState({ files: [file, file2] });

    // axios
    //   .post("http://localhost:3001/sign_s3", {
    //     fileName: fileName,
    //     fileType: fileType,
    //   })
    //   .then((response) => {
    //     var returnData = response.data.data.returnData;
    //     var signedRequest = returnData.signedRequest;
    //     var url = returnData.url;
    //     this.setState({ url: url });
    //     console.log("Recieved a signed request " + signedRequest);

    //     // Put the fileType in the headers for the upload
    //     var options = {
    //       headers: {
    //         "Content-Type": fileType,
    //       },
    //     };
    //     axios
    //       .put(signedRequest, file, options)
    //       .then((result) => {
    //         console.log("Response from s3");
    //         this.setState({ success: true });
    //       })
    //       .catch((error) => {
    //         alert("ERROR " + JSON.stringify(error));
    //       });
    //   })
    //   .catch((error) => {
    //     alert(JSON.stringify(error));
    //   });
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
              <div style={{ width: 205 }}>
                <b>Upload your photos:</b>
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  style={{ display: "none" }}
                  ref={(ref) => {
                    this.uploadInput = ref;
                  }}
                  multiple
                  onChange={() => {
                    this.handleUpload();
                  }}
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
                  <div>Some pics //TODO:</div>
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
            onClick={async () => {
              if (this.state.speed === "") {
                alert("You must select a speed!");
              } else if (this.state.files.length !== 2) {
                alert("You must upload exatly 2 photos!");
              } else {
                // await uploadToS3(this.state.files[0]);
                // await uploadToS3(this.state.files[1]);
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
