<template>
  <v-container
    v-if="page"
    class="content-page"
  >
    <h2>
      <v-icon>mdi-image-filter-hdr-outline</v-icon>
      {{ page.title }}
    </h2>
    <hr>
    <v-row v-if="page.headerImage">
      <v-col class="header-image">
        <ResponsiveImage
          :src="page.headerImage.url"
          alt="Header Image"
          :max-width="page.headerImage.details.image.width"
          :max-height="page.headerImage.details.image.height"
        />
      </v-col>
    </v-row>
    <v-row
      v-for="block in page.contentBlocks"
      :key="block.key"
    >
      <v-col>
        <ContentBlock
          :content-block-key="block.key"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import ContentBlock from '@/components/ContentBlock.vue'
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import router from '../router';
  import ResponsiveImage from '@/components/ResponsiveImage.vue';

  const contentStore = useContentStore();
  const { contentPages } = storeToRefs(contentStore);

  const page = computed(() => {
      const contentPath = router.currentRoute.value.path;
      return contentPages.value[contentPath];
  });

</script>

<style scoped>
  .v-container.content-page h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.content-page hr { margin-bottom: 20px; }
  .v-container.content-page .header-image img { display: block; margin-left: auto; margin-right: auto; }
</style>

