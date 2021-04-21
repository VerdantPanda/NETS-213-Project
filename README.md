# NETS-213-Project
NETS 213 project by Ibrahim Fagbamila, Izzy Kim, Nick Ng, &amp; Susan Xie

## Major Project Components:
Building the website for users and workers to interact with (9 pts)<br/>
Key site features:
- Allow users to upload photos
- Allow workers to wait and receive alerts for jobs when photos are uploaded
- Allow workers to vote between photos
- Aggregate and process results
- Display results to users in a timely manner

Creating jobs on MTurk and determining payment system (2 pts)
- Allow workers to find our website via MTurk
- Identify workers when they visit our site so that we can pay them for waiting and tasks
- Pay them for their contributions through MTurk

Collecting Data (4 pts)
- Have people use our site and ensure sure that it's functional
- Get feedback from both users and workers on the interface
- Track key metrics (e.g out how often the worker vote influences the person, average response times, etc.)

Data Processing (5 pts)
- Determine how helpful aggregate opinions are (does the user agree or go with the worker opinions in the end?)
- Examine effect of worker confidence on user decision (if all the workers think the same, will that convince the user more?) 
- Determine how good individual worker predictions are of the final worker vote (are some workers more representative of the crowd?)
- Determine how good individual worker predictions are of the user decision (are some workers more influential?)
- Determine how long it takes to aggregate responses
- Compare performance to a non-human baseline (perhaps a trained CV model in A/B testing)
- Explore more questions with the data we collected

## Milestones:
### MS1
Start building the website where users can upload photos and workers can wait/vote on polls.
### MS2
Build aggregation system and improve UI. Post HITs on MTurk and start having people interact with the website so we can collect data.
### MS3
Process the data we collected and evaluate the performance of our system.

## Aggregation and QC Modules
We store the results of our workers through a mongoDB database, which is then exported as a .json for our Aggregation and QC modules to parse. Our database has 3 schemas: a Question model, an Answer model, and a Worker model. 

The Question model is broken down as follows:
- qID: a unique numerical ID associated with each question
- image1: an image buffer containing the first image the user uploaded
- image2: an image buffer containing the second image the user uploaded
- time: the time the question was posted

The Answer model is broken down as follows: 
- qID: a numerical ID corresponding to a question
- answers: an array of 0s and 1s, where 0 refers to a worker answer of image1 and 1 refers to a worker answer of image2. 
- true_answer: 0 or 1, referring to what the user actually chose 

The Worker model is the most complex and contains the following: 
- id: a string containing the worker's MTurk ID
- time_entered: the time the user entered the site
- time_left: the time the user left the site
- qs_answered: an array of questions answered, containing the question ID, the time the question was answered by this particular worker, and a 0 or 1 associated with what the worker answered 

### Aggregation
To be found under data_processing -> ag_module. Worker votes are aggregated by using a polling system. A simple majority vote will be used to inform the buyer which of the two options they should choose from. 

### QC Module
To be found under data_processing -> qc_module. Quality control is done by having the worker input his/her id so that we can track which users are working on which poll. This way, we have access to who voted for which option so we can filter out workers who are randomly clicking any option. 
