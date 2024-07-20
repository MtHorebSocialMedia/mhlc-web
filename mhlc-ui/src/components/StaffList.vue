<template>
    <v-card v-if="staff">
        <v-container>
            <v-row
                v-for="member in staff"
                :key="member.id"
            >
                <v-col cols="2">
                    <img
                        v-if="member.picture"
                        :src="member.picture.url"
                        :width="member.picture.details.image.width"
                        :height="member.picture.details.image.height"
                    />
                </v-col>
                <v-col cols="2">{{ member.title }}</v-col>
                <v-col>{{ member.name }}</v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';

    const contentStore = useContentStore();
    const { staff } = storeToRefs(contentStore);
</script>

<style>
.v-card-subtitle .v-container { padding: 0px; }
.v-card-subtitle .v-col { padding: 10px; }
.v-card-subtitle .news-type { text-align: right; }
.v-img { margin-bottom: 20px; }
</style>
