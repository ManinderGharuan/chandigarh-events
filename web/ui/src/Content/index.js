import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import ShowEvents from '../ShowEvents';
import Form from '../Form';
import ShowEvent from '../ShowEvent';
import './content.css';

export default class Content extends Component {
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
