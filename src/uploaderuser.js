import React from "react";
import axios from "./axios";

import { connect } from "react-redux";
import { updateUserPics } from "./actions";

class Uploaderuser extends React.Component {
    constructor(props) {
        super(props);
        this.uploadFile = this.uploadFile.bind(this);
    }
    uploadFile(e) {
        let formData = new FormData();

        formData.append("file", e.target.files[0]);

        axios
            .post("/api/self/uploadpic", formData)
            .then(({ data }) => {
                if (!data.error) {
                    console.log(data);
                    this.props.dispatch(updateUserPics(data));
                    console.log(this.props.user);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div className="uploader">
                <div className="uploadPopup">
                    <button onClick={this.props.toggleUploader}> X </button>
                    <label htmlFor="upload">Upload</label>
                    <input
                        style={{ opacity: 0 }}
                        name="file"
                        id="upload"
                        type="file"
                        accept="image/*"
                        onChange={this.uploadFile}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps)(Uploaderuser);
