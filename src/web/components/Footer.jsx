import React from 'react';
import { connect } from 'react-redux';
import { changeSaveFolder } from '../actions';

const Footer = ({ saveFolder, changeSaveFolder }) => (
    <div className="footer inline-container">
        <button className="footer__change-folder-button" onClick={changeSaveFolder}>Change Folder</button>
        <div className="footer__save-folder">{saveFolder}</div>
    </div>
);

export default connect(state => ({ saveFolder: state.config.saveFolder }), { changeSaveFolder })(Footer);
