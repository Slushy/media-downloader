import React from 'React';
import classNames from 'classnames';

export default ({ metadata }) => {
    const title = metadata.title || metadata.url;
    const hasMetadata = !!metadata.time || !!metadata.size;
    
    const titleClasses = classNames('video-metadata__title', {
        'video-metadata__title--full': !hasMetadata
    });

    return (
        <div className="video-item__metadata video-metadata">
            <div className={titleClasses}>{title}</div>
            {hasMetadata && <div className="video-metadata__details inline-container">
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
            </div>}
        </div>
    );
};
