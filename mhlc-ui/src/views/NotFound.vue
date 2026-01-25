<template>
  <v-container class="not-found">
    <h2>
      <v-icon>mdi-image-filter-hdr-outline</v-icon>
      Page Not Found
    </h2>
    <hr>
    <v-alert>
      <ContentBlock content-block-key="not-found/info" />
    </v-alert>
    <BlogsList />
  </v-container>
</template>

<script setup>
  import ContentBlock from '@/components/ContentBlock.vue'
</script>

<style scoped>
.v-container.not-found h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.not-found hr { margin-bottom: 20px; }
</style>
