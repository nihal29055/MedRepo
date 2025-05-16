from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load the summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@app.route("/summarize", methods=["POST"])
def summarize_text():
    try:
        data = request.json
        text = data.get("text", "")
        if not text:
            return jsonify({"error": "No text provided"}), 400

        # Perform summarization
        summary = summarizer(text, max_length=130, min_length=30, do_sample=False)
        return jsonify({"summary": summary[0]["summary_text"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)