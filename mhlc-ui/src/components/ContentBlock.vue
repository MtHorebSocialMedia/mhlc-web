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
            <v-container v-if="block.videoUrl" class="d-flex justify-center">
                <EmbeddedVideo :videoId="block.videoId" />
            </v-container>
            <RichContentRenderer
                v-if="block.content"
                :content="block.content"
            />
            <div
                v-if="block.jotformFormId"
                ref="jotformWrapper"
            ></div>
            <ResponsiveImage
                v-if="block.image && block.imageAlignment === 'bottom'"
                :src="block.image.url"
                alt="Content Block Image"
                :maxWidth="block.image.details.image.width"
                :maxHeight="block.image.details.image.height"
                :align="block.imageAlignment"
                :link="block.imageLink"
            />
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
  const jotformWrapper = ref(null);

  const contentStore = useContentStore();
  const { contentBlocks, contentAssistEnabled } = storeToRefs(contentStore);

  function initBlock(blockData) {
      block.value = blockData;
  }

  watch(jotformWrapper, () => {
    if(jotformWrapper.value && jotformWrapper.value.appendChild) {
        const jotformScript = document.createElement("script");
        jotformScript.setAttribute('type', 'text/javascript');
        jotformScript.setAttribute(
            'src',
            `https://form.jotform.com/jsform/${block.value.jotformFormId}`
        );
        jotformWrapper.value.appendChild(jotformScript);
    }
  });

  if(contentBlocks.value[props.contentBlockKey]) {
      initBlock(contentBlocks.value[props.contentBlockKey]);
  } else {
      watch(contentBlocks, () => {
          if(contentBlocks.value[props.contentBlockKey]) {
              initBlock(contentBlocks.value[props.contentBlockKey]);
          }
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