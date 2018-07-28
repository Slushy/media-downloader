import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { EmptyDisplay } from './video-downloads/EmptyDisplay';
import { VideoItem } from './video-downloads/VideoItem';

class VideoDownloads extends Component {

    render() {
        const urls = this.props.urls;
        const metadata = this.props.metadata;
        const hasDownloads = urls.length;

        const downloadItems = hasDownloads
            ? urls.map(url => <VideoItem key={url} url={url} metadata={metadata} />)
            : <EmptyDisplay />;

        const classes = classNames('video-downloads', {
            'video-downloads--active': hasDownloads,
            'video-downloads--empty': !hasDownloads
        });
        return (
            <div className={classes}>
                {downloadItems}
            </div>
        );
    }
}

function mapStateToProps({ videos: { urls, metadata } }) {
    return { urls, metadata };
}

export default connect(mapStateToProps)(VideoDownloads);
