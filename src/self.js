import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setUserData } from "./actions";

import Login from "./login";
import Register from "./register";

class Self extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="profile">
                {this.props.user ? (
                    <div className="profileComp">
                        <div className="profilePic">
                            <img src={this.props.user.picture} />
                        </div>
                        <h3>
                            {this.props.user.first} {this.props.user.last}
                        </h3>
                        <p>{this.props.user.bio}</p>
                    </div>
                ) : (
                    <div>
                        <h1>You are not logged in</h1>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Self);
