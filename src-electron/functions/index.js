import { BrowserWindow as bw } from 'electron'

const rtMsg = (args) => {
  return bw.fromId(1).webContents.send('onResponse', args)
}

export { rtMsg }
