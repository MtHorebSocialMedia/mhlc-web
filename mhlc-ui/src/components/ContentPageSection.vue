<template>
      <v-row>
        <v-col>
          <img
            v-if="section.image && section.imageAlignment !== 'bottom'"
            :src="section.image.url"
            :width="getAssetWidth(section.image.details.image.width, section.image.details.image.height)"
            :height="getAssetHeight(section.image.details.image.width, section.image.details.image.height)"
            :style="getImageAlignmentStyle(section.imageAlignment)"
            alt="Section Image"
          />
          <RichContentRenderer :content="section.content" />
          <img
            v-if="section.image && section.imageAlignment === 'bottom'"
            :src="section.image.url"
            :width="getAssetWidth(section.image.details.image.width, section.image.details.image.height)"
            :height="getAssetHeight(section.image.details.image.width, section.image.details.image.height)"
            :style="getImageAlignmentStyle(section.imageAlignment)"
            alt="Section Image"
          />
        </v-col>
      </v-row>
  </template>

  <script setup>
    import RichContentRenderer from '@/components/RichContentRenderer.vue'
    import { getAssetWidth, getAssetHeight } from '../utils/assetUtils';

    const props = defineProps({
        section: { type: Object, required: true }
    });

    function getImageAlignmentStyle(imageAlignment) {
        switch(imageAlignment) {
            case 'top':
            case 'bottom':
                return 'text-alignment: center;';
            case 'left':
                return 'float: left;';
            case 'right':
                return 'float: right;';
            default:
                return '';
        }
    }
  </script>
