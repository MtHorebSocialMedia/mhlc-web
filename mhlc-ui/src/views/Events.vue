<template>
  <v-container class="events">
    <h2>
      <v-icon>mdi-image-filter-hdr-outline</v-icon>
      Happenings at the Mount - Upcoming Events
    </h2>
    <hr>
    <v-alert>
      <ContentBlock content-block-key="events/header" />
    </v-alert>
    <EventsList />
  </v-container>
</template>

<script setup>
  import EventsList from '@/components/EventsList.vue'
  import ContentBlock from '@/components/ContentBlock.vue'
</script>

<style scoped>
.v-container.events h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.events hr { margin-bottom: 20px; }
</style>
