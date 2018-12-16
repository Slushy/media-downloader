import React from 'React';
import classNames from 'classnames';

export const VideoItem = ({ metadata, progress }) => {
    progress = progress || {};
    let width = "0";
    if (progress.currentBytes) {
        width = `${progress.currentBytes / progress.totalBytes * 100}%`;
    }

    const classes = classNames("video-item", {
        "video-item--started": progress.started,
        "video-item--finished": progress.finished
    });

    return (
        <div className={classes}>
            <img className="video-item__thumbnail" src={metadata.thumbnail} ></img >
            <div className="video-item__metadata">
                {metadata.title || metadata.url}
            </div>
            <div className="video-item__progress">
                <div className="video-item__progress-bar" style={{ width: width }}></div>
            </ div>
            <div className="video-item__actions">ACT</div>
        </div>
    );
};
