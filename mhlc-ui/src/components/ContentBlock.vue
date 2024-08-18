<template>
    <div v-if="block" class="content-block">
        <h3 v-if="block.title">{{ block.title }}</h3>
        <hr v-if="block.title" />
        <img
            v-if="block.image && block.imageAlignment !== 'bottom'"
            :src="block.image.url"
            :width="getAssetWidth(block.image.details.image.width, block.image.details.image.height)"
            :height="getAssetHeight(block.image.details.image.width, block.image.details.image.height)"
            :class="block.imageAlignment"
            alt="Content Block Image"
        />
        <RichContentRenderer :content="block.content" />
        <img
            v-if="block.image && block.imageAlignment === 'bottom'"
            :src="block.image.url"
            :width="getAssetWidth(block.image.details.image.width, block.image.details.image.height)"
            :height="getAssetHeight(block.image.details.image.width, block.image.details.image.height)"
            :class="block.imageAlignment"
            alt="Content Block Image"
        />
    </div>
</template>

<script setup>
  import RichContentRenderer from '@/components/RichContentRenderer.vue'
  import { getAssetWidth, getAssetHeight } from '../utils/assetUtils';
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';

  const props = defineProps({
      contentBlockKey: { type: String, required: true }
  });

  const contentStore = useContentStore();
  const { contentBlocks } = storeToRefs(contentStore);

  const block = contentBlocks.value[props.contentBlockKey];

</script>

<style>
  .content-block hr { margin-bottom: 10px; }
  .content-block img.left { padding-right: 20px; padding-bottom: 10px; float: left; }
  .content-block img.right { padding-left: 20px; padding-bottom: 10px; float: right; }
  .content-block img.top { text-align: center; }
  .content-block img.bottom { text-align: center; }
</style>