<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container class="main-container fill-height">
        <v-row class="justify-center fill-height">
          <v-col class="admin-main-container">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer :class="name">
      {{ churchInfo.footer }}
    </v-footer>
  </v-app>
</template>

<script setup>
  import AppBar from './AppBar.vue'
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';
  import { useDisplay } from 'vuetify'

  const contentStore = useContentStore();
  const { churchInfo } = storeToRefs(contentStore);
  const { name, width: deviceWidth } = useDisplay();

  function getMainViewClass() {
      if (deviceWidth.value > 450) {
        return `main-view ${name.value}`;
      } else {
        return `main-view xxs`
      }
  }

</script>

<style>
    .v-main { background-image: linear-gradient(#999, #DDD); }
    .v-container.main-container > .v-row > .v-col { background: #FFF; }
    .v-container.main-container > .v-row > .v-col.admin-main-view { max-width: 1000px; }
    .v-container.main-container > .v-row > .v-col.admin-main-view.xxs { max-width: 375px; }
    .v-container.main-container > .v-row > .v-col.admin-main-view.xs { max-width: 425px; }
    .v-container.main-container > .v-row > .v-col.admin-main-view.sm { max-width: 570px; }
    .v-container.main-container > .v-row > .v-col.admin-main-view.md { max-width: 850px; }
    .v-footer { background-color: #CCC !important; border-top: 1px solid #666 !important; }
    .v-footer.lg { max-height: 40px; }
    .v-footer.md { max-height: 80px; }
    .v-footer.sm { max-height: 100px; }
    .v-footer.xs { max-height: 160px; }
</style>
