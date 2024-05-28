<template>
  <div class="content">
    <h2>{{ page.title }}</h2>
    <hr />
    <RichTextRenderer :document="page.content" />
  </div>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { computed } from 'vue';
    import router from '../router';
    import RichTextRenderer from 'contentful-rich-text-vue-renderer';
    const contentStore = useContentStore();
    const { contentPages } = storeToRefs(contentStore);
    const page = computed(() => {
        const contentPath = router.currentRoute.value.path;
        return contentPages.value[contentPath];
    });
</script>

<style>
  .content h2 { margin-top: 10px; margin-bottom: 10px; }
  .content h3 { margin-top: 8px; margin-bottom: 8px; }
  .content p  { margin-top: 5px; margin-bottom: 5px; }
</style>
