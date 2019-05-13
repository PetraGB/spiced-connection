import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUserData } from "./actions";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputting = this.inputting.bind(this);
        this.register = this.register.bind(this);
    }
    inputting(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    register(e) {
        e.preventDefault();
        axios
            .post("/register", this.state)
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
            <div className="register">
                {this.props.user.error && (
                    <div className="error">
                        Oooops, something broke, YOU BROKE ITTTT!!!
                    </div>
                )}
                <div>Please fill out your information to make an account.</div>
                <form>
                    <input
                        type="text"
                        name="first"
                        placeholder="First Name"
                        onChange={this.inputting}
                    />
                    <input
                        type="text"
                        name="last"
                        placeholder="Last Name"
                        onChange={this.inputting}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.inputting}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.inputting}
                    />
                    <button onClick={this.register}>Submit</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Register);
