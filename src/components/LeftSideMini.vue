<script setup>
import { tcp } from 'src/composables/useTcp'
import { udpServer, udpSender } from 'src/composables/useUdp'
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
      <q-tooltip
        style="width: 70px; background: #888888aa"
        anchor="bottom right"
        self="center right"
      >
        TCP {{ tcp.mode }}</q-tooltip
      >
    </q-icon>

    <q-icon
      :name="
        udpServer.connect
          ? 'svguse:icons.svg#ethernet-online'
          : 'svguse:icons.svg#ethernet'
      "
      size="sm"
    >
      <q-tooltip
        style="width: 70px; background: #888888aa"
        anchor="bottom right"
        self="center right"
      >
        UDP Server</q-tooltip
      >
    </q-icon>

    <q-icon
      :name="
        udpSender.connect
          ? 'svguse:icons.svg#ethernet-online'
          : 'svguse:icons.svg#ethernet'
      "
      size="sm"
    >
      <q-tooltip
        style="width: 75px; background: #888888aa"
        anchor="bottom right"
        self="center right"
      >
        UDP Sender</q-tooltip
      >
    </q-icon>
  </div>
</template>

<style scoped></style>
