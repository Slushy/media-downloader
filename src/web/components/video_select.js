import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

class VideoSelect extends Component {
    constructor(props) {
        super(props);
        this.state = { url: '' };

        this.onDownload = this.onDownload.bind(this);
    }

    onDownload() {
        this.props.addVideoToDownloads(this.state.url);
        this.setState({ url: '' });
    }

    render() {
        return (
            <div className="inline-container video-select">
                <input
                    type="text"
                    onKeyPress={(e) => { e.key === 'Enter' && this.onDownload(); }}
                    placeholder="Paste URL here"
                    className="video-select__url"
                    value={this.state.url}
                    onChange={(e) => this.setState({ url: e.target.value })} />
                <div className="inline-container video-select__actions">
                    <button className="video-select__download" onClick={this.onDownload}>Download</button>
                    <button className="video-select__filetype">{'<'}</button>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(VideoSelect);
