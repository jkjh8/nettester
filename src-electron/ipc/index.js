import { ipcMain } from 'electron'

ipcMain.on('onPromise', async (e, args) => {
  switch (args.command) {
    case 'tcpconnect':
      break
    case 'tcpdisconnect':
      break
    case 'udpserverconnect':
      break
    case 'udpserverdisconnect':
      break
    case 'udpsenderconnect':
      break
    case 'udpsenderdisconnect':
      break

    default:
      console.log('unknown connand', args)
      break
  }
})
