import net from 'net'
import { rtMsg } from '../functions'

let server
let client

const clients = []

const closeTCPServer = () => {
  return new Promise((resolve, reject) => {
    try {
      if (clients.length) {
        for (let i = 0; i < clients.length; i++) {
          clients[i].destroy()
        }
      }
      server.close()
      server = null
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

const createTCPServer = (port, host) => {
  server = net.createServer()

  server.on('error', (err) => {
    rtMsg({
      protocol: 'TCP',
      from: 'TCP',
      message: `TCP Socket Error ${err}`
    })
  })

  server.on('close', () => {
    rtMsg({
      protocol: 'TCP',
      from: 'TCP',
      message: 'TCP Socket Closed'
    })
  })

  server.on('drop', (data) => {
    rtMsg({
      protocol: 'TCP',
      from: 'TCP',
      message: `TCP Socket Drop MaxConnections: ${server.maxConnections}, Local: ${data.localAddress} ${data.localPort}, Remote: ${data.remoteAddress} ${data.remotePort}`
    })
  })

  server.on('connection', (socket) => {
    clients.push(socket)
    rtMsg({
      protocol: 'TCP',
      from: `${socket.remoteAddress}:${socket.remotePort}`,
      message: `TCP Socket Connected ${socket.remoteAddress}:${socket.remotePort}`
    })

    socket.on('error', (err) => {
      rtMsg({
        protocol: 'TCP',
        from: `${socket.remoteAddress}:${socket.remotePort}`,
        message: `TCP Socket Error ${err}`
      })
    })

    socket.on('close', () => {
      clients.splice(clients.indexOf(socket), 1)
      rtMsg({
        protocol: 'TCP',
        from: `${socket.remoteAddress}:${socket.remotePort}`,
        message: `TCP Socket Closed ${socket.remoteAddress}:${socket.remotePort}`
      })
    })

    socket.on('timeout', () => {
      rtMsg({
        protocol: 'TCP',
        from: `${socket.remoteAddress}:${socket.remotePort}`,
        message: `TCP Socket Timeout ${socket.remoteAddress}:${socket.remotePort}`
      })
      clients[clients.indexOf(socket)].destroy()
      clients.splice(clients.indexOf(socket), 1)
    })

    socket.on('data', (msg) => {
      rtMsg({
        protocol: 'TCP',
        from: `${socket.remoteAddress}:${socket.remotePort}`,
        message: msg
      })
    })
  })

  server.listen(port, host, () => {
    rtMsg({
      protocol: 'TCP',
      from: 'TCP',
      message: `TCP Server Start At ${host}:${port}`
    })
  })
}

const connectTCPClient = (port, host) => {
  client = net.connect({ port, host })

  client.on('connect', () => {
    rtMsg({
      protocol: 'TCP',
      from: `${host}:${port}`,
      message: `TCP Socket Connected ${host}:${port} Client Mode`
    })

    client.on('close', () => {
      rtMsg({
        protocol: 'TCP',
        from: `${host}:${port}`,
        message: `TCP Socket Disconnected by Remote`
      })
    })

    client.on('error', (err) => {
      rtMsg({
        protocol: 'TCP',
        from: `${host}:${port}`,
        message: `TCP Socket Error: ${err}`
      })
    })

    client.on('data', (data) => {
      rtMsg({
        protocol: 'TCP',
        from: `${host}:${port}`,
        message: data
      })
    })
  })
}

const disconnectTCPClient = () => {
  client.destroy()
  client = null
}

const sendMessageTCP = (msg) => {
  if (server && clients.length) {
    clients.forEach((socket) => {
      socket.write(msg)
    })
    rtMsg({
      protocol: 'TCP',
      from: 'TCP Server',
      message: msg
    })
  }
  if (client) {
    client.write(msg)
    rtMsg({
      protocol: 'TCP',
      from: 'TCP Client',
      message: msg
    })
  }
}

export {
  createTCPServer,
  closeTCPServer,
  connectTCPClient,
  disconnectTCPClient,
  sendMessageTCP
}
