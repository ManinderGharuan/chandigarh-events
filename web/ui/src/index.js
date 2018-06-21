import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DateTime from 'react-datetime';
import {
  Route,
  NavLink,
  BrowserRouter as Router
} from 'react-router-dom';
import "../node_modules/react-datetime/css/react-datetime.css";
import './index.css';


class NavigationMenu extends Component {
  render() {
    return (
      <div className="navigation-bar">
        <div className="wrapper">
          <div className="brand">
            <NavLink to="/">
              <h1>Chandigarh <span>Events</span></h1>
            </NavLink>
          </div>

          <div className="menu">
          </div>
        </div>
      </div>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <div className="content">
        <Route exact path="/" component={ShowEvents} />
        <Route path="/show_form" component={Form} />
        <Route path="/event_:id" component={ShowEvent} />
      </div>
    );
  }
}

class ShowEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    const event_id = this.props.match.params.id;

    fetch("http://localhost:5000/get_events?id=" + event_id, {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
      .then(data => this.setState( {events: data} ))
  }

  render() {
    const event = this.state.events[0];

    if (!event) {
      return <div>Nop</div>
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
    )
  }
}

class ShowEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/get_events", {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
      .then(data => this.setState( {events: data} ))
  }

  renderRow(event) {
    return (
      <NavLink key={event.id} to={`/event_${event.id}`} >
        <div className="row">
          <div className="row-item" >
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
        </div>
      </NavLink>
    );
  }

  render() {
    const {events} = this.state;

    return (
      <div className="event-list-container">
        <NavLink className="event-add-button show-form mdl-button" to="/show_form">
          <i className="material-icons">add</i>
        </NavLink>

        {events.map( event => this.renderRow(event) )}
      </div>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      datetime: "",
      location: "",
      type: "software"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  changeDate(date) {
    this.setState({
      datetime: date,
    });
  }

  handleChange(event) {
    const {name} = event.target;
    const {value} = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:5000/event",  {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state)
    });

    this.setState({
      title: "",
      description: "",
      datetime: "",
      location: "",
      type: "software"
    });
  }

  renderEventForm() {
    return (
      <div className="create-event">
        <h1 className="event-head">Add Event</h1>

        <form className="event-form" onSubmit={this.handleSubmit}>
          <input type="text" className="event-input title" placeholder="Title"
            name="title" value={this.state.title} onChange={this.handleChange} />
          <textarea className="event-input description" name="description"
            placeholder="Description" value={this.state.description}
            onChange={this.handleChange} />
          <DateTime inputProps={{placeholder: "DateTime"}} className="date"
            value={this.state.datetime} onChange={this.changeDate} />
          <input type="text" className="event-input location" name="location"
            placeholder="Location" value={this.state.location} onChange={this.handleChange} />
          <select className="event-input" name="type" value={this.state.type}
            onChange={this.handleChange} >
            <option value="software">Software</option>
            <option value="hardware">Hardware</option>
            <option value="sports">Sports</option>
            <option value="recreational">Recreational</option>
          </select>
          <input className="submit-input" type="submit" value="Submit" />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="inner-container">
        <NavLink className="event-add-button show-form mdl-button" to="/">
          <i className="material-icons">arrow_back</i>
        </NavLink>

        {this.renderEventForm()}
      </div>
    );
  }
}

class Event extends Component {
  render() {
    return (
      <Router>
        <div className="body-container">
          <NavigationMenu />
          <Content />
        </div>
      </Router>
    );
  }
}

// ========================================

ReactDOM.render(<Event />, document.getElementById("root"));
