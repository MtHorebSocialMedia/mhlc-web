<template>
  <v-container class="home">
    <h2>
      <v-icon>mdi-image-filter-hdr-outline</v-icon>
      Welcome to Mt. Horeb Lutheran Church!
    </h2>
    <hr />
    <SpecialAnnouncements />
    <v-alert style="text-align: center">
      <ContentBlock contentBlockKey="home/welcome" />
    </v-alert>
    <EmbeddedVideo videoId="FywyUyCav4A" />
  </v-container>
</template>

<script setup>
  import ContentBlock from '../components/ContentBlock.vue';
  import SpecialAnnouncements from '../components/SpecialAnnouncements.vue';
import EmbeddedVideo from '@/components/EmbeddedVideo.vue';
</script>

<style scoped>
  .v-container.home h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.home hr { margin-bottom: 20px; }
  .home p { margin-bottom: 10px; }
</style>
