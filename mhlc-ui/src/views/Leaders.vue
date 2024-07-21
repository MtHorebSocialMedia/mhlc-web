<template>
    <v-container class="leaders">
        <h2>Our Leaders</h2>
        <hr />
        <h3>Staff</h3>
        <StaffList />
        <br />
        <h3>Church Council</h3>
        <CouncilList />
    </v-container>
</template>

<script setup>
  import StaffList from '@/components/StaffList.vue'
  import CouncilList from '@/components/CouncilList.vue'
</script>

<style scoped>
  .v-container.leaders h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.leaders hr { margin-bottom: 20px; }
</style>
