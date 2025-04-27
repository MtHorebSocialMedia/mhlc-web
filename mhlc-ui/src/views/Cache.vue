<template>
  <v-container class="cache">
      <h2>
        <v-icon>mdi-image-filter-hdr-outline</v-icon>
        Content Cache
      </h2>
      <hr />
      <v-dialog max-width="500">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            prepend-icon="mdi-trash-can-outline"
            text="Clear Content Cache"
          ></v-btn>
        </template>

        <template v-slot:default="{ isActive }">
          <v-card title="Dialog">
            <v-card-text>
              Are you sure you want to clear the content cache?
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                text="Cancel"
                @click="isActive.value = false"
              ></v-btn>
              <v-btn
                text="Yes"
                @click="isActive.value = false"
              ></v-btn>
            </v-card-actions>
          </v-card>
        </template>
</v-dialog>
  </v-container>
</template>

<script setup>
  import TrafficSummary from '@/components/TrafficSummary.vue'
</script>

<style scoped>
  .v-container.cache h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.cache hr { margin-bottom: 20px; }
</style>