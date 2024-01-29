<template>
    <v-container>
        <v-row
            v-for="item in news"
            v-bind:key="item.id"
        >
            <v-col>
                <v-card class="mx-auto">
                    <v-card-title>{{ item.title }}</v-card-title>
                    <v-card-subtitle>
                        <v-container>
                            <v-row>
                                <v-col class="news-date">
                                    <span>{{ formatDateTime(item.datetime) }}</span>
                                </v-col>
                                <v-col class="news-type">
                                    <v-chip
                                        v-for="type in item.type"
                                        v-bind:key="type.id"
                                    >
                                        {{ type.type }}
                                    </v-chip>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-subtitle>
                    <v-card-text>
                        <RichTextRenderer :document="item.description" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import RichTextRenderer from 'contentful-rich-text-vue-renderer';
    const contentStore = useContentStore();
    const { news } = storeToRefs(contentStore);
    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }
</script>

<style>
.v-card-subtitle .v-container { padding: 0px; }
.v-card-subtitle .v-col { padding: 10px; }
.v-card-subtitle .news-type { text-align: right; }
</style>