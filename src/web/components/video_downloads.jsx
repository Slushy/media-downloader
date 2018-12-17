import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { removeVideo, showInFolder, play } from '../actions';
import { EmptyDisplay } from './video-downloads/EmptyDisplay';
import { VideoItem } from './video-downloads/VideoItem';

const VideoDownloads = ({ videos, metadata, progress, play, removeVideo, showInFolder }) => {
    const hasDownloads = videos.length > 0;
    const downloadItems = hasDownloads
        ? videos.map(id => <VideoItem
            key={id}
            metadata={metadata[id]}
            progress={progress[id]}
            onRemove={() => removeVideo(id)}
            onShowFolder={() => showInFolder(metadata[id].path)}
            onPlay={() => play(metadata[id].path)}
        />
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

export default connect(state => state, { removeVideo, showInFolder, play })(VideoDownloads);
