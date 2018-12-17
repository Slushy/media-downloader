import React from 'react';

export const EmptyDisplay = () => (
    <div className="empty-display">
        <div className="empty-display__background" style={{ backgroundImage: "url(assets/ellie_bg.png)" }} />
        <div className="empty-display__text">Add a Youtube URL and press <span className="bold">Download</span> to convert it to an MP3</div>
    </div>
);
