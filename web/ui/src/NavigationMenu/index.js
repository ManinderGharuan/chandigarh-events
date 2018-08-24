import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.css';

export default class NavigationMenu extends Component {
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
