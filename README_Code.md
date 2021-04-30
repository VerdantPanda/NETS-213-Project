# Second Opinion: Code Description
NETS 213 project by Ibrahim Fagbamila, Izzy Kim, Nick Ng, &amp; Susan Xie

## Code:
Major components: 
- Node.js / Express backend
- MongoDB database
- ImgBB API for image uploads and storage
- React Frontend

### Frontend
Our frontend is a React App. We have a few basic webpages:
From the user standpoint, we have a homepage, a page to upload photos, and a page displaying voting results. 
From the crowdworker standpoint, we have a page where new questions show up and workers can answer as they appear. 
As photos are uploaded, they are stored at various URLs with ImgBB. These images are accessed in order to display to 
workers where they can then vote on which they prefer. 
In order to get compensation, workers are able to enter their MTurk worker IDS so we can track their time and what they've
responded to. This information is also useful for quality control.

### Backend
Data is passed to the backend via URL get and post requests. When the data is passed to the backend from the 
frontend, our database in MongoDB Atlas is also updated with the information. Basically, the backend is just used 
for interfacing between the frontend and MongoDB. It also collects user data, general information about the jobs, and will
eventually be responsible for realtime aggregation and QC when our data gets better.

## Analysis: 
From the MongoDB database, we are able to export our data in the form of .json files. We have two main collections in our
database: questions and workers. "Questions" contains all the polls that were asked, including the image data, the time the 
question was asked, and all the workers' responses with timestamps and associated workerIDs. "Workers" meanwhile includes the
timestamp the worker entered the site, the timestamp of when the worker completed the task, and a list of all the questions
the worker answered. 

We are then able to use our Aggregation and QC Modules to parse and analyze the .json files. 
