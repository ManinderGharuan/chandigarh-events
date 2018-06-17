import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class NavigationMenu extends React.Component {
  render() {
    return (
      <div className="navigation-bar">
        <div className="wrapper">
          <div className="brand">
            <a href="./">
              <h1>Chandigarh <span>Events</span></h1>
            </a>
          </div>

          <div className="menu">
          </div>
        </div>
      </div>
    );
  }
}

class ShowHideButton extends React.Component {
  render() {
    return (
      <button className="mdl-button">
        <i className="material-icons">{this.props.active ? "add" : "arrow_back"}</i>
      </button>
    );
  }
}


class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: true,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({active: !this.state.active})
  }

  render() {
    return (
      <div className="container">
        <div key="mdl_button" className="event-add-button show-form" onClick={this.handleClick}>
          <ShowHideButton active={this.state.active} />
        </div>

        {this.state.active ?  <ShowEvent /> : <Form />}
      </div>
    );
  }
}

class ShowEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/get_events", {
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    }).then(response => response.json())
      .then(data => this.setState( {events: data} ))
  }

  render() {
    const {events} = this.state;

    return (
      <div className="event-list-container">
        {events.map(event =>
          <div className="row">
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
         )}
      </div>
    );
  }
}

class Form extends React.Component {
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

  render() {
    return (
      <div className="create-event">
        <h1 className="event-head">Add Event</h1>

        <form className="event-form" onSubmit={this.handleSubmit}>
          <input type="text" className="event-input title" placeholder="Title"
            name="title" value={this.state.title} onChange={this.handleChange} />
          <textarea className="event-input description" name="description"
            placeholder="Description" value={this.state.description}
            onChange={this.handleChange} />
          <input type="datetime-local" className="event-input date" name="datetime"
            value={this.state.datetime} onChange={this.handleChange} />
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
}

class Event extends React.Component {
  render() {
    return (
      <div className="body-container">
        <NavigationMenu />
        <Container />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Event />, document.getElementById("root"));
