import React, {Component} from 'react';
import DateTime from 'react-datetime';
import { NavLink } from 'react-router-dom';
import "../../node_modules/react-datetime/css/react-datetime.css";
import './form.css';

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

export default Form;
