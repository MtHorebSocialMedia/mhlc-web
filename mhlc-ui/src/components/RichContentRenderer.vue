<template>
  <div class="content">
    <RichTextRenderer
      :document="content"
      :nodeRenderers="renderNodes()"
    />
  </div>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { computed } from 'vue';
    import router from '../router';
    import { BLOCKS } from '@contentful/rich-text-types';
    import RichTextRenderer from 'contentful-rich-text-vue-renderer';
    import { h, Comment } from "vue";
    import { getAssetHeight, getAssetWidth } from '../utils/assetUtils';

    const props = defineProps({
        content: { type: Object, required: true }
    });

    const renderNodes = () => {
        return {
          [BLOCKS.EMBEDDED_ASSET]: (node, key, next) => {
              const asset = node.data.target.fields.file;
              switch(asset.contentType) {
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':
                case 'image/bmp':
                  const width = getAssetWidth(asset.details.image.width, asset.details.image.height);
                  const height = getAssetHeight(asset.details.image.width, asset.details.image.height);
                  return h(
                    'img',
                    { src: asset.url, width, height },
                    next(node.content, key, next)
                  );
                default:
                  console.error(`Unknown assetType [${asset.contentType}] for file [${asset.url}]`);
                  return h(
                    Comment,
                    {},
                    `Cannot render unknown asset type [${asset.contentType}] for file [${asset.url}]`,
                    next(node.content, key, next)
                  );
              }

          }
        }
    }
</script>

<style>
  .content h2 { margin-top: 10px; margin-bottom: 10px; }
  .content h3 { margin-top: 8px; margin-bottom: 8px; }
  .content h4 { margin-top: 8px; margin-bottom: 8px; }
  .content hr { margin-bottom: 20px; }
  .content p  { margin-top: 5px; margin-bottom: 5px; }
</style>
