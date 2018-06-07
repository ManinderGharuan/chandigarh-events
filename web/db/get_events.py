from datetime import datetime
from models import Event


def unduplicate(session, data):
    """
    Returns dictionary of data after removing the duplicate
    """
    query = session.query(Event)
    result = None
    date = datetime.strptime(data.get('datetime'), "%Y-%m-%dT%H:%M")
    data['datetime'] = date

    result = query.filter(Event.datetime == data.get('datetime'),
                          Event.location == data.get('location')).first()

    if result:
        raise Exception("Event already created.")

    return data


def save_events(session, data):
    """
    Save `data` in events database
    """
    try:
        result = unduplicate(session, data)

        event = Event(**result)
        session.add(event)
        session.commit()
    except Exception as error:
        print("Failed to save data in database: ", error)
