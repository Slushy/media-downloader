import React, { Component } from 'react';
import { connect } from 'react-redux';

class VideoDownloads extends Component {

    render() {
        const css = ['video-downloads'];
        let downloads = [];
        if (this.props.videos.length) {
            css.push('video-downloads--active');
            // Need the index for uniqueness in the case they try to download the same video twice
            // (or maybe we shouldn't allow it or warn them? ah whatever)
            downloads = this.props.videos.map((url, idx) =>
                <div key={`${url}-${idx}`} className="video-downloads__url">{url}</div>
            );
        } else {
            css.push('video-downloads--empty');
            downloads.push(<div>{'Add a URL and select "Download" to begin downloading!'}</div>);
        }

        return (
            <div className={css.join(' ')}>
                {downloads}
            </div>
        );
    }
}

function mapStateToProps({ videos }) {
    return { videos };
}

export default connect(mapStateToProps)(VideoDownloads);
