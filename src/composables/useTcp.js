import { ref } from 'vue'

const tcp = ref({
  mode: 'Server',
  ipaddress: '0.0.0.0',
  port: 3000,
  connect: false
})

export { tcp }
