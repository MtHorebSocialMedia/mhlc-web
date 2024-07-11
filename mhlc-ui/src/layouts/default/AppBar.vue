<template>
  <v-container class="header">
    <v-row>
      <v-col cols="4">
        <img src="/logo193x185.png" />
        <br />
        {{ churchInfo.slogan }}
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="8">
        <v-container>
          <v-row>
            <v-col class="social">
              <v-btn icon>
                <v-icon color="#4267B2">mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="#833AB4">mdi-instagram</v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon color="red">mdi-youtube</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="contact">
              <span v-if="smAndUp">
                  {{ churchInfo.streetAddress }}<br />
                  {{ churchInfo.city }}, {{ churchInfo.state}} {{ churchInfo.zipCode }}<br />
                  {{ churchInfo.phoneNumber }}
              </span>
              <span v-else>
                <v-btn icon>
                  <v-icon>mdi-map-marker</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-phone</v-icon>
                </v-btn>
              </span>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="menu">
              <Menu />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
    import Menu from './Menu.vue'
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { useDisplay } from 'vuetify'

    const contentStore = useContentStore();
    const { churchInfo, menuItems } = storeToRefs(contentStore);
    const { lgAndUp, smAndUp } = useDisplay()

</script>
<style>
.v-toolbar__extension {  padding-left: 16px; padding-right: 10px; }
.v-toolbar-title.v-app-bar-title { font-weight: bold; font-size: 25px; }
.v-list-item .v-btn--variant-elevated, .v-list-item .v-btn--elevated:hover, .v-list-item .v-btn--elevated:focus {
    box-shadow: none;
}
/* header.v-toolbar.v-app-bar { background-image: url("/logo193x185.png"); background-repeat: no-repeat; height: 225px; } */
.v-col.menu { text-align: right; }
.v-col.contact { text-align: right; }
.v-col.social { text-align: right; }
.v-container.header { padding-top: 4px; padding-bottom: 4px; }
</style>