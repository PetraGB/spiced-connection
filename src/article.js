import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { setNewRead } from "./actions";

import Linkies from "./linkies";

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentArticle: {
                id: 0,
                title: "",
                article: "",
                picture: "",
                summary: "",
                uploaded: "",
                published: "",
                publish: false
            }
        };
    }
    componentDidMount() {
        const id = this.props.match.params.id;

        axios
            .get("/api/article/" + id)
            .then(({ data }) => {
                console.log("data from axios", data);
                const currentArticle = data.article;
                this.setState({ currentArticle });
                if (data.readId) {
                    console.log(data.readId);
                    this.props.dispatch(setNewRead(data.readId));
                }
            })
            .catch(err => {
                this.setState({ error: true });
                console.log(err);
            });
    }
    render() {
        console.log(this.props);
        return (
            <div className="article verContainer">
                {this.state.currentArticle ? (
                    <div>
                        <h1 className="articleTitle">
                            {this.state.currentArticle.title}
                        </h1>
                        <p className="articlePublished">
                            {this.state.currentArticle.published}
                        </p>
                        <div className="articleText">
                            {this.state.currentArticle.article}
                        </div>
                    </div>
                ) : (
                    <div>There is no such article</div>
                )}
                <Linkies articleid={this.props.match.params.id} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Article);
