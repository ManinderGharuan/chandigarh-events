import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Form extends React.Component {
  render() {
    return (
      <div className="create-event">
        <form className="event-form">
          <input type="text" className="event-input title" placeholder="Title" name="title" />
          <textarea className="event-input description" name="description" placeholder="description" />
          <input type="datetime-local" className="event-input datetime" name="datetime" />
          <input type="text" className="event-input location" name="location" placeholder="Location" />
          <select className="event-input" >
            <option value="software">Software</option>
            <option value="hardware">Hardware</option>
            <option value="sports">Sports</option>
            <option value="recreational">Recreational</option>
          </select>
          <input type="submit" value="Submit" />
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
