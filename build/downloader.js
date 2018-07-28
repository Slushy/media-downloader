/**
 * Downloads ffmpeg executable
 */
const fs = require('fs');
const request = require('request');
const progress = require('request-progress');

const path = require('path');

const DIR = path.resolve(__dirname, '../', 'binbb');
fs.existsSync(DIR) || fs.mkdirSync(DIR);

// TODO: NEED TO UNZIP
const FILE_PATH = path.join(DIR, 'ffmpeg.exe');

// Windows
download("http://ffmpeg.zeranoe.com/builds/win64/static/ffmpeg-4.0-win64-static.zip");

function download(url) {
    progress(request(url), { throttle: 100 })
        .on('progress', (state) => process.stdout.write(`Downloading ffmpeg... ${Math.ceil(state.percent * 100)}%\r`))
        .on('error', (err) => { console.error(err) })
        .pipe(fs.createWriteStream(FILE_PATH));
}
