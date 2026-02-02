<template>
  <div class="content">
    <RichTextRenderer
      :document="content"
      :node-renderers="renderNodes()"
    />
  </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router'
    import { BLOCKS, MARKS } from '@contentful/rich-text-types';
    import RichTextRenderer from 'contentful-rich-text-vue-renderer';
    import { h, Comment } from "vue";
    import { getAssetHeight, getAssetWidth } from '../utils/assetUtils';

    defineProps({
        content: { type: Object, required: true }
    });

    function applyMarks(text, marks) {
      return marks.reduce((content, mark) => {
        switch (mark.type) {
          case MARKS.BOLD:
            return h('strong', content)
          case MARKS.ITALIC:
            return h('em', content)
          case MARKS.UNDERLINE:
            return h('u', content)
          case MARKS.CODE:
            return h('code', content)
          default:
            return content
        }
      }, text)
    }

    const renderNodes = () => {
        return {
          [BLOCKS.EMBEDDED_ASSET]: (node, key, next) => {
              const asset = node.data.target.fields.file;
              const width = getAssetWidth(asset.details.image.width, asset.details.image.height);
              const height = getAssetHeight(asset.details.image.width, asset.details.image.height);
              switch(asset.contentType) {
                case 'image/png':
                case 'image/jpg':
                case 'image/jpeg':
                case 'image/gif':
                case 'image/bmp':
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

          },
          'hyperlink': (node, key, next) => {
            if (node.data.uri.startsWith('/')) {
              return h(
                RouterLink,
                { to: node.data.uri },
                () => next(node.content, key, next)
              );
            } else {
              return h(
                'a',
                { href: node.data.uri },
                next(node.content, key, next)
              );
            }
          },
          'entry-hyperlink': (node, key, next) => {
            return h(
              RouterLink,
              { to: node.data.target.fields.contentPath },
              () => next(node.content, key, next)
            );
          },
          'asset-hyperlink': (node, key, next) => {
            return h(
                'a',
                {
                  href: node.data.target.fields.file.url,
                  target: '_blank'
                },
                next(node.content, key, next)
              );
          },
          'text': (node) => {
              const content = []
              if (node.value.includes('\n')) {
                const parts = node.value.split('\n')
                parts.forEach((part) => {
                  if (part !== '') {
                    content.push(applyMarks(part, node.marks))
                    content.push(h('br'))
                  }
                })
              } else {
                content.push(applyMarks(node.value, node.marks))
              }
              return content
          }
        }
    }

</script>

<style>
  .content h2 { margin-top: 10px; margin-bottom: 10px; }
  .content h3 { margin-top: 8px; margin-bottom: 8px; }
  .content h4 { margin-top: 8px; margin-bottom: 8px; }
  .content hr { margin-bottom: 20px; }
  .content p  { margin-top: 10px; margin-bottom: 10px; }
  .content ul { margin-left: 25px; }
  .content ol { margin-left: 25px; }
</style>
