from web.db import Base
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.types import Text


class Event(Base):
    __tablename__ = 'event'

    id = Column(Integer, primary_key=True)
    title = Column(String(100))
    description = Column(Text)
    datetime = Column(DateTime)
    location = Column(String(200))
    type = Column(String(100))
