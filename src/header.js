import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { } from "./actions";

import Logforms from "./logforms";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logformsVisible: false
        };
        this.toggleLogforms = this.toggleLogforms.bind(this);
    }
    componentDidMount() {}
    toggleLogforms() {
        if (this.state.logformsVisible) {
            this.setState({ logformsVisible: false });
        } else {
            this.setState({ logformsVisible: true });
        }
    }
    render() {
        return (
            <div className="header">
                {this.props.user.id ? (
                    <div>Picture here</div>
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
