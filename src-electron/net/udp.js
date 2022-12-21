import dgram from 'dgram'
import { rtMsg } from '../functions'

let server
let sender
let senderAddress

const controller = new AbortController()
const { signal } = controller

export const createUdpServer = (port, host, multicast) => {
  return new Promise((resolve, reject) => {
    if (!port) {
      reject(new Error('Invalid port'))
    }
    if (!nost) {
      resolve(new Error('Invalid host'))
    }

    server = dgram.createSocket('udp4', signal)

    server.on('message', (msg, rinfo) => {
      rtMsg({
        time: new Date.now(),
        protocol: 'UDP',
        from: `${rinfo.address}:${rinfo.port}`,
        message: msg
      })
    })

    server.on('error', (err) => {
      rtMsg({
        time: new Date.now(),
        protocol: 'UDP',
        message: `UDP Server Error ${err.stack}`
      })
    })

    try {
      if (multicast) {
        server.bind(port, () => {
          server.setBroadcast(true)
          server.setMulticastTTL(128)
          server.addMembership(host)
          const address = server.address()
          resolve(
            rtMsg({
              time: new Date.now(),
              protocol: 'UDP',
              message: `UDP Server Open At ${address.address}:${address.port} Multicast Mode`
            })
          )
        })
      } else {
        server.bind(port, host, () => {
          const address = server.address()
          resolve(
            rtMsg({
              time: new Date.now(),
              protocol: 'UDP',
              message: `UDP Server Open At ${address.address}:${address.port} `
            })
          )
        })
      }
    } catch (err) {
      reject(err)
    }
  })
}

const closeUDPServer = () => {
  server.close()
  controller.abort()
  server = null
  rtMsg({
    time: new Date.now(),
    protocol: 'UDP',
    msg: `UDP Server Closed`
  })
}

const createUDPSender = (port, host, multicast) => {
  return new Promise((resolve, reject) => {
    if (!port) {
      reject(new Error('Invalid port'))
    }
    if (!host) {
      resolve(new Error('Invalid host'))
    }
  })
}

export { createUdpServer, closeUDPServer }
