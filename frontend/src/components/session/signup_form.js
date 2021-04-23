import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
        this.handleHoverEnter = this.handleHoverEnter.bind(this);
        this.handleHoverExit = this.handleHoverExit.bind(this);
    }

    componentDidMount() {
        document.getElementById('session-signup-email').focus();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.signedIn === true) {
            this.props.history.push('/login');
        }

        this.setState({errors: nextProps.errors})
    }

    update(field) {
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let user = {
            email: this.state.email,
            name: this.state.name,
            password: this.state.password
        };

        this.props.signup(user, this.props.history);
    }

    handleHoverEnter(e) {
        if(!e.target.innerText.includes(";")) {
            e.target.innerText += ";";
        }
    }

    handleHoverExit(e) {
        e.target.innerText = e.target.innerText.split(";")[0];
    }

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
            <form onSubmit={this.handleSubmit}>
                <div>{"{"}</div>
                <div className="indent">{'signup:'}</div>
                <div className="session-form-content">
                    <div>{"{"}</div>
                    <div className="session-form-input-div indent">
                      <p className="session-form-input-label">email:</p>
                      <div className="spacer"></div>
                      <p className="session-form-input-label">"</p>
                      <label htmlFor="email" className="visuallyhidden">Email: </label>
                        <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeholder="Email"
                            name="email"
                            id="session-signup-email"
                            className="session-form-input"
                        />
                      <p className="session-form-input-label">"</p>
                    </div>
                    <br/>
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
                        <input type="text"
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

export default withRouter(SignupForm);