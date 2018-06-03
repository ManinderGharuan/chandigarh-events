import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toISOString().substr(0, 10),
    }
  };

  render() {
    return (
      <div className="create-event">
        <h1 className="event-head">Add Event</h1>

        <form className="event-form">
          <input type="text" className="event-input title" placeholder="Title" name="title" />
          <textarea className="event-input description" name="description" placeholder="description" />
          <input type="date" className="event-input date" name="date" min={this.state.date} />
          <input type="time" className="event-input time" name="time" />
          <input type="text" className="event-input location" name="location" placeholder="Location" />
          <select className="event-input" >
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
