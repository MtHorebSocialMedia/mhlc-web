<template>
  <v-app-bar flat>
    <v-app-bar-title>
      Mt. Horeb Lutheran Church
    </v-app-bar-title>
    <v-spacer></v-spacer>
        {{ churchInfo.streetAddress }} | {{ churchInfo.city }}, {{ churchInfo.state}} {{ churchInfo.zipCode }} | {{ churchInfo.phoneNumber }}
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
      {{ churchInfo.slogan }}
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
            :to="item.path"
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
    </template>
  </v-app-bar>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';

    const contentStore = useContentStore();
    const { churchInfo, menuItems } = storeToRefs(contentStore);

</script>
<style>
.v-toolbar__extension {  padding-left: 16px; padding-right: 10px; }
</style>