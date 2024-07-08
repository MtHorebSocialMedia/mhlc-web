<template>
  <v-container class="news">
      <h2>News</h2>
      <hr />
      <NewsList />
  </v-container>
</template>

<script setup>
  import NewsList from '@/components/NewsList.vue'
</script>

<style scoped>
.v-container.news h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.news hr { margin-bottom: 20px; }
</style>
