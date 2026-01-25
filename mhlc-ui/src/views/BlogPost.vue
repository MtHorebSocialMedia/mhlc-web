<template>
  <v-container class="blog-post">
    <v-row>
      <v-col cols="9">
        <h2>
          <v-icon>mdi-image-filter-hdr-outline</v-icon>
          Musings from the Mount - Blog Post
        </h2>
      </v-col>
      <v-col
        cols="3"
        class="navigation"
      >
        <router-link to="/blog-posts">
          View All Blogs
        </router-link>
      </v-col>
    </v-row>
    <hr>
    <v-row>
      <v-col>
        <Blog />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import Blog from '@/components/Blog.vue'
</script>

<style scoped>
.v-container.blog-post h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.blog-post hr { margin-bottom: 20px; }
.v-container.blog-post .navigation { text-align: right; }
</style>
