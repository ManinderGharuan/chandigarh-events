import React, {Component} from 'react';
import {
    BrowserRouter as Router
} from 'react-router-dom';
import NavigationMenu from '../NavigationMenu';
import Content from '../Content';

export default class App extends Component {
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
