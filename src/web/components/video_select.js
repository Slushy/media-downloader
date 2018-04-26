import React, { Component } from 'react';

export default class VideoSelect extends Component {
    constructor(props) {
        super(props);
        this.state = { url: '' };

        this.onDownload = this.onDownload.bind(this);
    }

    onDownload() {
        console.log(`The url to download is ${this.state.url}`);
    }

    render() {
        return (
            <div className="inline-container video-select">
                <input
                    type="text"
                    placeholder="Paste URL here"
                    className="video-select__url"
                    onChange={(e) => this.setState({ url: e.target.value })} />
                <div className="inline-container video-select__actions">
                    <button className="video-select__download" onClick={this.onDownload}>Download</button>
                    <button className="video-select__filetype">{'<'}</button>
                </div>
            </div>
        );
    }
}
