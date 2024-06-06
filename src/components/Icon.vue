<script setup>
  defineProps({
    icon: {
      type: String,
      required: true,
    },
  })
</script>

<template>
  <div :class="icon"></div>
</template>
