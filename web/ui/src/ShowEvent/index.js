import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './show-event.css';

class ShowEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const event_id = this.props.match.params.id;

    this.getEvent(event_id);
  }

  getEvent(id) {
    let url = "http://localhost:5000/get_events?id=" + id;

    fetch(url, { method: 'GET' })
      .then( response => response.json() )
      .then( data => this.setState({events: data}) );
  }

  render() {
    const event = this.state.events[0];

    if (!event) {
      return <div>Nop</div>;
    }

    return (
      <div>
        <NavLink className="event-add-button show-form mdl-button" to="/">
          <i className="material-icons">arrow_back</i>
        </NavLink>

        <div key={event.id} className="row">
          <div className="row-item row-details">
            <div className="row-inner-item show-title">
              <span>{event.title}</span>
            </div>

            <div className="row-inner-item show-datetime">
              <span>{event.date}, {event.time}</span>
            </div>

            <div className="row-inner-item show-location">
              <span className="location-event">{event.location}</span>
            </div>
          </div>

          <div className="row-item row-description">
            <div className="row-inner-item row-description-head">
              <span>Details</span>
            </div>

            <div className="row-inner-item show-description">
              <span>{event.description}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowEvent;
