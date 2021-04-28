// import S3FileUpload from "react-s3";
const axios = require("axios");
const baseURL = "http://localhost:5000/";
// const baseURL = "/api/";

async function sendPhotos(userid, photo_1_url, photo_2_url, votes_limit) {
  try {
    // const res = await axios.default.post(
    //   "https://api.imgbb.com/1/upload",
    //   {
    //     key: "2d87cb340c2a1c5dec37b002b8dd644f",
    //     image: photo_1_url,
    //   },
    //   {
    //     headers: {
    //       // "Content-Type": "application/json",
    //       // "Access-Control-Allow-Origin": "*",
    //       // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
    //       // "Access-Control-Allow-Headers": "Content-Type",
    //     },
    //   }
    // );
    // console.log(res);
    const testURL =
      "https://api.imgbb.com/1/upload?key=2d87cb340c2a1c5dec37b002b8dd644f&image=";
    const myInit = {
      method: "POST",
      mode: "no-cors",
      body: { image: photo_1_url },
    };

    const myRequest = new Request(testURL, myInit);

    fetch(myRequest)
      .then(function (response) {
        return response;
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (e) {
        console.log(e);
      });
  } catch (error) {
    console.log(error);
  }

  // await axios.default
  //   .post(`${baseURL}photos`, {
  //     userid: userid,
  //     photo_1_url: photo_1_url.name,
  //     photo_2_url: photo_2_url.name,
  //     votes_limits: votes_limit,
  //   })
  //   .then((res) => {
  //     console.log("Successfully sent photos");
  //     console.log(JSON.stringify(res));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
}

// async function uploadToS3(file) {
//   let res = {};
//   try {
//     res = await S3FileUpload.uploadFile(file, config);
//   } catch (error) {
//     console.log(error);
//   }
//   return res.location;
// }

async function sendVote(userid, picture_voted, comments) {
  await axios.default
    .post(`${baseURL}vote`, {
      userid: userid,
      picture_vote: picture_voted,
      comments: comments,
    })
    .then((res) => {
      console.log("Successfully sent vote");
      console.log(JSON.stringify(res));
    })
    .catch((error) => {
      console.log(error);
    });
}

async function getJobs() {
  let jobList = [];
  try {
    jobList = await axios.default.get(`${baseURL}jobs`);
  } catch (error) {
    console.log("ERROR: " + error);
  }
  return jobList;
}

async function getVotes(jobId) {
  let votingData = {};
  // TODO: use jobId
  try {
    votingData = await axios.default.get(`${baseURL}votes`, { job_id: jobId });
  } catch (error) {
    console.log("ERROR: " + error);
  }
  return votingData;
}

async function logWorker(workerId) {
  await axios.default
    .post(`${baseURL}test5`, {
      user_id: workerId,
    })
    .then((res) => {
      console.log("Successfully logged Worker");
      // console.log(JSON.stringify(res));
    })
    .catch((error) => {
      console.log(error);
    });
}

export { sendPhotos, sendVote, getJobs, getVotes, logWorker };
