<script setup>
import { ref, defineEmits } from 'vue'
import { tcp } from 'src/composables/useTcp'
import { udpServer, udpSender } from 'src/composables/useUdp'
import LeftSide from 'src/components/LeftSide'
import LeftSideMini from 'src/components/LeftSideMini'
import Footer from 'src/components/footerCom'

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
        <LeftSideMini />
      </template>
      <LeftSide @closeToMini="miniState = true" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <Footer />
    </q-footer>
  </q-layout>
</template>

<style></style>
