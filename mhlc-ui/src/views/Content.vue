<template>
  <v-container class="content-page">
    <h2>{{ page.title }}</h2>
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
    <RichContentRenderer
      v-if="page.content"
      :content="page.content"
    />
    <ContentPageSection
      v-if="page.section1.content"
      :section="page.section1"
    />
    <ContentPageSection
      v-if="page.section2.content"
      :section="page.section2"
    />
    <ContentPageSection
      v-if="page.section3.content"
      :section="page.section3"
    />
  </v-container>
</template>

<script setup>
  import RichContentRenderer from '@/components/RichContentRenderer.vue'
  import ContentPageSection from '@/components/ContentPageSection.vue'
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

