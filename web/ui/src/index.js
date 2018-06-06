import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      data: "",
      time: "",
      location: "",
      type: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    target = event.target

    this.setState({target.name = target.value});
  }

  handleSubmit(event) {
  }

  render() {
    return (
      <div className="create-event">
        <h1 className="event-head">Add Event</h1>

        <form className="event-form" onSubmit={this.handleSubmit}>
          <input type="text" className="event-input title" placeholder="Title" name="title" onChange={this.onChange} />
          <textarea className="event-input description" name="description" placeholder="description" onChange={this.onChange} />
          <input type="date" className="event-input date" name="date" onChange={this.onChange} />
          <input type="time" className="event-input time" name="time" onChange={this.onChange} />
          <input type="text" className="event-input location" name="location" placeholder="Location" onChange={this.onChange} />
          <select className="event-input" onChange={this.onChange} >
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
