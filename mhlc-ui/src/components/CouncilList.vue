<template>
    <v-container v-if="council">
        <v-list>
            <v-list-item
                v-for="member in councilList"
                :key="member.id"
            >
                <v-list-item-title>{{ member.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ member.role }}</v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { computed } from 'vue';

    const contentStore = useContentStore();
    const { council } = storeToRefs(contentStore);
    const councilList = computed(() => {
        council.value.sort((a, b) => {
            if (a.sequence === undefined) {
                a.sequence = 999;
            }
            if (b.sequence === undefined) {
                b.sequence = 999;
            }
            return a.sequence - b.sequence;
        });
        return council.value;
    });
</script>

<style>
.v-card-subtitle .v-container { padding: 0px; }
.v-card-subtitle .v-col { padding: 10px; }
.v-card-subtitle .news-type { text-align: right; }
.v-img { margin-bottom: 20px; }
</style>
