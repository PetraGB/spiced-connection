import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import Articlelink from "./articlelink";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        axios
            .get("/api/latest")
            .then(({ data }) => {
                this.setState(data);
                console.log(this.state);
            })
            .catch();
    }
    render() {
        console.log(this.props);
        console.log(this.state.latest);
        return (
            <div className="home verContainer">
                {this.state.latest && this.props.user && (
                    <React.Fragment>
                        {this.props.user.read ? (
                            <React.Fragment>
                                {this.state.latest
                                    .filter(article => {
                                        if (
                                            !this.props.user.read.includes(
                                                article.id
                                            )
                                        ) {
                                            return true;
                                        }
                                    })
                                    .map(article => {
                                        return (
                                            <Articlelink
                                                key={article.id}
                                                article={article}
                                            />
                                        );
                                    })}
                                {this.state.latest
                                    .filter(article => {
                                        if (
                                            this.props.user.read.includes(
                                                article.id
                                            )
                                        ) {
                                            return true;
                                        }
                                    })
                                    .map(article => {
                                        return (
                                            <Articlelink
                                                key={article.id}
                                                article={article}
                                            />
                                        );
                                    })}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {this.state.latest.map(article => {
                                    return (
                                        <Articlelink
                                            key={article.id}
                                            article={article}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        )}
                    </React.Fragment>
                )}

                {!this.props.user && this.state.latest && (
                    <React.Fragment>
                        {this.state.latest.map(article => {
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
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Home);
