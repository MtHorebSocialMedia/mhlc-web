<template>
  <v-container class="video-list">
      <h2>Live Streams</h2>
      <hr />
      <v-row>
            <v-col>
                <v-alert>
                    Choose a recent live stream below to view or visit our
                    <v-icon color="red">mdi-youtube</v-icon>
                    <a :href="churchInfo.youTube" target="_blank">YouTube Channel</a>
                    to see the full list of videos!
                </v-alert>
            </v-col>
      </v-row>
      <v-row v-if="videoList && videoList.length > 0">
          <v-col>
              <VideoCard :video="videoList[0]" />
          </v-col>
      </v-row>
      <v-row v-if="videoList && videoList.length > 2">
          <v-col cols="7">
              <VideoCard :video="videoList[1]" />
          </v-col>
          <v-col cols="5">
              <VideoCard :video="videoList[2]" />
          </v-col>
      </v-row>
      <v-row v-if="videoList && videoList.length > 4">
          <v-col cols="5">
              <VideoCard :video="videoList[3]" />
          </v-col>
          <v-col cols="7">
              <VideoCard :video="videoList[4]" />
          </v-col>
      </v-row>
  </v-container>
</template>

<script setup>
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';
  import VideoCard from '@/components/VideoCard.vue'
  const contentStore = useContentStore();
  const { videoList, churchInfo } = storeToRefs(contentStore);
</script>

<style scoped>
.v-container.video-list h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.video-list hr { margin-bottom: 20px; }
</style>
