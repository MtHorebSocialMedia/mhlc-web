<template>
    <v-container class="contact">
        <h2>Contact</h2>
        <hr />
        <ContactForm />
      </v-container>
</template>

<script setup>
  import ContactForm from '@/components/ContactForm.vue'
</script>

<style scoped>
  .v-container.contact h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.contact hr { margin-bottom: 20px; }
</style>
