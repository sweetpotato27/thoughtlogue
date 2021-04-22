import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.handleHoverEnter = this.handleHoverEnter.bind(this);
        this.handleHoverExit = this.handleHoverExit.bind(this);
    }

    // Once the user has been authenticated, redirect to the Thoughts page
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser === true) {
            this.props.history.push('/thoughts');
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                if(this.state.name !== "" && this.state.password !== "") {
                    console.log("enter")
                    document.getElementById("session-submit").click();
                }
            }
        });
    }

    // Handle field updates (called in the render method) 
    update(field) {
        if (document.getElementById("session-submit-name")) document.getElementById("session-submit-name").innerHTML = this.state.name;
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    // Handle form submission
    handleSubmit(e) {
        e.preventDefault();

        let user = {
            name: this.state.name,
            password: this.state.password
        };

        this.props.login(user);
    }

    handleHoverEnter(e) {
        console.log(e.target.innerText);
        if(!e.target.innerText.includes(";")) {
            e.target.innerText += ";";
        }
    }

    handleHoverExit(e) {
        e.target.innerText = e.target.innerText.split(";")[0];
    }

    // Render the session errors if there are any
    renderErrors() {
        return(
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className="session-form-container">
                <br/>
            <form>
                <div>{"{"}</div>
                <div className="indent">{'login:'}</div>
                <div className="session-form-content">
                    <div>{"{"}</div>
                    <div className="session-form-input-div indent">
                      <p className="session-form-input-label">name:</p>
                      <div className="spacer"></div>
                      <p className="session-form-input-label">"</p>
                      <label htmlFor="name" className="visuallyhidden">Name: </label>
                        <input type="text"
                            value={this.state.name}
                            onChange={this.update('name')}
                            placeholder="Name"
                            name="name"
                            className="session-form-input"
                        />
                      <p className="session-form-input-label">"</p>
                    </div>
                    <br/>
                    <div className="session-form-input-div indent">
                      <p className="session-form-input-label">password:</p>
                      <div className="spacer"></div>
                      <p className="session-form-input-label">"</p>
                      <label htmlFor="password" className="visuallyhidden">Password: </label>
                        <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                            name="password"
                            className="session-form-input"
                        />
                      <p className="session-form-input-label">"</p>
                    </div>
                    <br/>
                    <div>{'}'}</div>
                </div>
                <div>{'}'}</div>
                <label htmlFor="submit" className="visuallyhidden">Submit: </label>
                <div className="session-submit-div">
                    <span 
                        id="session-submit"
                        onClick={this.handleSubmit}
                        onMouseEnter={this.handleHoverEnter}
                        onMouseLeave={this.handleHoverExit}
                        className="session-submit-span"
                        >.signup(<span id="session-submit-name"></span>)
                    </span>
                </div>
                {this.renderErrors()}
            </form>
        </div>
        );
    }
}

export default withRouter(LoginForm);