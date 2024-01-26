<template>
  <v-app>
    <default-bar />
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <router-view />
          </v-col>
          <v-col cols="3">
            <side-bar />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import DefaultBar from './AppBar.vue'
  import DefaultView from './View.vue'
  import SideBar from './SideBar.vue'
</script>
