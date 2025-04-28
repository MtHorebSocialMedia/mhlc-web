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
  .v-container.analytics h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.analytics hr { margin-bottom: 20px; }
</style>

<style>
@page {
  size: A4 landscape;
}
@media print {
  /* All your print styles go here */
  .v-container.header,
  .v-col.month-options,
  .v-row.unknown-stats,
  .v-footer {
    display: none !important;
  }
  .v-row.platform-summary-heading {
    break-before: page;
  }
}
</style>
