import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        axios
            .get("/api/user/" + id)
            .then(({ data }) => {
                const profile = data.profile;
                this.setState({ profile });
                console.log("state in profile", this.state);
            })
            .catch();
    }
    render() {
        return (
            <div className="profile verContainer">
                {this.state.profile ? (
                    <div className="nameAndPic">
                        <div className="profilePic">
                            <img
                                src={
                                    this.state.profile.atpicture ||
                                    "/default.png"
                                }
                            />
                        </div>
                        <h3>
                            {this.state.profile.first} {this.state.profile.last}
                        </h3>
                        <p>{this.state.profile.bio}</p>
                    </div>
                ) : (
                    <div>
                        <h1>We do not know this person</h1>
                    </div>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Profile);
