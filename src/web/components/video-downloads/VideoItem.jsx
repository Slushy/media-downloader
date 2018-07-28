import React from 'React';

export const VideoItem = ({ url, metadata }) => (
    <div className="video-downloads__item">
        {metadata[url].title || url}
    </div>
);
