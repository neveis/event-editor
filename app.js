'use strict';

const electron = require('electron')
    // Module to control application life.
const app = electron.app
    // Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const ipcMain = electron.ipcMain;
const dialog = electron.dialog;

const path = require('path')
const url = require('url')
const fs = require('fs')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600, useContentSize: true })

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/dist/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    mainWindow.webContents.openDevTools()

    //Emitted when window is resized. Page will modify css
    mainWindow.on('resize', function() {
        let contentSize = mainWindow.getContentSize();
        mainWindow.webContents.send('resize-window', contentSize)
    })


    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    ipcMain.on('output-event-file', function(event, eventsData) {
        let file = dialog.showSaveDialog({
            title: '保存文件',
            defaultPath: '\\',
            filters: [
                { name: 'JSON', extensions: ['json'] }
            ]
        })
        if (!file) return;
        //console.log('file', file);
        fs.writeFile(file, eventsData, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('saved file');
            }
        })
    })

    ipcMain.on('import-event-file', function(event) {
        let file = dialog.showOpenDialog({
                title: '导入文件',
                defaultPath: '\\',
                filters: [
                    { name: 'JSON', extensions: ['json'] }
                ]
            })
            //console.log(file);
        if (!file) {
            event.returnValue = null;
            return;
        }
        fs.readFile(file[0], 'utf-8', function(err, data) {
            if (err) {
                console.log(err);
            } else {
                event.returnValue = data;
            }
        })

    })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.