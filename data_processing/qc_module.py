import json
import datetime

workers = 0
questions = 0
answers = 0
with open('../data/workers.json') as f:
    workers = json.load(f)
with open('../data/questions.json') as f2:
    questions = json.load(f2)
with open('../data/answers.json') as f3:
    answers = json.load(f3)

print(workers)
print(questions)
print(answers)

#sort for workers who enter and leave after the whole time
def get_full_time_workers(workers, percentage_full_time, full_time_duration):
    worker_times = {}
    for entry in workers:
        worker_id = entry['id']
        enter = datetime.datetime.strptime(entry['time_entered']['$date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        left = datetime.datetime.strptime(entry['time_left']['$date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        duration = left - enter
        if worker_id not in worker_times.keys():
            worker_times[worker_id] = []
        worker_times[worker_id].append(duration)
    good_workers = []
    for w, l in worker_times.items():
        total = len(l)
        count = 0
        for x in l:
            time = x.total_seconds()
            if time > full_time_duration*60:
                count += 1
        if count/total > percentage_full_time:
            good_workers.append(w)
    return good_workers

ft = get_full_time_workers(workers, .75, 20)
print(ft)

#get workers who answer at least 75% of the questions given to them in that time frame
def get_worker_response_percentage(workers, ):
    worker_times = {}
    for entry in workers:
        worker_id = entry['id']
        enter = datetime.datetime.strptime(entry['time_entered']['$date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        left = datetime.datetime.strptime(entry['time_left']['$date'], '%Y-%m-%dT%H:%M:%S.%fZ')
        duration = left - enter
        if worker_id not in worker_times.keys():
            worker_times[worker_id] = []
        worker_times[worker_id].append(duration)
    good_workers = []
    for w, l in worker_times.items():
        total = len(l)
        count = 0
        for x in l:
            time = x.total_seconds()
            if time > full_time_duration*60:
                count += 1
        if count/total > percentage_full_time:
            good_workers.append(w)
    return good_workers



#get workers average time to answer a question and percentage of times taken less than 10s (or some arb threshold)


#get workers who agree with the majority most often



