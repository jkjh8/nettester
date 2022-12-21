const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  tcpMsg: (args) => {
    ipcRenderer.send('tcpMsg', { ...args })
  },
  udpServerMsg: (args) => {
    ipcRenderer.send('udpServerMsg', { ...args })
  },
  udpSenderMsg: (args) => {
    ipcRenderer.send('udpSenderMsg', { ...args })
  },
  onResponse: (fn) => {
    ipcRenderer.on('onResponse', (e, ...args) => {
      fn(...args)
    })
  },
  onPromise: async (args) => {
    return await ipcRenderer.invoke('onPromise', { ...args })
  }
})
