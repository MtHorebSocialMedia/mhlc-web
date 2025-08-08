<template>
    <v-container class="newsletter-signup">
        <h2>
          <v-icon>mdi-image-filter-hdr-outline</v-icon>
          Join the Weekly e-News
        </h2>
        <hr />
        <NewsletterSignupForm />
      </v-container>
</template>

<script setup>
  import NewsletterSignupForm from '@/components/NewsletterSignupForm.vue'
</script>

<style scoped>
  .v-container.newsletter-signup h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.newsletter-signup hr { margin-bottom: 20px; }
</style>
