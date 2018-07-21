// Modules to control application life and create native browser window
const {
	app,
	BrowserWindow,
	Menu,
	nativeImage,
	shell,
	Tray
} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const fetch = require('electron-fetch').default;

const urlMenuContext = 'https://raw.githubusercontent.com/liferay-labs-br/links-bag/master/static/menuContext.json';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let tray = null;

// Keep a reference for dev mode
let dev = false;

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
	dev = true;
}

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow(
		{
			width: 800, 
			height: 600,
			frame: false,
			titleBarStyle: 'hiddenInset'
		}
	);

	let indexPath;

	if (dev && process.argv.indexOf('--noDevServer') === -1) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true
		});
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join(__dirname, 'dist', 'index.html'),
			slashes: true
		});
	}

	// and load the index.html of the app.
	mainWindow.loadURL(indexPath);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()
	// Don't show until we are ready and loaded
	mainWindow.once('ready-to-show', () => {
		mainWindow.show();

		// Open the DevTools automatically if developing
		if (dev) {
			mainWindow.webContents.openDevTools();
		}
	});

	// Emitted when the window is closed.
	mainWindow.on('closed', function () {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
}

function createTray() {
	tray = new Tray(_getTrayIcon());

	if (dev) {
		mountContextMenuInLocal();
	} else {
		fetch(urlMenuContext)
			.then(res => res.json())
			.then(json => {
				const contextData = addEventClickMenuContext(json);
				const contextMenu = Menu.buildFromTemplate(contextData);

				tray.setContextMenu(contextMenu);
			})
			.catch((err) => {
				console.log(err);
				mountContextMenuInLocal();
			});
	}
}

function mountContextMenuInLocal() {
	const localDataFile = path.resolve(`${__dirname}/static/menuContext.json`);

	fs.readFile(
		localDataFile,
		'utf8',
		(err, contextStringData) => {
			if (err) {
				console.error(err);
			} else {
				const contextData = addEventClickMenuContext(JSON.parse(contextStringData));
				const contextMenu = Menu.buildFromTemplate(contextData);

				tray.setContextMenu(contextMenu);
			}
		}
	);
}

function addEventClickMenuContext(context) {
	const handleClick = (item) => {
		shell.openExternal(item.url);
	};

	const through = (array) => {
		for (let i = 0; i < array.length; i++) {
            let item = array[i];

            if (item.url) {
                item.click = handleClick;
            }

            if (item.submenu) {
                through(item.submenu);
            }
        }

        return array;
	};

    return through(context);
}

function _getTrayIcon() {
	return nativeImage.createFromPath(`${__dirname}/static/icons/trayTemplate.png`);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
	createTray();

	// Hide temporary window
	// createWindow();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});

// Temporarily hide the dock app, leaving only the notification menu.
app.dock.hide();

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
