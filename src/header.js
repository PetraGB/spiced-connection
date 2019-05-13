import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUserData } from "./actions";

import Logforms from "./logforms";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logformsVisible: false
        };
        this.toggleLogforms = this.toggleLogforms.bind(this);
        this.logout = this.logout.bind(this);
    }
    toggleLogforms() {
        if (this.state.logformsVisible) {
            this.setState({ logformsVisible: false });
        } else {
            this.setState({ logformsVisible: true });
        }
    }
    logout() {
        axios.get("/logout").then(({ data }) => {
            this.props.dispatch(setUserData(data.user));
            location.replace("/");
        });
    }
    render() {
        console.log("props in header", this.props);
        console.log("user", this.props.user, this.props.user == true);
        return (
            <div className="header">
                {this.props.user ? (
                    <div onClick={this.logout}>Logout</div>
                ) : (
                    <div onClick={this.toggleLogforms}>Log in!</div>
                )}
                {this.state.logformsVisible && (
                    <Logforms toggleLogin={this.toggleLogforms} />
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Header);
