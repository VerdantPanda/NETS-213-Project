const axios = require("axios");
const baseURL = "http://localhost:5000/";
// const baseURL = "/api/";

async function sendPhotos(userid, photo_1_url, photo_2_url, votes_limit) {
  await axios.default
    .post(`${baseURL}vote`, {
      userid: userid,
      photo_1_url: photo_1_url,
      photo_2_url: photo_2_url,
      votes_limits: votes_limit,
    })
    .then((res) => {
      console.log("Successfully sent photos");
      console.log(JSON.stringify(res));
    })
    .catch((error) => {
      console.log(error);
    });
}

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

async function getVotes() {
  let votingData = {};
  try {
    votingData = await axios.default.get(`${baseURL}votes`);
  } catch (error) {
    console.log("ERROR: " + error);
  }
  return votingData;
}

export { sendPhotos, sendVote, getJobs, getVotes };
