<template>
  <router-view />
</template>

<script setup>
    // initialize content
    import { useContentStore } from '@/store/content';
    const contentStore = useContentStore();
    contentStore.fetchContent();
</script>
