<script setup>
const props = defineProps({ msg: String, width: Number })
</script>

<template>
  <q-tooltip
    class="tooltip-bg"
    anchor="bottom right"
    self="center right"
    :offset="[10, 10]"
    :delay="500"
    :style="`background: #aaaaaaaa; width: ${width}px;`"
  >
    {{ props.msg }}
  </q-tooltip>
</template>
