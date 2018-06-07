from flask import Flask, request
from flask_cors import cross_origin
from web.db.get_events import save_events
from web.db import get_session


app = Flask(__name__)
app.secret_key = "secure"

session = get_session()


@app.route('/')
def show_mainpage():
    return "<h1>hello</h1>"


@app.route('/event', methods=['POST'])
@cross_origin(headers=["Content-Type", "application/json"])
def get_event():
    data = request.get_json()

    save_events(session, data)

    return "Ok"
