import React from 'react';
import { Link } from 'react-router-dom';
// import './navbar.css';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    componentDidMount() {
        const ele = document.getElementsByClassName("navigation-link");
        const span = document.getElementsByClassName("navigation-span")[0];
        for (let i = 0; i < ele.length; i++) {
            ele[i].addEventListener('mouseover', (e) => {
                e.target.style.textDecoration = "underline";
            }); 
            ele[i].addEventListener('mouseout', (e) => {
                e.target.style.textDecoration = "none";
            }); 
        }
        if (span !== undefined) {
            span.addEventListener('mouseover', (e) => {
                e.target.innerHTML = e.target.innerHTML + "();";
            });
            span.addEventListener('mouseout', (e) => {
                e.target.innerHTML = e.target.innerHTML.split("();")[0];
            });
        }
    }

    logoutUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    // Selectively render links dependent on whether the user is logged in 
    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="navigation-div" >
                    <Link className="navigation-link" to={'/thoughts'}>/thoughts</Link>
                    <Link className="navigation-link" to={'/profile'}>/profile</Link>
                    <Link className="navigation-link" to={'/new_thought'}>/new_thought</Link>
                    <span className="navigation-span" onClick={this.logoutUser}>.logout</span>
                </div>
            );
        } else {
            return (
                <div className="navigation-div" >
                    <Link className="navigation-link" to={'/signup'}>/signup</Link>
                    <Link className="navigation-link" to={'/login'}>/login</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <h1>.thoughtlogue</h1>
                { this.getLinks() }
            </div>
        );
    }
}

export default NavBar;