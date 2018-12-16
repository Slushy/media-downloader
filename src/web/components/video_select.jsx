import React, { Component } from 'react';
import { connect } from 'react-redux';

import { downloadVideo } from '../actions';
import { DownloadButton } from './video-select/DownloadButton';
import { FileTypeSelect } from './video-select/FileTypeSelect';
import { UrlInput } from './video-select/UrlInput';

class VideoSelect extends Component {
    constructor(props) {
        super(props);
        this.state = { url: '' };

        this.onDownload = this.onDownload.bind(this);
    }

    onDownload(e) {
        e.preventDefault();

        this.props.downloadVideo(this.state.url);
        this.setState({ url: '' });
    }

    render() {
        return (
            <form className="inline-container video-select" onSubmit={this.onDownload}>
                <UrlInput
                    url={this.state.url}
                    onEnter={this.onDownload}
                    onChange={(e) => this.setState({ url: e.target.value })} />
                <div className="inline-container video-select__actions">
                    <DownloadButton />
                    <FileTypeSelect />
                </div>
            </form>
        );
    }
}

export default connect(null, { downloadVideo })(VideoSelect);
