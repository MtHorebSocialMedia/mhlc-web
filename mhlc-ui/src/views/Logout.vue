<template>
    <v-container class="logout">
        <h2>
          <v-icon>mdi-image-filter-hdr-outline</v-icon>
          Logging out...
        </h2>
        <hr />
      </v-container>
</template>

<script setup>
  import { useSecurityStore } from '@/store/security';
  import router from '../router';

  (async function () {
    const securityStore = useSecurityStore();
    await securityStore.logout();
    router.push('/login');
  })();

</script>

<style scoped>
  .v-container.logout h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.logout hr { margin-bottom: 20px; }
</style>
