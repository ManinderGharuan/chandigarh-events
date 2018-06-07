import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
    const target = event.target

    this.setState({ [target.name]: target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:5000/event",  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
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
      <div className="container">
        <Form />
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Event />, document.getElementById("root"));
