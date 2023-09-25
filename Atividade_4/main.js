// main.js

// Modules to control application life and create native browser window

const { app, BrowserWindow, ipcMain, Notification } = require('electron')
const axios = require('axios')
const path = require('node:path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Push Notification',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.

ipcMain.on("enviar-notificacao", (event, arg) => {
  novaNotificacao()
})

ipcMain.on("atualizar-notificacao", (event, arg) => {
  try {
    axios.patch('http://127.0.0.1:3000/atualizarNotificacao', {
      "titulo": arg.titulo,
      "corpo": arg.corpo,
      "mostrar": 1
  })
    
  } catch (error) {
    console.log(error);
  }
})

const novaNotificacao = async () => {
  if(!Notification.isSupported()) {
      console.log('Notificações não são suportadas neste navegador')
      return;
  }


  let title = "Titulo não encontrado"
  let body = "Corpo não encontrado"

  try {
    const resp = await axios.get('http://127.0.0.1:3000/mostrarNotificacao')
    if(resp) {
      title = resp.data.notificacao[0].titulo
      body = resp.data.notificacao[0].corpo
    }
  } catch (error) {
    console.log(error);
  }

  const novaNotificacao = new Notification({
      title: title,
      body: body,
      subtitle: 'Notificação',
      silent: false,
      urgency: 'critical',
      timeoutType: "default",
      actions: [{text: 'Botão 1', type: 'button'}, {text: 'Botão 2', type: 'button'}],
      closeButtonText: 'Fechar',
      sound: 'ping.aiff',
  })

  console.log("Exibindo notificação")

  novaNotificacao.show();
}