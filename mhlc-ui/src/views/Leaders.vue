<template>
    <v-container class="leaders">
        <h2>
          <v-icon>mdi-image-filter-hdr-outline</v-icon>
          Our Leaders
        </h2>
        <hr />
        <h3>Staff</h3>
        <StaffList />
        <br />
        <h3>Church Council</h3>
        <ContentBlock contentBlockKey="leaders/council" />
        <CouncilList />
    </v-container>
</template>

<script setup>
  import StaffList from '@/components/StaffList.vue'
  import CouncilList from '@/components/CouncilList.vue'
  import ContentBlock from '@/components/ContentBlock.vue'
</script>

<style scoped>
  .v-container.leaders h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.leaders hr { margin-bottom: 20px; }
</style>
