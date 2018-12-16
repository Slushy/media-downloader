import React from 'react';
import { connect } from 'react-redux';
import { closeWindow, maximizeWindow, minimizeWindow, unmaximizeWindow } from '../actions';

export const Header = ({ maximized, closeWindow, maximizeWindow, minimizeWindow, unmaximizeWindow }) => (
    <div className="header inline-container">
        <div className="header__title">Slushy Media Downloader</div>
        <div className="header__draggable"></div>
        <button className="window-control header__minimize" onClick={minimizeWindow}>Minimize</button>
        {maximized
            ? <button className="window-control header__unmaximize" onClick={unmaximizeWindow}>Unmaximize</button>
            : <button className="window-control header__maximize" onClick={maximizeWindow}>Maximize</button>}
        <button className="window-control header__close" onClick={closeWindow}>Close</button>
    </div>
);

export default connect(({ window }) => ({ maximized: window.maximized }), {
    closeWindow,
    maximizeWindow,
    minimizeWindow,
    unmaximizeWindow
})(Header);
