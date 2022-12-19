const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  onRequest: (args) => {
    ipcRenderer.send('onRequest', { ...args })
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
