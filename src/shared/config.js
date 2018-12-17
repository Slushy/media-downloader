import Conf from 'conf';
const config = new Conf({
    projectName: 'Youtube Downloader'
});

export const SAVE_FOLDER = 'saveFolder';
export const TEMP_FOLDER = 'tempFolder';

const KEY_TYPES = {
    [SAVE_FOLDER]: 'string',
    [TEMP_FOLDER]: 'string'
};

for (const key in KEY_TYPES) {
    if (config.has(key) && typeof config.get(key) !== KEY_TYPES[key]) {
        console.log(`Found invalid key: typeof ${key} === ${typeof config.get(key)}`);
        config.delete(key);
    }
}

export const setIfNotDefined = (defaults = {}) => Object.keys(defaults).forEach(key => {
    config.has(key) || config.set(key, defaults[key]);
});

export const getSaveFolder = () => config.get(SAVE_FOLDER);
export const getTempFolder = () => config.get(TEMP_FOLDER);

export const setSaveFolder = folder => config.set(SAVE_FOLDER, folder);

export const onSaveFolderChanged = cb => config.onDidChange(SAVE_FOLDER, cb);
export const onTempFolderChanged = cb => config.onDidChange(TEMP_FOLDER, cb);

export const clearConfig = () => config.clear();
