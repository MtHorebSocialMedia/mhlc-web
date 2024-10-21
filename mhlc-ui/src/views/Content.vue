<template>
  <v-container class="content-page" ref="content-page">
    <h2>
      <v-icon>mdi-image-filter-hdr-outline</v-icon>
      {{ page.title }}
    </h2>
    <hr />
    <v-row v-if="page.headerImage">
      <v-col class="header-image">
        <img
            :src="page.headerImage.url"
            :style="getImageStyle(page.headerImage)"
            alt="Header Image"
        />
      </v-col>
    </v-row>
    <v-row
        v-for="block in page.contentBlocks"
        v-bind:key="block.key"
    >
        <v-col>
            <ContentBlock
                :contentBlockKey="block.key"
            />
        </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import ContentBlock from '@/components/ContentBlock.vue'
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';
  import { computed, useTemplateRef } from 'vue';
  import router from '../router';
  import { getAssetSizeStyle } from '../utils/assetUtils';

  const contentStore = useContentStore();
  const { contentPages } = storeToRefs(contentStore);
  const contentPage = useTemplateRef('content-page');

  const page = computed(() => {
      const contentPath = router.currentRoute.value.path;
      return contentPages.value[contentPath];
  });

  function getImageStyle(image) {
      return getAssetSizeStyle(
          image.details.image.width,
          image.details.image.height,
          contentPage.value ? contentPage.value.$el : null
      );
  }

</script>

<style scoped>
  .v-container.content-page h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.content-page hr { margin-bottom: 20px; }
  .v-container.content-page .header-image img { display: block; margin-left: auto; margin-right: auto; }
</style>

