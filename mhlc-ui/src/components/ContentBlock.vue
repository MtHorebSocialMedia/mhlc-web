<template>
    <div :class="contentAssistEnabled ? 'content-block outlined' : 'content-block'" ref="content-block">
        <v-alert
            v-if="contentAssistEnabled"
            icon="mdi-file-document-outline"
        >{{ contentBlockKey }}</v-alert>
        <div v-if="block" class="content">
            <h3 v-if="block.title">{{ block.title }}</h3>
            <hr v-if="block.title" />
            <ResponsiveImage
                v-if="block.image && block.imageAlignment !== 'bottom'"
                :src="block.image.url"
                alt="Content Block Image"
                :maxWidth="block.image.details.image.width"
                :maxHeight="block.image.details.image.height"
                :align="block.imageAlignment"
                :link="block.imageLink"
            />
            <RichContentRenderer :content="block.content" />
            <ResponsiveImage
                v-if="block.image && block.imageAlignment === 'bottom'"
                :src="block.image.url"
                alt="Content Block Image"
                :maxWidth="block.image.details.image.width"
                :maxHeight="block.image.details.image.height"
                :align="block.imageAlignment"
                :link="block.imageLink"
            />
            <v-container v-if="block.videoUrl" class="d-flex justify-center">
                <EmbeddedVideo :videoId="block.videoId" />
            </v-container>
        </div>
    </div>
</template>

<script setup>
  import RichContentRenderer from '@/components/RichContentRenderer.vue'
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';
  import { ref, watch } from 'vue';
  import EmbeddedVideo from './EmbeddedVideo.vue';
  import ResponsiveImage from './ResponsiveImage.vue';

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

</script>

<style>
  .content-block hr { margin-bottom: 10px; }
  .content-block table { border-collapse: collapse; margin-left: auto; margin-right: auto; }
  .content-block table th { background: #DDD; padding-left: 10px; padding-right: 10px; border: 1px solid black; }
  .content-block table td { padding-left: 10px; padding-right: 10px; border: 1px solid black; }
  .content-block.outlined { border: 1px dashed #999; }
  .content-block.outlined .content { padding: 5px; }
</style>