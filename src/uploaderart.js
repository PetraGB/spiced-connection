import React from "react";
import axios from "./axios";

export default class Uploaderart extends React.Component {
    constructor(props) {
        super(props);
        this.uploadFile = this.uploadFile.bind(this);
    }
    uploadFile(e) {
        let formData = new FormData();

        formData.append("file", e.target.files[0]);
        formData.append("id", this.props.id);

        axios
            .post("/api/article/uploadpic", formData)
            .then(({ data }) => {
                if (!data.error) {
                    this.props.updateArticlePics(data.pictures);
                    this.props.toggleUploader();
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
