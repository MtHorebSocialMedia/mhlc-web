<template>
    <v-card v-if="newsEntry" elevation="4">
        <v-card-item>
            <v-card-title class="news-title">
                <v-icon size="small">mdi-calendar-clock-outline</v-icon>
                {{ newsEntry.title }}
                <hr />
            </v-card-title>
            <v-card-subtitle class="news-subtitle">
                <v-container>
                    <v-row>
                        <v-col class="news-date">
                            <span>{{ formatDateTime(newsEntry.eventDatetime) }}</span>
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
                        <ResponsiveImage
                            :src="newsEntry.image.url"
                            alt="News Image"
                            :maxWidth="newsEntry.image.details.image.width"
                            :maxHeight="newsEntry.image.details.image.height"
                        />
                    </v-col>
                </v-row>
                <v-row v-if="newsEntry.videoUrl">
                    <v-col>
                        <EmbeddedVideo :videoId="newsEntry.videoId" />
                    </v-col>
                </v-row>
                <v-row v-if="newsEntry.attachments && newsEntry.attachments.length > 0">
                    <v-col>
                        <v-card>
                            <v-card-item>
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
                            </v-card-item>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-item>
    </v-card>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import EmbeddedVideo from './EmbeddedVideo.vue';
    import RichContentRenderer from './RichContentRenderer.vue';
    import { ref } from 'vue';
    import router from '../router';

    const newsEntry = ref(null);

    async function loadNewsEntry(newsId) {
        newsEntry.value = await useContentStore().getNewsEntry(newsId);
    }

    function formatDateTime(dateTime) {
        const [date, time ] = dateTime.split('T');
        const [ year, month, day ] = date.split('-');
        let [ hour, minute ] = time.split(':');
        let meridian = 'AM';
        const intHour = parseInt(hour);
        if (intHour > 12) {
            hour = `${intHour - 12}`;
            meridian = 'PM';
        }
        return `${month}/${day}/${year} ${hour.padStart(2, '0')}:${minute} ${meridian}`;
    }

    const path = router.currentRoute.value.path;
    const [,,newsId] = path.split('/');
    loadNewsEntry(newsId);

</script>

<style>
.news-title .v-icon { margin-right: 10px; }
.news-subtitle .v-container { padding-top: 10px; padding-left: 5px; padding-right: 5px; }
.news-subtitle .v-col { padding: 10px; }
.news-subtitle .blog-publish-date { text-align: right; }
</style>