from flask import Flask, request, jsonify
from flask_cors import CORS
from input_processor import analyze_bigrams

app = Flask(__name__)
CORS(app) 

@app.route("/", methods=["get"])
def default():
    result = "I'm am currently running"
    return jsonify(result)

@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")

    if not text or len(text.strip()) < 3:
        return jsonify({"error": "Text must be at least 3 characters long"}), 400

    result = analyze_bigrams(text)
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
