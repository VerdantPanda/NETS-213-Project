# Second Opinion: Code Description
NETS 213 project by Ibrahim Fagbamila, Izzy Kim, Nick Ng, &amp; Susan Xie

## Code:
Major components: 
- Node.js / Express frontend
- MongoDB backend
- Amazon S3 

### Frontend
Our frontend is a node.js / express app that uses React. We have a few basic webpages:
from the user standpoint, we have a homepage, a page to upload photos, and a page displaying survey results, 
and from the crowdworker standpoint, we have a page where new questions show up and workers can answer as they appear. 
As photos are uploaded, they are stored at various URLs with Amazon S3. From the MTurk HIT, workers are able to enter 
the site via a custom URL with their MTurk ID. 

### Backend
Data is passed to the backend via URL get and post requests. When the data is passed to the backend from the 
frontend, our database in MongoDB Atlas is also updated with the information. Basically, the backend is just used 
for interfacing between the frontend and MongoDB. 

## Analysis: 
From the MongoDB database, we are able to export our data in the form of .json files. We have two main collections in our
database: questions and workers. "Questions" contains all the polls that were asked, including the image data, the time the 
question was asked, and all the workers' responses with timestamps and associated workerIDs. "Workers" meanwhile includes the
timestamp the worker entered the site, the timestamp of when the worker completed the task, and a list of all the questions
the worker answered. 

We are then able to use our Aggregation and QC Modules to parse and analyze the .json files. 