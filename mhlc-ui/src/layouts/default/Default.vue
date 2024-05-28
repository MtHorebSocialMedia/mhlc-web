<template>
  <v-app>
    <default-bar />
    <v-main>
      <v-container class="main-container fill-height">
        <v-row class="fill-height">
          <v-col class="main-view">
            <router-view />
          </v-col>
          <v-col cols="3" class="side-view">
            <side-bar />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import SideBar from './SideBar.vue'
</script>

<style>
    .v-main { background-image: linear-gradient(#999, #DDD); }
    .v-container.main-container > .v-row > .v-col { background: #FFF; }
    .v-container.main-container > .v-row > .v-col.side-view { margin-left: 20px; }
</style>
