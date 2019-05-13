import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { } from "./actions";

import Login from "./login";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginVisible: false
        };
        this.toggleLogin = this.toggleLogin.bind(this);
    }
    componentDidMount() {}
    toggleLogin() {
        if (this.state.loginVisible) {
            this.setState({ loginVisible: false });
        } else {
            this.setState({ loginVisible: true });
        }
    }
    render() {
        return (
            <div className="header">
                {this.props.user.loggedIn ? (
                    <div>Picture here</div>
                ) : (
                    <div onClick={this.toggleLogin}>Log in!</div>
                )}
                {this.state.loginVisible && (
                    <Login toggleLogin={this.toggleLogin} />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Header);
