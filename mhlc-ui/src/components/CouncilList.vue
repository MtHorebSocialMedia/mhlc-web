<template>
    <v-card v-if="council">
        <v-container>
            <v-row
                v-for="member in council"
                :key="member.id"
            >
                <v-col cols="2">{{ member.role }}</v-col>
                <v-col>{{ member.name }}</v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';

    const contentStore = useContentStore();
    const { council } = storeToRefs(contentStore);
</script>

<style>
.v-card-subtitle .v-container { padding: 0px; }
.v-card-subtitle .v-col { padding: 10px; }
.v-card-subtitle .news-type { text-align: right; }
.v-img { margin-bottom: 20px; }
</style>
