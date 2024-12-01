<template>
    <v-container class="admin-home">
        <h2>
          <v-icon>mdi-image-filter-hdr-outline</v-icon>
          Admin Home
        </h2>
        <hr />
        <v-list>
          <v-list-item to="/analytics">
            <template v-slot:prepend>
              <v-icon>mdi-chart-line</v-icon>
            </template>
            <v-list-item-title>Analytics</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-container>
</template>

<script setup>

</script>

<style scoped>
  .v-container.admin-home h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.admin-home hr { margin-bottom: 20px; }
</style>
