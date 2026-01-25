<template>
  <v-container
    v-if="specialAnnouncements && specialAnnouncements.length > 0"
    class="special-announcements"
  >
    <v-alert
      v-for="announcement in specialAnnouncements"
      :key="announcement.id"
      :type="announcement.type"
    >
      <div>
        <h3>{{ announcement.title }}</h3>
        <RichContentRenderer :content="announcement.description" />
        <ResponsiveImage
          v-if="announcement.image"
          :src="announcement.image.url"
          alt="Special Announcement Image"
          :max-width="announcement.image.details.image.width"
          :max-height="announcement.image.details.image.height"
        />
        <EmbeddedVideo
          v-if="announcement.videoUrl"
          :video-id="announcement.videoId"
        />
      </div>
    </v-alert>
  </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import EmbeddedVideo from './EmbeddedVideo.vue';
    import ResponsiveImage from './ResponsiveImage.vue';
    import RichContentRenderer from './RichContentRenderer.vue';

    const contentStore = useContentStore();
    const { specialAnnouncements } = storeToRefs(contentStore);

</script>

<style>
.v-container.special-announcements { padding: 0px; margin-bottom: 10px; }
.v-container.special-announcements .v-alert { margin-bottom: 10px; }
.v-container.special-announcements .v-alert img { display: block; margin-left: auto; margin-right: auto; }
</style>