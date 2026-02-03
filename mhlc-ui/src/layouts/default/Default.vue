<template>
  <v-app>
    <app-bar />
    <v-main>
      <v-container class="main-container fill-height">
        <v-row class="justify-center fill-height">
          <v-col :class="getMainViewClass()">
            <router-view />
          </v-col>
          <v-col
            v-if="lgAndUp"
            cols="3"
            class="side-view"
          >
            <side-bar />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer :class="name">
      <RichContentRenderer
        v-if="churchInfo.footer"
        :content="churchInfo.footer"
      />
    </v-footer>
  </v-app>
</template>

<script setup>
  import AppBar from './AppBar.vue'
  import SideBar from './SideBar.vue'
  import RichContentRenderer from '@/components/RichContentRenderer.vue'
  import { useContentStore } from '@/store/content';
  import { storeToRefs } from 'pinia';
  import { useDisplay } from 'vuetify'

  const contentStore = useContentStore();
  const { churchInfo } = storeToRefs(contentStore);
  const { lgAndUp, name, width: deviceWidth } = useDisplay();

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
    .v-container.main-container > .v-row > .v-col.main-view { max-width: 900px; }
    .v-container.main-container > .v-row > .v-col.main-view.xxs { max-width: 375px; }
    .v-container.main-container > .v-row > .v-col.main-view.xs { max-width: 425px; }
    .v-container.main-container > .v-row > .v-col.main-view.sm { max-width: 570px; }
    .v-container.main-container > .v-row > .v-col.main-view.md { max-width: 850px; }
    .v-container.main-container > .v-row > .v-col.side-view { margin-left: 20px; }
    .v-footer { background-color: #CCC !important; border-top: 1px solid #666 !important; }
    .v-footer.xl { max-height: 60px; }
    .v-footer.lg { max-height: 60px; }
    .v-footer.md { max-height: 80px; }
    .v-footer.sm { max-height: 100px; }
    .v-footer.xs { max-height: 160px; }
    .v-footer .content { width: 100%; font-size: 13px; text-align: center; }
</style>
