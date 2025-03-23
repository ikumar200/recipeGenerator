import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Get Hugging Face API token from environment variable
HF_TOKEN = os.getenv("HF_TOKEN")

# Initialize Hugging Face client
# client = InferenceClient("https://jc26mwg228mkj8dw.us-east-1.aws.endpoints.huggingface.cloud")

@app.route("/generate-recipe", methods=["POST"])
def generate_recipe():
    try:
        # Get user input from the request
        data = request.get_json()
        user_prompt = data.get("prompt")

        if not user_prompt:
            return jsonify({"error": "Prompt is required"}), 400

        # Send the prompt to the Hugging Face API
        output = client.chat.completions.create(
            messages=[{"role": "user", "content": user_prompt}],
            stream=False,
            max_tokens=1024,
        )

        recipe = output.choices[0].message.content

        return jsonify({"recipe": recipe})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
