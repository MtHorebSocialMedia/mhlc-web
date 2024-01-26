<template>
  <h2>{{ page.title }}</h2>
  <hr />
  <RichTextRenderer :document="page.content" />
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
