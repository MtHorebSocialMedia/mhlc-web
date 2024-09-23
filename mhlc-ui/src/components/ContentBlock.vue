<template>
    <div :class="contentAssistEnabled ? 'content-block outlined' : 'content-block'">
        <v-alert
            v-if="contentAssistEnabled"
            icon="mdi-file-document-outline"
        >{{ contentBlockKey }}</v-alert>
        <div v-if="block" class="content">
            <h3 v-if="block.title">{{ block.title }}</h3>
            <hr v-if="block.title" />
            <img
                v-if="block.image && block.imageAlignment !== 'bottom'"
                :src="block.image.url"
                :width="getAssetWidth(block.image.details.image.width, block.image.details.image.height)"
                :height="getAssetHeight(block.image.details.image.width, block.image.details.image.height)"
                :class="getImageClass(block)"
                alt="Content Block Image"
                @click="imageClicked(block.imageLink)"
            />
            <RichContentRenderer :content="block.content" />
            <img
                v-if="block.image && block.imageAlignment === 'bottom'"
                :src="block.image.url"
                :width="getAssetWidth(block.image.details.image.width, block.image.details.image.height)"
                :height="getAssetHeight(block.image.details.image.width, block.image.details.image.height)"
                :class="getImageClass(block)"
                alt="Content Block Image"
                @click="imageClicked(block.imageLink)"
            />
        </div>
    </div>
</template>

<script setup>
  import RichContentRenderer from '@/components/RichContentRenderer.vue'
  import { getAssetWidth, getAssetHeight } from '../utils/assetUtils';
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';
  import { ref, watch } from 'vue';

  const props = defineProps({
      contentBlockKey: { type: String, required: true }
  });

  const block = ref(null);

  const contentStore = useContentStore();
  const { contentBlocks, contentAssistEnabled } = storeToRefs(contentStore);

  block.value = contentBlocks.value[props.contentBlockKey];
  if (!block.value) {
    watch(contentBlocks, () => {
        block.value = contentBlocks.value[props.contentBlockKey];
    });
  }

  function getImageClass(block) {
      return block.imageLink ? `${block.imageAlignment} link` : block.imageAlignment;
  }

  function imageClicked(imageLink) {
      console.log('image clicked: ', imageLink);
      if (imageLink) {
          window.open(imageLink);
      }
  }

</script>

<style>
  .content-block hr { margin-bottom: 10px; }
  .content-block img.left { padding-right: 20px; padding-bottom: 10px; float: left; }
  .content-block img.right { padding-left: 20px; padding-bottom: 10px; float: right; }
  .content-block img.top { display: block; margin-left: auto; margin-right: auto; }
  .content-block img.bottom { display: block; margin-left: auto; margin-right: auto; }
  .content-block img.link { cursor: pointer; }
  .content-block img { border-radius: 25px; }
  .content-block table { border-collapse: collapse; margin-left: auto; margin-right: auto; }
  .content-block table th { background: #DDD; padding-left: 10px; padding-right: 10px; border: 1px solid black; }
  .content-block table td { padding-left: 10px; padding-right: 10px; border: 1px solid black; }
  .content-block.outlined { border: 1px dashed #999; }
  .content-block.outlined .content { padding: 5px; }
</style>