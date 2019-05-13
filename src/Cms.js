import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { } from "./actions";

class Cms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    render() {
        console.log(this.props);
        return (
            <div className="cms">
                {this.props.user.loggedIn ? (
                    <div>Hello, World! I am the cms.</div>
                ) : (
                    <div>I am sorry, you are not logged in yet</div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Cms);
