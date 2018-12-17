import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { removeVideo } from '../actions';
import { EmptyDisplay } from './video-downloads/EmptyDisplay';
import { VideoItem } from './video-downloads/VideoItem';

const VideoDownloads = ({ videos, metadata, progress, removeVideo }) => {
    const hasDownloads = videos.length > 0;
    const downloadItems = hasDownloads
        ? videos.map(id => <VideoItem
            key={id}
            metadata={metadata[id]}
            progress={progress[id]}
            onRemove={() => removeVideo(id)} />
        )
        : <EmptyDisplay />;

    const classes = classNames('video-downloads', {
        'video-downloads--active': hasDownloads,
        'video-downloads--empty': !hasDownloads
    });

    return (
        <div className={classes} >
            {downloadItems}
        </div >
    );
};

export default connect(state => state, { removeVideo })(VideoDownloads);
