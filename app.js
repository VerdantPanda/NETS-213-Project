const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const answerSchema = require("./Schemas/Answer.model.js");
const workerSchema = require("./Schemas/Worker.model.js");
const questionSchema = require("./Schemas/Question.model.js");
const answer = mongoose.model("answer", answerSchema, "answer");
const worker = mongoose.model("worker", workerSchema, "workers");
const question = mongoose.model("question", questionSchema, "questions");
const path = require("path");
require("dotenv").config(); // Configure dotenv to load in the .env file

const string_thing =
  "mongodb+srv://dbUser:nets213@cluster0.wxprm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const string_thing = process.env.ATLAS_URI;
mongoose
  .connect(string_thing, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Connected to DB"))
  .catch((err) => console.log(err));
const { connection } = mongoose;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// var aws = require("aws-sdk");
const cors = require("cors");

// const { WellArchitected } = require("aws-sdk");
// Configure aws with your accessKeyId and your secretAccessKey
// aws.config.update({
//   region: "us-east-1", // Put your aws region here
//   accessKeyId: process.env.AWSAccessKeyId,
//   secretAccessKey: process.env.AWSSecretKey,
// });
//for deploy
// const S3_BUCKET = process.env.bucket;

const app = express(); //Create new instance

const PORT = process.env.PORT || 5000; //Declare the port number

app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev")); //enable incoming request logging in dev mode
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(cors());

app.get("/api", (req, res) => {
  //Define the endpoint

  return res.send({
    status: "Healthy",
  });
});

jobs = {};

app.post("/api/photo", (req, res) => {
  console.log(req.body);
  console.log("hi");
  userid = req.body.user_id;
  photo1 = req.body.photo_1_url;
  photo2 = req.body.photo_2_url;
  limit = req.body.votes_limit;

  jobs["p1"] = photo1;
  console.log(userid, limit, photo1);
  return res.send(jobs);
});
counter = 0;

// app.post('/photos', async(req,res) => {

//   userid = req.body.userid
//   photo_1 = req.body.photo_1_url
//   photo_2 = req.body.photo_2_url
//   limit = req.body.votes_limit

//   const s3 = new aws.S3();  // Create a new instance of S3
//   const fileName = photo_1;
//   const fileType = photo_1.type;
// // Set up the payload of what we are sending to the S3 api
//   const s3Params = {
//     Bucket: S3_BUCKET,
//     Key: fileName,
//     Expires: 500,
//     ContentType: fileType,
//     ACL: 'public-read'
//   };

//   const s32 = new aws.S3();  // Create a new instance of S3
//   const fileName2 = photo_2;
//   const fileType2 = photo_2.type;
// // Set up the payload of what we are sending to the S3 api
//   const s32Params = {
//     Bucket: S3_BUCKET,
//     Key: fileName2,
//     Expires: 500,
//     ContentType: fileType2,
//     ACL: 'public-read'
//   };

//   s3.getSignedUrl('putObject', s3Params, (err, data) => {
//     if(err){
//       console.log(err);
//       res.json({success: false, error: err})
//     }

//     const returnData = {
//       signedRequest: data,
//       url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
//     };
//     // Send it all back
//     s3.getSignedUrl('putObject', s3Params, (err2, data2) => {
//       if(err2){
//         console.log(err2);
//         res.json({success: false, error: err2})
//       }

//       const returnData = {
//         signedRequest: data2,
//         url2: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName2}`
//       };

//       xd = await question.countDocuments()
//       var new_job = new question({
//                       qID : xd,
//                       image1: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
//                       image2: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName2}`,
//                       time: Date.now(),
//                       vote_limit: limit
//                     })
//       new_job.save()

//       return res.json(xd);
//     });
//   });
// });

//modify for photos
app.post("/api/photos", async (req, res) => {
  //Define the endpoint
  // await client.connect();
  // const database = client.db('myFirstDatabase')
  // y = database.collection('questions')
  // lmao = await y.countDocuments()

  userid = req.body.userid;
  photo1 = req.body.photo_1_url;
  photo2 = req.body.photo_2_url;
  limit = req.body.votes_limit;

  xd = await question.countDocuments();
  var new_job = new question({
    qID: xd,
    image1: photo1,
    image2: photo2,
    time: Date.now(),
    vote_limit: limit,
  });
  await new_job.save();

  // jobs[job_count] = {'user':userid,
  //                   'p1':photo1,
  //                   'p2':photo2,
  //                   'limit':limit,
  //                   'responses':[],
  //                   'id': job_count}
  // job_count = job_count + 1
  return res.json(xd);
});

//modify to display votes
app.get("/api/votes", async (req, res) => {
  //Define the endpoint
  job_id = req.query.job_id;
  console.log("BODY: " + req.body);
  console.log("BODY: " + JSON.stringify(req.body));
  console.log("THIS IS THE SERVER JOBID: " + job_id);
  let response = await question.findOne({ qID: job_id });
  if (response) {
    q1s = 0;
    q2s = 0;
    comments = [];
    vs = response.votes;
    for (i = 0; i < vs.length; i++) {
      if (vs[i].answer == 1) {
        q1s += 1;
      } else {
        q2s += 1;
      }
      comments.push(vs[i].comments);
    }
    return res.json({
      Votes_photo_1: q1s,
      Votes_photo_2: q2s,
      Comments: comments,
    });
  } else {
    console.log("uh oh");
    return res.json("oops");
  }
});

//modify to get worker votes
app.post("/api/vote", async (req, res) => {
  //Define the endpoint
  job_id = req.body.job_id;
  worker_id = req.body.worker_id;
  resp = req.body.picture_voted;
  comments = req.body.comments;

  var stuff = {
    worker_id: worker_id,
    answer: resp,
    comments: comments,
    time_answered: Date.now(),
  };
  lol = await question.updateOne(
    { qID: job_id },
    {
      $push: {
        votes: stuff,
      },
    }
  );
  var stuff2 = {
    id: job_id,
    time: Date.now(),
    answer: resp,
  };
  lol2 = await worker.updateOne(
    { id: worker_id },
    {
      $push: {
        qs_answered: stuff2,
      },
    }
  );
  if (lol) {
    return res.json(stuff);
  } else {
    return res.json("poop");
  }
});

//send workers new jobs
app.get("/api/jobs", async (req, res) => {
  //Define the endpoint

  // last_job_id = req.query.job_id;
  count = req.body.count;
  console.log("server count" + count);
  new_jobs = await question.find({ qID: { $gt: -1 } });
  if (new_jobs) {
    return res.json(new_jobs);
  } else {
    return res.json("no new jobs");
  }
});

//send workers new jobs
app.post("/api/test5", async (req, res) => {
  //Define the endpoint
  userid = req.body.user_id;
  l = await worker.findOne({ id: userid });
  count = (await question.countDocuments()) - 1;
  if (l) {
    return res.json({ message: "was already here", count: count });
  } else {
    var new_worker = new worker({
      id: userid,
      time_entered: Date.now(),
      time_left: Date.now(),
      qs_answered: [],
    });
    response = await new_worker.save();

    if (response) {
      return res.json({ count: count });
    } else {
      return res.json("oops");
    }
  }
});

//modify to get worker votes
app.get("/api/testjobs", (req, res) => {
  //Define the endpoint
  console.log(jobs);
  return res.send({
    status: "Healthy",
  });
});

// Root endpoint
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});
