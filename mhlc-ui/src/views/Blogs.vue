<template>
  <v-container class="blogs">
      <h2>
        <v-icon>mdi-image-filter-hdr-outline</v-icon>
        Musings from the Mount - Blog Posts
      </h2>
      <hr />
      <v-alert>
        <ContentBlock content-block-key="blogs/header" />
      </v-alert>
      <BlogsList />
  </v-container>
</template>

<script setup>
  import BlogsList from '@/components/BlogsList.vue'
  import ContentBlock from '@/components/ContentBlock.vue'
</script>

<style scoped>
.v-container.blogs h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.blogs hr { margin-bottom: 20px; }
</style>
