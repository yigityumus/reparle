from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from datetime import datetime
from g2p_en import G2p
import speech_recognition as sr
import ebisu

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/card'
mongo = PyMongo(app)
card_collection = mongo.db.card

default_model = (4., 4., 24.)

@app.route('/submit-card', methods=['POST'])
def submit_card():
    data = request.json

    if not all(key in data for key in ['user_id', 'question_id', 'date', 'answer_tp']):
        return jsonify({'error': 'Incomplete data'}), 400

    user_id = data['user_id']
    question_id = data['question_id']

    query = {
        'user_id': user_id,
        'question_id': question_id
    }
    user_card = card_collection.find_one(query)

    if not user_card:
        card_data = {
            'user_id': user_id,
            'question_id': question_id,
            'previous_answer_tp': [],
            'next_review_date': datetime.now().strftime('%Y-%m-%d')
        }

        card_collection.insert_one(card_data)
    else:
        previous_answer_tp = user_card.get('previous_answer_tp', [])
        new_answer = {
            'date': datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S.%fZ'),
            'answer_tp': data['answer_tp']
        }

        previous_answer_tp.append(new_answer)
        user_card['previous_answer_tp'] = previous_answer_tp

        card_collection.update_one(query, {'$set': user_card})

    return jsonify({'message': 'Results submitted successfully'}), 200

@app.route('/get-user-card', methods=['GET'])
def get_user_card():
    user_id = request.args.get('user_id')
    question_id = request.args.get('question_id')

    if not user_id or not question_id:
        return jsonify({'error': 'Both user_id and question_id are required'}), 400

    query = {
        'user_id': user_id,
        'question_id': question_id
    }

    user_card = card_collection.find_one(query)

    if not user_card:
        return jsonify({'error': 'User card not found'}), 404

    previous_answer_tp = user_card.get('previous_answer_tp', [])

    if previous_answer_tp:
        last_answer = previous_answer_tp[-1]
        last_review_date = datetime.strptime(last_answer['date'], '%Y-%m-%d')
        correctness = last_answer == 'correct'

        next_review_date = calculate_next_review_date(last_review_date, correctness)
    else:
        next_review_date = datetime.now().strftime('%Y-%m-%d')

    correctness = request.args.get('answer_tp') == 'correct'

    new_answer = {
        'date': datetime.now().strftime('%Y-%m-%d'),
        'answer_tp': 'correct' if correctness else 'incorrect'
    }

    user_card['previous_answer_tp'].append(new_answer)
    user_card['next_review_date'] = next_review_date

    card_collection.update_one(query, {'$set': user_card})

    return jsonify(user_card), 200

def calculate_next_review_date(last_review_date, correctness):
    #TODO
    
    return 0

@app.route('/upload', methods=['POST'])
def upload():
    voice_recording = request.files['voice_recording.wav']

    retlist = []
    retlist = recognize_speech(voice_recording)
    if retlist[0] == None:
        return retlist.append("Could not understand Audio")
    else:
        retlist.append(process_voice_recording(retlist[0]))
    
    return jsonify(result=retlist) 

def recognize_speech(audio_file):
    recognizer = sr.Recognizer()

    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio_data)
        confidence = recognizer.recognize_google(audio_data, show_all=True).get('alternative')[0].get('confidence')
        out = [text, confidence]
        return out

    except sr.UnknownValueError:
        print("Could not understand Audio")
    except sr.RequestError as e:
        print(f"Could not request results from Google Web Speech API; {e}")

def process_voice_recording(grapheme):
    g2p = G2p()
    out = g2p(grapheme)
    return out

if __name__ == '__main__':
    app.run(debug=True)
