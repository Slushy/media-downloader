import React from 'react';

export const UrlInput = ({ url, onEnter, onChange }) => (
    <input
        type="text"
        onKeyPress={(e) => { e.key === 'Enter' && onEnter() }}
        placeholder="Paste URL here"
        className="video-select__url"
        value={url}
        onChange={onChange} />
);
