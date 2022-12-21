<script setup>
import { tcp } from 'src/composables/useTcp'
import { udpServer, udpSender } from 'src/composables/useUdp'
import TooltipDelay from 'src/components/tooltipDelay'
</script>

<template>
  <div class="q-pa-md q-gutter-y-lg column justify-center items-center">
    <q-icon
      :name="
        tcp.connect
          ? 'svguse:icons.svg#ethernet-online'
          : 'svguse:icons.svg#ethernet'
      "
      size="sm"
    >
      <TooltipDelay :msg="`TCP ${tcp.mode}`" :width="70" />
    </q-icon>

    <q-icon
      :name="
        udpServer.connect
          ? 'svguse:icons.svg#ethernet-online'
          : 'svguse:icons.svg#ethernet'
      "
      size="sm"
    >
      <TooltipDelay msg="UDP SERVER" :width="80" />
    </q-icon>

    <q-icon
      :name="
        udpSender.connect
          ? 'svguse:icons.svg#ethernet-online'
          : 'svguse:icons.svg#ethernet'
      "
      size="sm"
    >
      <TooltipDelay msg="UDP SENDER" :width="85" />
    </q-icon>
  </div>
</template>

<style scoped></style>
