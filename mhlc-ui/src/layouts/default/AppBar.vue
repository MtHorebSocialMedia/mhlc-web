<template>
  <v-container class="header">
    <v-row>
      <v-col cols="3">
        <img
          :width="xs ? 135 : 193"
          :height="xs ? 130 : 185"
          src="/logo193x185.png"
        />
        <br />
        {{ churchInfo.slogan }}
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="9">
        <v-container>
          <v-row>
            <v-col class="social">
              <v-btn icon @click="openFacebook">
                <v-icon color="#4267B2">mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon @click="openInstagram">
                <v-icon color="#833AB4">mdi-instagram</v-icon>
              </v-btn>
              <v-btn icon @click="openYouTube">
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
                <v-btn icon @click="showAddress = true">
                  <v-icon color="blue">mdi-map-marker</v-icon>
                </v-btn>
                <v-btn icon @click="showPhone = true">
                  <v-icon color="green">mdi-phone</v-icon>
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
  <v-dialog
    v-model="showAddress"
    width="auto"
  >
      <v-card>
          <v-card-title>
              <v-icon color="blue">mdi-map-marker</v-icon>
              Address
              <hr />
          </v-card-title>
          <v-container>
            <v-row>
              <v-col>
                {{ churchInfo.streetAddress }}<br />
                {{ churchInfo.city }}, {{ churchInfo.state}} {{ churchInfo.zipCode }}
              </v-col>
            </v-row>
          </v-container>
          <template v-slot:actions>
              <v-btn
                  class="ms-auto"
                  text="Close"
                  @click="showAddress = false"
              ></v-btn>
          </template>
      </v-card>
  </v-dialog>
  <v-dialog
    v-model="showPhone"
    width="auto"
  >
      <v-card>
          <v-card-title>
              <v-icon color="green">mdi-phone</v-icon>
              Phone
              <hr />
          </v-card-title>
          <v-container>
            <v-row>
              <v-col>
                {{ churchInfo.phoneNumber }}
              </v-col>
            </v-row>
          </v-container>
          <template v-slot:actions>
              <v-btn
                  class="ms-auto"
                  text="Close"
                  @click="showPhone = false"
              ></v-btn>
          </template>
      </v-card>
  </v-dialog>
</template>

<script setup>
    import Menu from '../../components/Menu.vue'
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { useDisplay } from 'vuetify'
    import { ref } from 'vue';

    const contentStore = useContentStore();
    const { churchInfo, menuItems } = storeToRefs(contentStore);
    const { lgAndUp, smAndUp, xs } = useDisplay()
    const showAddress = ref(false);
    const showPhone = ref(false);

    function openFacebook () {
      window.open(churchInfo.value.facebook, '_blank');
    }
    function openInstagram() {
      window.open(churchInfo.value.instagram, '_blank');
    }
    function openYouTube () {
      window.open(churchInfo.value.youTube, '_blank');
    }

</script>
<style>
.v-toolbar__extension {  padding-left: 16px; padding-right: 10px; }
.v-toolbar-title.v-app-bar-title { font-weight: bold; font-size: 25px; }
.v-list-item .v-btn--variant-elevated, .v-list-item .v-btn--elevated:hover, .v-list-item .v-btn--elevated:focus {
    box-shadow: none;
}
.v-col.menu { text-align: right; }
.v-col.contact { text-align: right; }
.v-col.social { text-align: right; }
.v-container.header { padding-top: 4px; padding-bottom: 4px; }
.header .v-btn--icon { margin-left: 5px; }
</style>
