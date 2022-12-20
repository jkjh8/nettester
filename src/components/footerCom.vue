<script setup>
import { setup } from 'src/composables/useSetup'
</script>

<template>
  <div class="q-pa-sm">
    <div class="row no-wrap justify-end">
      <q-toggle
        v-model="setup.showByte"
        checked-icon="check"
        color="primary"
        unchecked-icon="clear"
        label="Show Byte"
        left-label
      />

      <q-toggle
        v-model="setup.sendByte"
        checked-icon="check"
        color="primary"
        unchecked-icon="clear"
        label="Send Byte"
        left-label
      />

      <q-toggle
        v-model="setup.crlf"
        checked-icon="check"
        color="primary"
        unchecked-icon="clear"
        label="Send CRLF"
        left-label
      />
    </div>
    <div class="row no-wrap">
      <div class="col-11 q-pr-sm">
        <q-input
          v-model="setup.message"
          filled
          dense
          label="Message"
          label-color="grey-5"
          input-class="text-grey-2"
        />
      </div>
      <q-btn class="col-1" icon="send" unelevated color="grey-7">
        <q-tooltip>SEND</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<style scoped></style>
