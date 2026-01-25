<template>
  <v-container class="event-entry">
    <v-row>
      <v-col cols="9">
        <h2>
          <v-icon>mdi-image-filter-hdr-outline</v-icon>
          Happenings at the Mount - Events
        </h2>
      </v-col>
      <v-col
        cols="3"
        class="navigation"
      >
        <router-link to="/events">
          View All Events
        </router-link>
      </v-col>
    </v-row>
    <hr>
    <v-row>
      <v-col>
        <Event />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import Event from '@/components/Event.vue'
</script>

<style scoped>
.v-container.event-entry h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.event-entry hr { margin-bottom: 20px; }
.v-container.event-entry .navigation { text-align: right; }
</style>
