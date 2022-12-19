<script setup>
import { ref, defineEmits } from 'vue'
import { tcp } from 'src/composables/useTcp'
import { udpServer, udpSender } from 'src/composables/useUdp'
import LeftSide from 'src/components/leftSide'

const drawer = ref(false)
const miniState = ref(false)

const drawerClick = (e) => {
  if (miniState.value) {
    miniState.value = false
    e.stopPropagation()
  }
}
</script>

<template>
  <q-layout view="hHh Lpr fFf">
    <q-header elevated class="main-bg-color text-white">
      <q-toolbar>
        <q-btn dense round unelevated color="primary" @click="drawer = !drawer">
          <q-icon name="menu" size="xs" />
        </q-btn>

        <q-toolbar-title> Net Test Tool </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="drawer"
      :mini="!drawer || miniState"
      :overlay="false"
      side="left"
      :breakpoint="400"
      bordered
      @click.capture="drawerClick"
    >
      <!-- drawer content -->
      <template #mini>
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
      <LeftSide @closeToMini="miniState = true" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<style></style>
