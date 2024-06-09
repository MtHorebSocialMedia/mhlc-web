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
                <v-icon>mdi-facebook</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-instagram</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-youtube</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="contact">
              {{ churchInfo.streetAddress }}<br />{{ churchInfo.city }}, {{ churchInfo.state}} {{ churchInfo.zipCode }}<br />{{ churchInfo.phoneNumber }}
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="lgAndUp" class="menu">
              <v-menu
                v-for="(item) in menuItems"
                v-bind:key="item.id"
                open-on-hover
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    :to="item.path"
                    variant="text"
                  >
                    {{ item.label }}
                  </v-btn>
                </template>

                <v-list v-if="item.children.length > 0">
                  <v-list-item
                    v-for="(child) in item.children"
                    :key="child.id"
                  >
                    <v-list-item-title>
                      <v-btn
                        :to="child.path"
                        plain
                      >
                        {{ child.label }}
                      </v-btn>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            <v-col v-else class="menu">
              <v-btn icon>
                <v-icon>mdi-menu</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { useDisplay } from 'vuetify'

    const contentStore = useContentStore();
    const { churchInfo, menuItems } = storeToRefs(contentStore);
    const { lgAndUp } = useDisplay()

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