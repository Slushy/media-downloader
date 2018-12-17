export default class Video {
    constructor(id, url, info) {
        this.id = id;
        this.url = url;
        this.info = info;
        this.title = info.title;
        this.thumbnail = info.thumbnail_url;
        this.image = undefined;
        this.stream = undefined;
        this.tempPath = '';
        this.time = secondsToTimeFormat(info.length_seconds);
        this.size = '0 MB';
    }

    _downloadThumbnail() {
        if (!this.thumbnail) return;
        // TODO: this.image = ...
    }

    setStream(stream) {
        this.stream = stream;
    }

    setTempPath(tempPath) {
        this.tempPath = tempPath;
    }

    setSize(sizeKB = 0) {
        this.size = `${Math.round(Math.abs(sizeKB / 1000) * 100) / 100} MB`;
    }
}

function secondsToTimeFormat(seconds) {
    if (!seconds) return '';

    const h = Math.floor(seconds / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 3600 % 60);
    return (h ? `${h}:` : '') + `${m}:${s}`;
}