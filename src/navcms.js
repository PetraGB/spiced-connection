import React from "react";
// import axios from "./axios";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Navcms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="navcms horContainer">
                {this.props.user.status > 1 && (
                    <Link to="/cms/article/0">New Article</Link>
                )}
                {this.props.user.status > 2 && (
                    <Link to="/cms/links">New Link</Link>
                )}
                {this.props.user.status > 3 && (
                    <Link to="/cms/users">Manage Users</Link>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Navcms);
