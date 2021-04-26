const express = require("express");
const morgan = require("morgan");

const app = express(); //Create new instance

const PORT = process.env.PORT || 5000; //Declare the port number

const uri = process.env.ATLAS_URI;

app.use(express.json()); //allows us to access request body as req.body
app.use(morgan("dev")); //enable incoming request logging in dev mode

app.get("/", (req, res) => {
  //Define the endpoint

  return res.send({
    status: "Healthy",
  });
});

job_count = 0
jobs = {}

app.post("/photo", (req, res) => {
  console.log(req.body)
  userid = req.body.user_id
  photo1 = req.body.photo_1_url
  photo2 = req.body.photo_2_url
  limit = req.body.votes_limit

  jobs['p1'] = photo1
  console.log(userid, limit, photo1)
  return res.send(jobs)

});

//modify for photos
app.get("/test1", (req, res) => {
  //Define the endpoint
  userid = req.query.user_id
  photo1 = req.query.photo_1_url
  photo2 = req.query.photo_2_url
  limit = req.query.votes_limit
  jobs[job_count] = {'user':userid,
                    'p1':photo1,
                    'p2':photo2, 
                    'limit':limit,
                    'responses':[],
                    'id': job_count}

  job_count = job_count + 1
  return res.json(jobs[job_count-1])
});

//modify to display votes
app.get("/test2", (req, res) => {
  //Define the endpoint
  job_id = req.query.job_id
  info = jobs[job_id].responses
  return res.json(info)
});


//modify to get worker votes
app.get("/test3", (req, res) => {
  //Define the endpoint
  job_id = req.query.job_id
  worker_id = req.query.worker_id
  resp = req.query.response
  comments = req.query.comments
  obj = {'worker_id': worker_id, 'response':resp, 'comments':comments}
  jobs[job_id].responses.push(obj)
  return res.json(obj)
});

//send workers new jobs
app.get("/test4", (req, res) => {
  //Define the endpoint
  new_jobs = []
  last_job_id = req.query.job_id
  if (last_job_id >= job_count){
    return res.json('no new jobs')
  }
  for (i = parseInt(last_job_id)+1; i <= job_count; i++) {
    new_jobs += jobs[i]
  }
  return res.json(new_jobs)
});




//modify to get worker votes
app.get("/testjobs", (req, res) => {
  //Define the endpoint
  console.log(jobs)
  return res.send({
    status: "Healthy",
  });
});



app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});
