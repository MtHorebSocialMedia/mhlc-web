<template>
    <v-container class="donate">
        <h2>Donate Online</h2>
        <hr />
        <DonationForm />
      </v-container>
</template>

<script setup>
  import DonationForm from '@/components/DonationForm.vue'
</script>

<style scoped>
  .v-container.donate h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.donate hr { margin-bottom: 20px; }
</style>
