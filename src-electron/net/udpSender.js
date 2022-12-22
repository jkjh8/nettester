import dgram from 'dgram'
import { rtMsg } from '../functions'

let client
let senderAddress

const controller = new AbortController()
const { signal } = controller

const createUDPSender = (port, host, multicast) => {
  return new Promise((resolve, reject) => {
    if (!port) {
      reject(new Error('Invalid port'))
    }
    if (!host) {
      resolve(new Error('Invalid host'))
    }

    senderAddress = { port, host }
    client = dgram.createSocket('udp4', signal)
    client.bind()
    const address = client.address()
    if (multicast) {
      client.setBroadcast(true)
      client.setMulticastTTL(128)
      client.addMembership(host)
      rtMsg({
        protocol: 'UDP',
        msg: `UDP Sender Open At ${address.address}:${address.port} Multicast Mode`
      })
    } else {
      rtMsg({
        protocol: 'UDP',
        msg: `UDP Sender Open At ${address.address}:${address.port}`
      })
    }
  })
}

const closeUDPSender = () => {
  client.close()
  controller.abort()
  client = null
  rtMsg({
    protocol: 'UDP',
    msg: `UDP Sender Closed`
  })
}

const sendUDPMsg = (msg) => {
  if (client) {
    client.send(data, 0, data.length, senderAddress.port, senderAddress.host)
    rtMsg({
      protocol: 'UDP',
      from: 'UDP Sender',
      msg: msg
    })
  }
}

export { createUDPSender, closeUDPSender, sendUDPMsg }
