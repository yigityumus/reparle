from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/save-audio', methods=['POST'])
def save_audio():
    try:
        # Access the uploaded audio file
        audio_file = request.files['audio']
        # Save the audio file to the desired directory
        audio_file.save(f'../data/{audio_file.filename}')
        return 'Audio file saved successfully!', 200
    except Exception as e:
        print(e)
        return 'Failed to save audio file.', 500

if __name__ == '__main__':
    app.run(debug=True)