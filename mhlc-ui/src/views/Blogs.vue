<template>
  <v-container class="blogs">
      <h2>
        Blog Posts
        <v-icon>mdi-image-filter-hdr-outline</v-icon>
        Musings from the Mount
      </h2>
      <hr />
      <BlogsList />
  </v-container>
</template>

<script setup>
  import BlogsList from '@/components/BlogsList.vue'
</script>

<style scoped>
.v-container.blogs h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.blogs hr { margin-bottom: 20px; }
</style>
