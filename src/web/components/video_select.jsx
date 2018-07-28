import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addVideo } from '../actions';
import { DownloadButton } from './video-select/DownloadButton';
import { FileTypeSelect } from './video-select/FileTypeSelect';
import { UrlInput } from './video-select/UrlInput';

class VideoSelect extends Component {
    constructor(props) {
        super(props);
        this.state = { url: '' };

        this.onDownload = this.onDownload.bind(this);
    }

    onDownload() {
        this.props.addVideo(this.state.url);
        this.setState({ url: '' });
    }

    render() {
        return (
            <div className="inline-container video-select">
                <UrlInput
                    url={this.state.url}
                    onEnter={this.onDownload}
                    onChange={(e) => this.setState({ url: e.target.value })} />
                <div className="inline-container video-select__actions">
                    <DownloadButton onClick={this.onDownload} />
                    <FileTypeSelect />
                </div>
            </div>
        );
    }
}

export default connect(null, { addVideo })(VideoSelect);
