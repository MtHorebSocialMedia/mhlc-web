<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container class="main-container fill-height">
        <v-row class="justify-center fill-height">
          <v-col class="main-view">
            <router-view />
          </v-col>
          <v-col v-if="lgAndUp" cols="3" class="side-view">
            <side-bar />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer>{{ churchInfo.footer }}</v-footer>
  </v-app>
</template>

<script setup>
  import AppBar from './AppBar.vue'
  import SideBar from './SideBar.vue'
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';
  import { useDisplay } from 'vuetify'

  const contentStore = useContentStore();
  const { churchInfo } = storeToRefs(contentStore);
  const { lgAndUp } = useDisplay()
</script>

<style>
    .v-main { background-image: linear-gradient(#999, #DDD); }
    .v-container.main-container > .v-row > .v-col { background: #FFF; }
    .v-container.main-container > .v-row > .v-col.main-view { max-width: 900px; }
    .v-container.main-container > .v-row > .v-col.side-view { margin-left: 20px; }
    .v-footer { background-color: #CCC !important; border-top: 1px solid #666 !important; max-height: 40px; }
</style>
