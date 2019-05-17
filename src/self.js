import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { setUserData } from "./actions";

import Articlelink from "./articlelink";
import Uploaderuser from "./uploaderuser";

class Self extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readArticles: [],
            uploaderVisible: false
        };
        this.fetchReadArticles = this.fetchReadArticles.bind(this);
        this.toggleUploader = this.toggleUploader.bind(this);
    }
    componentDidMount() {
        this.fetchReadArticles();
    }
    fetchReadArticles() {
        axios
            .get("/api/self/read")
            .then(({ data }) => {
                if (data.readArticles) {
                    let newArticles = data.readArticles;
                    this.setState({
                        readArticles: [
                            ...this.state.readArticles,
                            ...newArticles
                        ]
                    });
                }
            })
            .catch();
    }
    toggleUploader() {
        if (this.state.uploaderVisible) {
            this.setState({ uploaderVisible: false });
        } else {
            this.setState({ uploaderVisible: true });
        }
    }
    render() {
        return (
            <div className="profile verContainer">
                {this.props.user ? (
                    <div className="nameAndPic">
                        <div
                            onClick={this.toggleUploader}
                            className="profilePic"
                        >
                            <img
                                src={
                                    this.props.user.atpicture || "/default.png"
                                }
                            />
                        </div>
                        <h3>
                            {this.props.user.first} {this.props.user.last}
                        </h3>
                        <p>{this.props.user.bio}</p>
                        {this.state.uploaderVisible && (
                            <Uploaderuser
                                toggleUploader={this.toggleUploader}
                            />
                        )}
                        {this.props.user.read && this.state.readArticles && (
                            <React.Fragment>
                                {this.state.readArticles.map(article => {
                                    return (
                                        <Articlelink
                                            key={article.id}
                                            article={article}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        )}
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
