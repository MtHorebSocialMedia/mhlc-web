<template>
  <v-container class="content-page">
    <h2>{{ page.title }}</h2>
    <hr />
    <RichContentRenderer :content="page.content" />
  </v-container>
</template>

<script setup>
  import RichContentRenderer from '@/components/RichContentRenderer.vue'
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';
  import { computed } from 'vue';
  import router from '../router';

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

