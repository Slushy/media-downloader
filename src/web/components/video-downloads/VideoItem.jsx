import React from 'React';

export const VideoItem = ({ metadata }) => (
    <div className="video-downloads__item">
        {metadata.title || metadata.url}
    </div>
);
