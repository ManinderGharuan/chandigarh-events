from datetime import datetime
from sqlalchemy import asc
from models import Event


def unduplicate(session, data):
    """
    Returns dictionary of data after removing the duplicate
    """
    query = session.query(Event)
    result = None
    print(data.get('datetime'))
    date = datetime.strptime(data.get('datetime'), "%Y-%m-%dT%H:%M")
    data['datetime'] = date

    result = query.filter(Event.datetime == data.get('datetime'),
                          Event.location == data.get('location')).first()

    if result:
        raise Exception("Event already created.")

    return data


def save_event(session, data):
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


def get_db_events(session):
    """
    Return list of events in dictionary
    """
    try:
        events = session.query(Event).order_by(asc(Event.datetime)).all()
        data = []

        if events:
            for event in events:
                title = event.title
                description = event.description
                date = event.datetime.strftime("%d-%m-%Y")
                time = event.datetime.strftime("%I:%M %p")
                location = event.location
                type = event.type

                data.append(
                    dict(title=title, description=description, date=date,
                         time=time, location=location, type=type)
                )

        return data

    except Exception as e:
        print(e)
