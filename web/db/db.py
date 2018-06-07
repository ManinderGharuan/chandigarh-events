from os import path
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


def get_session():
    engine = create_engine('sqlite:///events.db')

    if not path.exists('events.db'):
        Base.metadata.create_all(engine)

    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()

    return session
