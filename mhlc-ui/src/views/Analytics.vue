<template>
  <v-container class="analytics">
      <h2>
        <v-icon>mdi-image-filter-hdr-outline</v-icon>
        Analytics Report
      </h2>
      <hr />
      <TrafficSummary />
  </v-container>
</template>

<script setup>
  import TrafficSummary from '@/components/TrafficSummary.vue'
</script>

<style scoped>
.v-container.blogs h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.blogs hr { margin-bottom: 20px; }
</style>
