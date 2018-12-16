import React from 'React';

export default ({ metadata }) => {
    const title = metadata.title || metadata.url;

    return (
        <div className="video-item__metadata video-metadata">
            <div className="video-metadata__title">{title}</div>
            <div className="video-metadata__details inline-container">
                <div className="video-metadata__length">
                    <img src="assets/clock.png" />
                    <span>3:38</span>
                </div>
                <div className="video-metadata__size">
                    <img src="assets/scale.png" />
                    <span>5.86 MB</span>
                </div>
            </div>
        </div>
    );
};
