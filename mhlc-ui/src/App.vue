<template>
  <router-view />
  <v-overlay
      :model-value="showLoading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
</template>

<script setup>

    import { getStores } from '@/store';
    import { ref } from 'vue';
    import { useContentStore } from '@/store/content';
    import router from '@/router';

    // Show/hide loading animation on router navigation
    router.beforeEach(() => {
      showLoading.value = true;
    });
    router.afterEach(() => {
      showLoading.value = false;
    });

    // Show/hide loading animation with every store action
    const showLoading = ref(false);
    getStores().forEach((store) => {
      store.$onAction(({ after, onError }) => {
        showLoading.value = true;
        after(() => {
          showLoading.value = false;
        });
        onError(() => {
          showLoading.value = false;
        });
      });
    });

    // initialize content
    useContentStore().fetchContent();
</script>
