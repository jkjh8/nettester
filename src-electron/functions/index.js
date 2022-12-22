import { BrowserWindow as bw } from 'electron'

const rtMsg = (args) => {
  return bw.fromId(1).webContents.send('onResponse', {
    type: typeof args.message === 'string' ? 'string' : 'byte',
    time: Date.now(),
    ...args
  })
}

const closeEvt = (type) => {
  return bw.fromId(1).webContents.send('rtFn', {
    fn: 'close',
    type: type
  })
}

export { rtMsg, closeEvt }
