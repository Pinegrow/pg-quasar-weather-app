<script setup>
  const props = defineProps({
    icon: {
      type: String,
      required: true
    }
  })

</script>

<template>
  <div :class="icon"></div>
</template>

