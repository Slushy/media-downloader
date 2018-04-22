const { app, BrowserWindow } = require('electron');

app.on('ready', () => {
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    mainWindow.loadURL(`file://${__dirname}/index.html`);
    mainWindow.on('close', () => app.quit());
});

app.on('window-all-closed', () => app.quit());
console.log(`Electron Version ${app.getVersion()}`);
