import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUserData } from "./actions";

import Logforms from "./logforms";
import Navcms from "./navcms";

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
        return (
            <div className="header">
                <div className="imageDiv">
                    <Link to="/">
                        <img src="/logo.png" />
                    </Link>
                </div>
                {this.props.user ? (
                    <div className="loggedIn">
                        {this.props.user.status > 1 && <Navcms />}
                        <div className="userNav horContainer">
                            <p className="linkify" onClick={this.logout}>
                                Logout
                            </p>
                            <Link to="/self">
                                <div className="imageDiv">
                                    <img
                                        src={
                                            this.props.user.picture ||
                                            "/default.png"
                                        }
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
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
