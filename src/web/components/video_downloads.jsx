import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EmptyDisplay } from './video-downloads/EmptyDisplay';
import { VideoItem } from './video-downloads/VideoItem';

class VideoDownloads extends Component {

    render() {
        const css = ['video-downloads'];
        const urls = this.props.urls;
        const metadata = this.props.metadata;

        let downloads = [];
        if (urls.length) {
            css.push('video-downloads--active');
            downloads = urls.map(url => <VideoItem key={url} url={url} metadata={metadata} />);
        } else {
            css.push('video-downloads--empty');
        }

        return (
            <div className={css.join(' ')}>
                {downloads.length ? downloads : <EmptyDisplay />}
            </div>
        );
    }
}

function mapStateToProps({ videos: { urls, metadata } }) {
    return { urls, metadata };
}

export default connect(mapStateToProps)(VideoDownloads);
