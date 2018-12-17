import React from 'React';
import classNames from 'classnames';
import Metadata from './Metadata';

export const VideoItem = ({ metadata, progress, onRemove }) => {
    progress = progress || {};
    let width = "0";
    if (progress.currentBytes) {
        width = `${progress.currentBytes / progress.totalBytes * 100}%`;
    }

    const classes = classNames("video-item", {
        "video-item--started": progress.started,
        "video-item--finished": progress.finished
    });

    const removeTitle = progress.finished ? "Remove video from download history" : "Cancel download";
    return (
        <div className={classes}>
            <img className="video-item__thumbnail" src={metadata.thumbnail} ></img >
            <Metadata metadata={metadata} />
            <div className="video-item__progress">
                <div className="video-item__progress-bar" style={{ width: width }}></div>
            </ div>
            {progress.finished && <div className="video-item__actions">
                <span>Show</span>
            </div>}
            <div className="video-item__close">
                <img src="assets/close.png" onClick={onRemove} title={removeTitle} />
            </div>
        </div>
    );
};
