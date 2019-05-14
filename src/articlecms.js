import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
// import { Link } from "react-router-dom";

class Articlecms extends React.Component {
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
                published: ""
            }
        };
        this.inputting = this.inputting.bind(this);
        this.uploadArticle = this.uploadArticle.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        if (id > 0) {
            axios
                .get("/api/article/" + id)
                .then(({ data }) => {
                    const currentArticle = data.article;
                    this.setState({ currentArticle });
                    console.log(this.state);
                })
                .catch(err => {
                    this.setState({ error: true });
                    console.log(err);
                });
        }
    }
    inputting(e) {
        this.setState({
            currentArticle: {
                ...this.state.currentArticle,
                [e.target.name]: e.target.value
            }
        });
    }
    uploadArticle(e) {
        e.preventDefault();
        const id = this.state.currentArticle.id;
        if (id == 0) {
            axios
                .post("/api/article/add", this.state.currentArticle)
                .then(({ data }) => {
                    location.replace("/cms/article/" + data.id);
                })
                .catch();
        } else {
            axios
                .post("/api/article/adjust", this.state.currentArticle)
                .then(({ data }) => {
                    console.log("data in update", data);
                    location.replace("/cms/article/" + data.id);
                })
                .catch();
        }
    }
    render() {
        console.log(this.state);
        return (
            <div className="articlecms">
                <div>lalalal</div>
                <form>
                    <p className="inputTag">Title</p>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={this.state.currentArticle.title}
                        onChange={this.inputting}
                    />
                    <p className="inputTag">Text</p>
                    <textarea
                        name="article"
                        type="text"
                        value={this.state.currentArticle.article}
                        onChange={this.inputting}
                    />
                    <p className="inputTag">Summary</p>
                    <textarea
                        name="summary"
                        type="text"
                        value={this.state.currentArticle.summary}
                        onChange={this.inputting}
                    />
                    <button onClick={this.uploadArticle}>Upload</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Articlecms);
