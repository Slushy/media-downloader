import React from 'React';

export default ({ metadata }) => {
    const title = metadata.title || metadata.url;

    return (
        <div className="video-item__metadata video-metadata">
            <div className="video-metadata__title">{title}</div>
            <div className="video-metadata__details inline-container">
                {metadata.time &&
                    <div className="video-metadata__length">
                        <img src="assets/clock.png" />
                        <span>{metadata.time}</span>
                    </div>}
                {metadata.size &&
                    <div className="video-metadata__size">
                        <img src="assets/scale.png" />
                        <span>{metadata.size}</span>
                    </div>}
            </div>
        </div>
    );
};
