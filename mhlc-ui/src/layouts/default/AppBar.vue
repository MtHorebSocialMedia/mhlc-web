<template>
  <v-app-bar flat>
    <v-app-bar-title>
      Mt. Horeb Lutheran Church
    </v-app-bar-title>
    <v-spacer></v-spacer>
101 East Boundary Street | Chapin, South Carolina 29036 | 803.345.2000
        <v-btn icon>
          <v-icon>mdi-facebook</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-instagram</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-youtube</v-icon>
        </v-btn>
    <template v-slot:extension>
      Experiencing &amp; Sharing God's Presence
      <v-spacer />
      <v-menu
        v-for="(item) in menuItems"
        v-bind:key="item.id"
        open-on-hover
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
            text
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
              <router-link :to="child.path">
                {{ child.label }}
              </router-link>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';

    const contentStore = useContentStore();
    const { menuItems } = storeToRefs(contentStore);

</script>
<style>
.v-toolbar__extension {  padding-left: 16px; padding-right: 10px; }
</style>