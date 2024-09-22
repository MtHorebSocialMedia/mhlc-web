<template>
    <v-card width="800" v-if="newsEntry">
        <v-card-title class="news-title">
            <v-icon size="small">mdi-newspaper-variant-outline</v-icon>
            {{ newsEntry.title }}
            <hr />
        </v-card-title>
        <v-card-subtitle class="news-subtitle">
            <v-container>
                <v-row>
                    <v-col class="news-date">
                        <span>{{ formatDateTime(newsEntry.datetime) }}</span>
                    </v-col>
                    <v-col class="news-type">
                        <v-chip
                            v-for="type in newsEntry.type"
                            v-bind:key="type.id"
                        >
                            {{ type.type }}
                        </v-chip>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-subtitle>
        <v-container>
            <v-row>
                <v-col>
                    <RichContentRenderer :content="newsEntry.description" />
                </v-col>
            </v-row>
            <v-row v-if="newsEntry.image">
                <v-col class="news-image">
                    <img
                        :src="newsEntry.image.url"
                        :width="getAssetWidth(newsEntry.image.details.image.width, newsEntry.image.details.image.height)"
                        :height="getAssetHeight(newsEntry.image.details.image.width, newsEntry.image.details.image.height)"
                        alt="Content Block Image"
                    />
                </v-col>
            </v-row>
            <v-row v-if="newsEntry.attachments && newsEntry.attachments.length > 0">
                <v-col>
                    <v-card>
                        <v-card-title>Attachments</v-card-title>
                        <v-list>
                            <v-list-item
                                v-for="attachment in newsEntry.attachments"
                                :key="attachment.id"
                            >
                                <v-list-item-title>{{ attachment.title }}</v-list-item-title>
                                <v-list-item-subtitle><a :href="attachment.file.url" target="_blank">{{ attachment.file.fileName }}</a></v-list-item-subtitle>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import RichContentRenderer from './RichContentRenderer.vue';
    import { ref } from 'vue';
    import router from '../router';

    const newsEntry = ref(null);

    async function loadNewsEntry(newsId) {
        newsEntry.value = await useContentStore().getNewsEntry(newsId);
    }

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

    const path = router.currentRoute.value.path;
    const [,,newsId] = path.split('/');
    loadNewsEntry(newsId);

</script>

<style>
.blog-title .v-icon { margin-right: 10px; }
.blog-subtitle .v-container { padding: 0px; }
.blog-subtitle .v-col { padding: 10px; }
.blog-subtitle .blog-publish-date { text-align: right; }
</style>