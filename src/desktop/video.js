export default class Video {
    constructor(id, url, info) {
        this.id = id;
        this.url = url;
        this.info = info;
        this.title = info.title;
        this.thumbnail = info.thumbnail_url;
        this.image = undefined;
    }

    _downloadThumbnail() {
        if (!this.thumbnail) return;
        // TODO: this.image = ...
    }
}