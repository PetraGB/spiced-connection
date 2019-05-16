import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUserData } from "./actions";

import Login from "./login";
import Register from "./register";

class Logforms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisible: true
        };
        this.toggleLogin = this.toggleLogin.bind(this);
        this.inputting = this.inputting.bind(this);
        this.login = this.login.bind(this);
    }
    toggleLogin() {
        if (this.state.loginVisible) {
            this.setState({ loginVisible: false });
        } else {
            this.setState({ loginVisible: true });
        }
    }
    inputting(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    login(e) {
        e.preventDefault();
        axios
            .post("/login", this.state)
            .then(({ data }) => {
                this.props.dispatch(setUserData(data.user));
                this.props.toggleLogin();
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div className="logform verContainer">
                {this.state.loginVisible ? (
                    <div className="loginFormContainer verContainer">
                        <div className="x" onClick={this.props.toggleLogin}>
                            X
                        </div>
                        <Login toggleLogin={this.props.toggleLogin} />
                        <div className="verContainer">
                            <p>Don{"'"}t have an account yet?</p>
                            <button onClick={this.toggleLogin}>
                                {" "}
                                Register!
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="loginFormContainer verContainer">
                        <div className="x" onClick={this.props.toggleLogin}>
                            X
                        </div>
                        <Register toggleLogin={this.props.toggleLogin} />
                        <div className="verContainer">
                            <p>Already have an account?</p>
                            <button onClick={this.toggleLogin}> Log in!</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Logforms);
