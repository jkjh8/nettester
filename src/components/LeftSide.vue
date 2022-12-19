<script setup>
import { defineEmits } from 'vue'
import ExpTcp from 'src/components/expensions/expTcp'
import UdpServer from 'src/components/expensions/expUdpServer'
import UdpSender from 'src/components/expensions/expUdpSender'

const emit = defineEmits(['closeToMini'])
</script>

<template>
  <q-list>
    <ExpTcp />
    <UdpServer />
    <UdpSender />
  </q-list>
  <div class="q-mini-drawer-hide absolute" style="top: 50%; right: -17px">
    <q-btn
      dense
      round
      unelevated
      color="accent"
      icon="chevron_left"
      @click="emit('closeToMini')"
    />
  </div>
</template>

<style scoped></style>
