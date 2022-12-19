<script setup>
import { useQuasar } from 'quasar'
import { udpSender } from 'src/composables/useUdp'
import {
  required,
  chkIpaddress,
  minPort,
  maxPort
} from 'src/composables/useRules'

const $q = useQuasar()

const connect = () => {
  $q.loading.show()
  if (!chkIpaddress(udpSender.value.ipaddress)) {
    $q.notify({
      position: 'top',
      icon: 'warning',
      color: 'red-10',
      message: 'UDP SENDER를 활성화 할 수 없습니다.',
      caption: '유효하지 않은 IP Address 입니다.'
    })
    $q.loading.hide()
    return (udpSender.value.connect = false)
  }

  if (!minPort(udpSender.value.port) || !maxPort(udpSender.value.port)) {
    $q.notify({
      position: 'top',
      icon: 'warning',
      color: 'red-10',
      message: 'UDP SENDER를 활성화 할 수 없습니다.',
      caption:
        '유효 하지 않은 포트입니다. 1 ~ 65535 사이의 숫자를 선택해주세요.'
    })
    $q.loading.hide()
    return (udpSender.value.connect = false)
  }

  console.log(udpSender.value)
  $q.loading.hide()
}
</script>

<template>
  <q-expansion-item
    expand-separator
    :icon="
      udpSender.connect
        ? 'svguse:icons.svg#ethernet-online'
        : 'svguse:icons.svg#ethernet'
    "
    label="UDP Server"
  >
    <div class="q-gutter-y-sm q-py-sm q-px-md bg-grey-2">
      <q-input
        v-model="udpSender.ipaddress"
        label="IP Address"
        dense
        filled
        :disable="udpSender.connect"
      />
      <q-input
        v-model="udpSender.port"
        label="Port"
        type="number"
        dense
        filled
        :disable="udpSender.connect"
      />
      <q-separator />
      <div
        class="row no-wrap justify-between items-center q-ma-none q-pl-md text-grey-7"
      >
        <div>Multicast</div>
        <q-toggle
          v-model="udpSender.multicast"
          checked-icon="check"
          color="green-4"
          unchecked-icon="clear"
        />
      </div>
      <div
        class="row no-wrap justify-between items-center q-ma-none q-pl-md text-grey-7"
      >
        <div>Connect</div>
        <q-toggle
          v-model="udpSender.connect"
          checked-icon="check"
          color="green-4"
          unchecked-icon="clear"
          @update:model-value="connect"
        />
      </div>
    </div>
  </q-expansion-item>
</template>

<style scoped></style>
