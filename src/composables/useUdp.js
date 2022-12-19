import { ref } from 'vue'

const udpServer = ref({
  ipaddress: '127.0.0.1',
  port: 3000,
  multicast: false,
  connect: false
})

const udpSender = ref({
  ipaddress: '127.0.0.1',
  port: 3000,
  multicast: false,
  connect: false
})

export { udpServer, udpSender }
