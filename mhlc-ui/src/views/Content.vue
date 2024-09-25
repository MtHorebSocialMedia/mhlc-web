<template>
  <v-container class="content-page">
    <h2>
      <v-icon>mdi-image-filter-hdr-outline</v-icon>
      {{ page.title }}
    </h2>
    <hr />
    <v-row v-if="page.headerImage">
      <v-col>
        <img
            :src="page.headerImage.url"
            :width="getAssetWidth(page.headerImage.details.image.width, page.headerImage.details.image.height)"
            :height="getAssetHeight(page.headerImage.details.image.width, page.headerImage.details.image.height)"
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
  import { computed } from 'vue';
  import router from '../router';
  import { getAssetWidth, getAssetHeight } from '../utils/assetUtils';

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
</style>

