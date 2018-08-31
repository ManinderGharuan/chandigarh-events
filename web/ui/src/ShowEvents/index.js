import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './show-events.css';

class ShowEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    let url = "http://localhost:5000/get_events";

    fetch(url, { method: 'GET' })
      .then( response => response.json() )
      .then(
        data => this.setState( {events: data} )
      );
  }

  renderRow(event) {
    return (
        <div className="row">
          <div className="row-item" >
            <div className="row-inner-item show-title">
              <span>{event.title}</span>
            </div>

            <div className="row-inner-item show-datetime">
              <span>{event.date}  {event.time}</span>
            </div>

            <div className="row-inner-item show-location">
              <span className="location-event">{event.location}</span>
            </div>
          </div>
        </div>
    );
  }

  render() {
    const {events} = this.state;

    return (
      <div className="event-list-container">
        <NavLink className="event-add-button show-form mdl-button" to="/show_form">
          <i className="material-icons">add</i>
        </NavLink>

        {
          events.length !== 0 ? events.map( event =>
            <NavLink key={event.id} to={`/event_${event.id}`} >
              { this.renderRow(event) }
            </NavLink> ) : this.renderRow({title: "No Event Available"})
        }
      </div>
    );
  }
}

export default ShowEvents;
