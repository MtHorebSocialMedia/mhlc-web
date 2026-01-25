<template>
  <v-container v-if="council">
    <v-row
      v-for="(member, index) in councilList"
      :key="index"
    >
      <v-col>
        <v-card
          elevation="4"
          class="council-member"
        >
          <v-card-item>
            <v-card-title>{{ member.name }}</v-card-title>
            <v-card-subtitle>{{ member.role }}</v-card-subtitle>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { computed } from 'vue';

    const contentStore = useContentStore();
    const { council } = storeToRefs(contentStore);
    const councilList = computed(() => {
        const councilMembers = council.value
        councilMembers.sort((a, b) => {
            if (a.sequence === undefined) {
                a.sequence = 999;
            }
            if (b.sequence === undefined) {
                b.sequence = 999;
            }
            return a.sequence - b.sequence;
        });
        return councilMembers
    });
</script>

<style scoped>
.v-card-title { font-size: 1rem; }
</style>
