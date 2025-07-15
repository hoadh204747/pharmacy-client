<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <component :is="route.meta?.layout">
    <slot></slot>
  </component>
</template>

<style>
* {
  box-sizing: border-box;
  font-family: "Quicksand";
}
</style>