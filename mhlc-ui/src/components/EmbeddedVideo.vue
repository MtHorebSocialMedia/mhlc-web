<template>
  <v-container
    ref="embedded-video"
    class="d-flex justify-center"
  >
    <iframe
      :src="getVideoUrl()"
      :style="getVideoStyle()"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    />
  </v-container>
</template>

<script setup>
    import { getAssetSizeStyle } from '../utils/assetUtils';
    import { useTemplateRef } from 'vue';

    const props = defineProps({
        videoId: { type: String, required: true },
        maxWidth: { type: Number, required: false, default: 560 },
        maxHeight: { type: Number, required: false, default: 315 }
    });

    const videoContainer = useTemplateRef('embedded-video');

    function getVideoUrl() {
        return `https://www.youtube.com/embed/${props.videoId}`;
    }

    function getVideoStyle() {
        return getAssetSizeStyle(
            props.maxWidth,
            props.maxHeight,
            videoContainer.value ? videoContainer.value.$el : null
        ) + ' border: none;';
    }

</script>
