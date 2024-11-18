<template>
    <v-container class="login">
        <h2>
          <v-icon>mdi-image-filter-hdr-outline</v-icon>
          Admin Login
        </h2>
        <hr />
        <LoginForm />
      </v-container>
</template>

<script setup>
  import LoginForm from '@/components/LoginForm.vue'
</script>

<style scoped>
  .v-container.login h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.login hr { margin-bottom: 20px; }
</style>
