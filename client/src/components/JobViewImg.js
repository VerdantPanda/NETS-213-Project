import React from "react";
import { Grid, CardActionArea } from "@material-ui/core";

class JobViewImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = { photo1Selected: false, photo2Selected: false };
  }

  // TODO: function to communicate with parent
  // function to send selected image up to parent component
  // send comments

  /*
  props:
    viewKey
    photo_1
    photo_2
    imgheight
    imgWidth
  */
  render() {
    return (
      <Grid container justify="center" spacing={3}>
        <Grid item>
          <CardActionArea
            onClick={(e) => {
              this.setState((prevState, props) => ({
                photo1Selected: !prevState.photo1Selected,
                photo2Selected: false,
              }));
              this.props.sendImg({
                photo1Selected: !this.state.photo1Selected,
                photo2Selected: false,
              });
            }}
          >
            <img
              src={this.props.photo_1}
              alt={this.props.photo_1}
              style={{
                border: this.state.photo1Selected ? "5px solid white" : "",
                borderRadius: this.state.photo1Selected ? "5px" : "",
                height: this.props.imgheight,
                width: this.props.imgWidth,
              }}
            ></img>
          </CardActionArea>
        </Grid>
        <Grid item>
          <CardActionArea
            onClick={(e) => {
              this.setState((prevState, props) => ({
                photo1Selected: false,
                photo2Selected: !prevState.photo2Selected,
              }));
              this.props.sendImg({
                photo1Selected: false,
                photo2Selected: !this.state.photo2Selected,
              });
            }}
          >
            <img
              src={this.props.photo_2}
              alt={this.props.photo_2}
              style={{
                border: this.state.photo2Selected ? "5px solid white" : "",
                borderRadius: this.state.photo2Selected ? "5px" : "",
                height: this.props.imgheight,
                width: this.props.imgWidth,
              }}
            ></img>
          </CardActionArea>
        </Grid>
      </Grid>
    );
  }
}
export default JobViewImg;

/*

*/
