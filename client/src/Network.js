// import S3FileUpload from "react-s3";
const axios = require("axios");
// const baseURL = "http://localhost:5000/";
const baseURL = "/api/";

async function sendPhotos(userid, photo_1_url, photo_2_url, votes_limit) {
  let imgbbURL_1 = "";
  let imgbbURL_2 = "";
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
    // const testURL =
    //   "https://api.imgbb.com/1/upload?key=2d87cb340c2a1c5dec37b002b8dd644f&image=";

    let body = new FormData();
    body.set("key", "2d87cb340c2a1c5dec37b002b8dd644f");
    body.append("image", photo_1_url);
    console.log("About to send to imgbb");
    const res = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body,
    });
    imgbbURL_1 = res.data.data.display_url;

    let body2 = new FormData();
    body2.set("key", "2d87cb340c2a1c5dec37b002b8dd644f");
    body2.append("image", photo_2_url);
    console.log("About to send to imgbb2");
    const res2 = await axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload",
      data: body2,
    });
    imgbbURL_2 = res2.data.data.display_url;
  } catch (error) {
    console.log(error);
  }

  let bigRes = await axios.default
    .post(`${baseURL}photos`, {
      userid: userid,
      photo_1_url: imgbbURL_1,
      photo_2_url: imgbbURL_2,
      votes_limits: votes_limit,
    })
    .catch((error) => {
      console.log(error);
    });
  console.log("Successfully sent photos");
  console.log(JSON.stringify(bigRes));
  return {
    myNum: bigRes.data ?? 0,
    pic_1_url: imgbbURL_1,
    pic_2_url: imgbbURL_2,
  };
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

async function sendVote(jobid, worker_id, picture_voted, comments) {
  await axios.default
    .post(`${baseURL}vote`, {
      job_id: jobid,
      worker_id: worker_id,
      picture_voted: picture_voted,
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

async function getJobs(count) {
  let jobList = [];
  try {
    jobList = await axios.default.get(`${baseURL}jobs`, { count: count });
  } catch (error) {
    console.log("ERROR: " + error);
  }
  console.log("JobList: " + JSON.stringify(jobList.data));
  return jobList.data;
}

async function getVotes(jobId) {
  console.log("THIS IS THE JOBID @ getVotes(): " + jobId);
  let votingData = {};
  // TODO: use jobId
  try {
    votingData = await axios.default.get(`${baseURL}votes`, {
      params: { job_id: jobId },
    });
  } catch (error) {
    console.log("ERROR: " + error);
  }
  return votingData;
}

async function logWorker(workerId) {
  let ret = await axios.default
    .post(`${baseURL}test5`, {
      user_id: workerId,
    })
    .catch((error) => {
      console.log(error);
    });
  return ret;
}

async function logSessionEnd(worker_id) {
  await axios.default
    .post(`${baseURL}end`, {
      time: Date.now,
      worker_id: worker_id,
    })
    .catch((error) => {
      console.log(error);
    });
}

export { sendPhotos, sendVote, getJobs, getVotes, logWorker, logSessionEnd };
