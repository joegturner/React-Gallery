import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class MainNav extends Component{

    
    generateNavButtons = () => {
        let buttons = [];
        const { defaults } = this.props;
        for (let i = 0; i < defaults.length; i++) {
            buttons.push(
                <li key={i+200}>
                    <NavLink 
                    key={i+300}
                    to={`/${defaults[i]}`} 
                    >{defaults[i]}
                    </NavLink>
                </li>
            )
        }
        return buttons;
    }


    render() {
        return (
            <nav className="main-nav">
            <ul>
                {this.generateNavButtons()}
            </ul>
        </nav>
        )
    }
}

export default MainNav;