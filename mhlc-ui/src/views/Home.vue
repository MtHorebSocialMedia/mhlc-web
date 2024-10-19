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
    <v-container class="d-flex justify-center">
      <iframe
        :width="getAssetWidth(560, 315)"
        :height="getAssetHeight(560, 315)"
        src="https://www.youtube.com/embed/FywyUyCav4A?si=OL6EtBX38sBYP2h7"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </v-container>
  </v-container>
</template>

<script setup>
  import { getAssetWidth, getAssetHeight } from '../utils/assetUtils';
  import ContentBlock from '../components/ContentBlock.vue';
  import SpecialAnnouncements from '../components/SpecialAnnouncements.vue';
</script>

<style scoped>
  .v-container.home h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.home hr { margin-bottom: 20px; }
  .home p { margin-bottom: 10px; }
</style>
