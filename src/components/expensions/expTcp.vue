<script setup>
import { useQuasar } from 'quasar'
import { tcp } from 'src/composables/useTcp'
import {
  required,
  chkIpaddress,
  minPort,
  maxPort
} from 'src/composables/useRules'

const $q = useQuasar()

const connect = () => {
  $q.loading.show()
  if (!chkIpaddress(tcp.value.ipaddress)) {
    $q.notify({
      position: 'top',
      icon: 'warning',
      color: 'red-10',
      message: `TCP ${tcp.value.mode.toUpperCase()}를 활성화 할 수 없습니다.`,
      caption: '유효하지 않은 IP Address 입니다.'
    })
    $q.loading.hide()
    return (tcp.value.connect = false)
  }

  if (!minPort(tcp.value.port) || !maxPort(tcp.value.port)) {
    $q.notify({
      position: 'top',
      icon: 'warning',
      color: 'red-10',
      message: `TCP ${tcp.value.mode.toUpperCase()}를 활성화 할 수 없습니다.`,
      caption:
        '유효 하지 않은 포트입니다. 1 ~ 65535 사이의 숫자를 선택해주세요.'
    })
    $q.loading.hide()
    return (tcp.value.connect = false)
  }

  console.log(tcp.value)
  $q.loading.hide()
}
</script>

<template>
  <q-expansion-item
    expand-separator
    :icon="
      tcp.connect
        ? 'svguse:icons.svg#ethernet-online'
        : 'svguse:icons.svg#ethernet'
    "
    label="TCP"
  >
    <div class="q-py-sm q-px-md q-gutter-y-sm bg-grey-2">
      <q-select
        v-model="tcp.mode"
        :options="['Server', 'Client']"
        dense
        filled
        label="Mode"
        :disable="tcp.connect"
      />
      <q-input
        v-model="tcp.ipaddress"
        label="IP Address"
        dense
        filled
        :disable="tcp.connect"
      />
      <q-input
        v-model="tcp.port"
        label="Port"
        dense
        filled
        :disable="tcp.connect"
      />
      <q-separator />
      <div
        class="row no-wrap justify-between items-center q-ma-none q-pl-md text-grey-7"
      >
        <div>Connect</div>
        <q-toggle
          v-model="tcp.connect"
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
