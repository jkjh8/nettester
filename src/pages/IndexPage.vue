<script setup>
import { message } from 'src/composables/useMessage.js'
</script>

<template>
  <q-table
    :columns="[
      {
        name: 'time',
        align: 'center',
        label: 'Time',
        field: 'time',
        sortable: true
      },
      {
        name: 'from',
        align: 'center',
        label: 'from',
        field: 'name',
        sortable: true
      },
      {
        name: 'message',
        align: 'center',
        label: 'Message',
        field: 'message'
      }
    ]"
    :rows="message"
    flat
    dense
    :pagination="{
      rowsPerPage: 0
    }"
  >
  </q-table>
</template>

<style scoped></style>
