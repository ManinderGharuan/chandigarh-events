from json import dumps
from flask import Flask, request
from flask_cors import cross_origin
from web.db.get_events import save_event, get_db_events
from web.db import get_session


app = Flask(__name__)
app.secret_key = "secure"

session = get_session()


@app.route('/')
def show_mainpage():
    return "<h1>hello</h1>"


@app.route('/event', methods=['POST'])
@cross_origin(headers=["Content-Type", "application/json"])
def save_events():
    data = request.get_json()

    save_event(session, data)

    return "Ok"


@app.route('/get_events', methods=['GET'])
@cross_origin(headers=["Content-Type", "application/json"])
def get_events():
    id = request.args.get('id')

    data = get_db_events(session, id)

    return dumps(data)
