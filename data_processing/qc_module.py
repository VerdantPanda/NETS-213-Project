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

print('workers', workers)
print('questions', questions)
print('answers', answers)

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
print('full timers', ft)

#get the majority votes and final outcome
def get_majority_votes(answers):
    results = {}
    for answer in answers:
        code = answer['qID']
        if code not in results:
            results[code] = 1 if answer['answers'].count(1) >= answer['answers'].count(0) else 0
        else:
            print('wtf')
    return results

votes = get_majority_votes(answers)
print('votes', votes)

def get_final_outcome(answers):
    results = {}
    for answer in answers:
        code = answer['qID']
        if code not in results:
            results[code] = answer['true_answer']
        else:
            print('wtf')
    return results

true_answer = get_final_outcome(answers)
print('true labels', true_answer)

#get workers who answer at least 75% of the questions given to them in that time frame
def get_all_workers(workers):
    worker_list = set()
    for line in workers:
        worker_list.add(line['id'])
    return worker_list

worker_list = get_all_workers(workers)
print('worker_list', worker_list)

def get_worker_time_intervals():
    intervals = {}
    for worker in worker_list:
        if worker not in intervals.keys():
            intervals[worker] = []
    for l in workers:
        id = l['id']
        intervals[id].append([l['time_entered']['$date'], l['time_left']['$date']])
    return intervals
intervals = get_worker_time_intervals()
print('intervals', intervals)

def get_questions_shown(worker):
    ints = intervals[worker]
    l = set()
    for q in questions:
        for i in ints:
            if i[0] < q['time']['$date'] < i[1]:
                l.add(q['qID'])
    return l

qs = get_questions_shown('A15XX0WDRG29E7')
print('qs for A15XX0WDRG29E7', qs)


def get_worker_response_percentage(workers):
    worker_percentage = {}
    for stuff in workers:
        id = stuff['id']
        qs_answered = len(stuff['qs_answered'])
        qs_shown = len(get_questions_shown(id))
        worker_percentage[id] = qs_answered/qs_shown
    return worker_percentage

percentages = get_worker_response_percentage(workers)
print('percentage answered', percentages)


#get workers who agree with the majority most often
def get_agreement_majority(workers, majority_votes):
    worker_agree = {}
    worker_total = {}
    for worker in workers:
        w_id = worker['id']
        if w_id not in worker_agree.keys():
            worker_agree[w_id] = 0
        if w_id not in worker_total.keys():
            worker_total[w_id] = 0
        for q in worker['qs_answered']:
            qid = q['id']
            response = q['answer']
            vote = majority_votes[qid]
            worker_total[w_id] += 1
            if response == vote:
                worker_agree[w_id] += 1
    worker_percentages = [(wid, worker_agree[wid]/worker_total[wid]) for wid in worker_agree.keys()]
    return worker_percentages

a = get_agreement_majority(workers, votes)
print('percent agreement majority', a)

#get workers who agree with final vote most often
def get_agreement_labels(workers, true_labels):
    worker_agree = {}
    worker_total = {}
    for worker in workers:
        w_id = worker['id']
        if w_id not in worker_agree.keys():
            worker_agree[w_id] = 0
        if w_id not in worker_total.keys():
            worker_total[w_id] = 0
        for q in worker['qs_answered']:
            qid = q['id']
            response = q['answer']
            vote = true_labels[qid]
            worker_total[w_id] += 1
            if response == vote:
                worker_agree[w_id] += 1
    worker_percentages = [(wid, worker_agree[wid]/worker_total[wid]) for wid in worker_agree.keys()]
    return worker_percentages

b = get_agreement_labels(workers, true_answer)
print('percent agreement labels', b)
