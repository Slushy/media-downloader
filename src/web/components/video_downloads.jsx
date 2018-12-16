import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { EmptyDisplay } from './video-downloads/EmptyDisplay';
import { VideoItem } from './video-downloads/VideoItem';

class VideoDownloads extends Component {

    render() {
        const ids = this.props.videos;
        const metadata = this.props.metadata;
        const hasDownloads = ids.length;

        const downloadItems = hasDownloads
            ? ids.map(id => <VideoItem key={id} metadata={metadata[id]} />)
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

function mapStateToProps({ videos, metadata }) {
    return { videos, metadata };
}

export default connect(mapStateToProps)(VideoDownloads);
