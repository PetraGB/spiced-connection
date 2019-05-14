import React from "react";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { } from "./actions";

import Login from "./login";

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
                {this.props.user ? (
                    <div>
                        <p>Hello, World! I am the cms.</p>
                        {this.props.user.status > 1 ? (
                            <div>
                                <p>Journalist is logged in</p>
                                {this.props.user.status > 2 ? (
                                    <div>
                                        <p>Editor is logged in</p>
                                        {this.props.user.status > 3 ? (
                                            <div>Admin is logged in</div>
                                        ) : (
                                            <div>
                                                You are not the highest member
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>You are a mear journalist, sorry</div>
                                )}
                            </div>
                        ) : (
                            <div>You are a mear user, sorry</div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h2>I am sorry, you are not logged in yet</h2>
                        <Login />
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Cms);
