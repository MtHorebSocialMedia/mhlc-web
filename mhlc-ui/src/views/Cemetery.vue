<template>
  <v-container
    ref="embedded-map"
    class="cemetery"
  >
    <h2>
      <v-icon>mdi-image-filter-hdr-outline</v-icon>
      Cemetery
    </h2>
    <hr>
    <ContentBlock content-block-key="cemetery/info" />
    <iframe
      src="https://mhlccem.maps.arcgis.com/apps/instant/basic/index.html?appid=d0b223046baf4f21bd5607794b73caf4"
      frameborder="0"
      :style="getMapStyle()"
      allowfullscreen
    >
        iFrames are not supported on this page.
    </iframe>
  </v-container>
</template>

<script setup>
    import ContentBlock from '../components/ContentBlock.vue';
    import { getAssetSizeStyle } from '../utils/assetUtils';
    import { useTemplateRef } from 'vue';

    const mapContainer = useTemplateRef('embedded-map');

    function getMapStyle() {
        return getAssetSizeStyle(
            850,
            600,
            mapContainer.value ? mapContainer.value.$el : null
        ) + ' border: none; display: block; margin-left: auto; margin-right: auto;';
    }
</script>

<style scoped>
  .v-container.cemetery h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.cemetery hr { margin-bottom: 20px; }
  .cemetery p { margin-bottom: 10px; }
</style>
