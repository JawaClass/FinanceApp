from flask import Flask, Response
import yahoo_backend
import json
app = Flask(__name__)
# flask --app app:app run --port 5000 --host 0.0.0.0 --debug

@app.get("/history")
def history():
    return Response(yahoo_backend.history("AAPL").to_json(), mimetype="JSON")


@app.get("/")
def hello_world():
    return "YahooFinance Backend is running."