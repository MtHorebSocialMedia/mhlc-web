<template>
  <v-container class="news-entry">
    <v-row>
      <v-col cols="9">
        <h2>
          <v-icon>mdi-image-filter-hdr-outline</v-icon>
          Happenings from the Mount - News
        </h2>
      </v-col>
      <v-col
        cols="3"
        class="navigation"
      >
        <router-link to="/news">
          View All News
        </router-link>
      </v-col>
    </v-row>
    <hr>
    <v-row>
      <v-col>
        <News />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import News from '@/components/News.vue'
</script>

<style scoped>
.v-container.news-entry h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.news-entry hr { margin-bottom: 20px; }
.v-container.news-entry .navigation { text-align: right; }
</style>
