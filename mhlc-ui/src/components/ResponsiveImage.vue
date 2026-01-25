<template>
  <img
    ref="image"
    :src="props.src"
    :style="getImageStyle()"
    :alt="props.alt"
    :class="getImageClass()"
    @click="imageClicked()"
  >
</template>

<script setup>
    import { getAssetSizeStyle } from '../utils/assetUtils';
    import { useTemplateRef } from 'vue';

    const props = defineProps({
        src: { type: String, required: true },
        alt: { type: String, required: true },
        maxWidth: { type: Number, required: true },
        maxHeight: { type: Number, required: true },
        align: { type: String, required: false, default: 'center' },
        link: { type: String, required: false, default: null }
    });

    const image = useTemplateRef('image');

    function getImageClass() {
        return [
            'responsive-image',
            props.align,
            props.link ? 'link' : null
        ].join(' ');
    }

    function getImageStyle() {
        return getAssetSizeStyle(
            props.maxWidth,
            props.maxHeight,
            image.value ? image.value.parentElement : null,
            // If we're floating an image left or right, never take up more than 50% of the parent
            ['left', 'right'].includes(props.align) ? 0.5 : null
        );
    }

    function imageClicked() {
      if (props.link) {
          window.open(props.link);
      }
  }

</script>

<style scoped>
img.responsive-image { border-radius: 25px; }
img.responsive-image.center, img.responsive-image.top, img.responsive-image.bottom { display: block; margin-left: auto; margin-right: auto }
img.responsive-image.left { float: left; padding-right: 20px; padding-bottom: 10px; }
img.responsive-image.right { float: right; padding-left: 20px; padding-bottom: 10px; }
img.responsive-image.link { cursor: pointer; }
</style>
