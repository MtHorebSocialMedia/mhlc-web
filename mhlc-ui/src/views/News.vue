<template>
  <v-container class="news">
    <h2>
      <v-icon>mdi-image-filter-hdr-outline</v-icon>
      Happenings from the Mount - News
    </h2>
    <hr>
    <v-alert>
      <ContentBlock content-block-key="news/header" />
    </v-alert>
    <NewsList />
  </v-container>
</template>

<script setup>
  import NewsList from '@/components/NewsList.vue'
  import ContentBlock from '@/components/ContentBlock.vue'
</script>

<style scoped>
.v-container.news h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.news hr { margin-bottom: 20px; }
</style>
