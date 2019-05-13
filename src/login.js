import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUserData } from "./actions";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.inputting = this.inputting.bind(this);
        this.login = this.login.bind(this);
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
            <div className="login">
                {this.state.error && (
                    <div className="error">
                        Oooops, something broke, YOU BROKE ITTTT!!!
                    </div>
                )}
                <form>
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
                    <button onClick={this.login}>Login</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Login);
