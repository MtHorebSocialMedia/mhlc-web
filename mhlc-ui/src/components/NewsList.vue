<template>
    <v-container>
        <!--v-row v-if="!props.recent">
            <v-col
                v-for="type in newsTypes"
                :key="type.id"
            >
                <v-checkbox
                    v-model="ex4"
                    color="red"
                    :label="type.type"
                    :value="type.id"
                ></v-checkbox>
            </v-col>
            <v-col>
                <v-btn prepend-icon="mdi-filter">
                    Filter
                </v-btn>
            </v-col>
        </v-row-->
        <v-row v-if="!props.recent">
            <v-col class="page-count">
                <v-icon
                    :disabled="newsResults.page <= 1"
                    class="prev-page"
                    @click="prevPage()"
                >
                    mdi-arrow-left-circle-outline
                </v-icon>
                <v-chip>
                    Page {{ newsResults.page }} of {{ newsResults.totalPages }}
                </v-chip>
                <v-icon
                    :disabled="newsResults.page >= newsResults.totalPages"
                    class="next-page"
                    @click="nextPage()"
                >
                    mdi-arrow-right-circle-outline
                </v-icon>
            </v-col>
        </v-row>
        <v-row
            v-for="item in newsResults.news"
            v-bind:key="item.id"
        >
            <v-col>
                <v-card class="mx-auto" elevation="4">
                    <v-card-item :class="getCardItemClass()">
                        <v-card-title class="news-title">
                            <v-icon v-if="props.recent" size="small">mdi-post-outline</v-icon>
                            <a href="javascript:void(0)" @click="openFullDetailsDialog(item.id)">{{ item.title }}</a>
                        </v-card-title>
                        <v-card-subtitle class="news-subtitle">
                            <v-container>
                                <v-row v-if="!xs">
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
                                <v-row v-else>
                                    <v-col class="news-date-and-type">
                                        <div>{{ formatDateTime(item.datetime) }}</div>
                                        <div>
                                            <v-chip
                                                v-for="type in item.type"
                                                v-bind:key="type.id"
                                            >
                                                {{ type.type }}
                                            </v-chip>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-subtitle>
                        <template v-if="!props.recent" v-slot:prepend>
                            <v-icon>mdi-post-outline</v-icon>
                        </template>
                        <template v-if="!props.recent" v-slot:append>
                            <router-link :to="'/news/'+item.id">
                                <v-icon size="small">mdi-open-in-new</v-icon>
                            </router-link>
                        </template>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="!props.recent">
            <v-col class="page-count">
                <v-icon
                    :disabled="newsResults.page <= 1"
                    class="prev-page"
                    @click="prevPage()"
                >
                    mdi-arrow-left-circle-outline
                </v-icon>
                <v-chip>
                    Page {{ newsResults.page }} of {{ newsResults.totalPages }}
                </v-chip>
                <v-icon
                    :disabled="newsResults.page >= newsResults.totalPages"
                    class="next-page"
                    @click="nextPage()"
                >
                    mdi-arrow-right-circle-outline
                </v-icon>
            </v-col>
        </v-row>
    </v-container>
    <v-dialog
      v-model="showFullDetails"
      width="auto"
    >
        <v-card :width="getAssetWidth(800)">
            <v-card-title class="news-title">
                <v-icon size="small">mdi-newspaper-variant-outline</v-icon>
                {{ fullDetailsToShow.title }}
                <hr />
            </v-card-title>
            <v-card-subtitle class="news-subtitle">
                <v-container>
                    <v-row>
                        <v-col class="news-date">
                            <span>{{ formatDateTime(fullDetailsToShow.datetime) }}</span>
                        </v-col>
                        <v-col class="news-type">
                            <v-chip
                                v-for="type in fullDetailsToShow.type"
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
                        <RichContentRenderer :content="fullDetailsToShow.description" />
                    </v-col>
                </v-row>
                <v-row v-if="fullDetailsToShow.image">
                    <v-col class="news-image">
                        <img
                            :src="fullDetailsToShow.image.url"
                            :width="getAssetWidth(fullDetailsToShow.image.details.image.width, fullDetailsToShow.image.details.image.height)"
                            :height="getAssetHeight(fullDetailsToShow.image.details.image.width, fullDetailsToShow.image.details.image.height)"
                            alt="Content Block Image"
                        />
                    </v-col>
                </v-row>
                <v-row v-if="fullDetailsToShow.attachments && fullDetailsToShow.attachments.length > 0">
                    <v-col>
                        <v-card>
                            <v-card-title>Attachments</v-card-title>
                            <v-list>
                                <v-list-item
                                    v-for="attachment in fullDetailsToShow.attachments"
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
            <template v-slot:actions>
                <v-btn
                    class="ms-auto"
                    text="Close"
                    @click="showFullDetails = false"
                ></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import RichContentRenderer from './RichContentRenderer.vue';
    import { getAssetWidth } from '../utils/assetUtils';
    import { ref, watch } from 'vue';
    import { useDisplay } from 'vuetify';

    const { xs } = useDisplay();

    const props = defineProps({
        recent: { type: Boolean, required: false, default: false }
    });

    const contentStore = useContentStore();
    const { recentNews, newsTypes } = storeToRefs(contentStore);

    const newsResults = ref({});
    const currentPage = ref(0);
    const showFullDetails = ref(false);
    const fullDetailsToShow = ref(null);

    if (!props.recent) {
        nextPage();
    } else {
        setRecentNews();
        watch(recentNews, () => {
            setRecentNews();
        });
    }

    function getCardItemClass() {
        return !props.recent ? 'news-card-item full-news' : 'news-card-item recent-news';
    }

    function setRecentNews() {
        newsResults.value = recentNews.value;
        if (newsResults.value && newsResults.value.news) {
            // truncate to only 5 entries
            newsResults.value.news.length = 5;
        }
    }

    async function nextPage() {
        currentPage.value = currentPage.value + 1;
        newsResults.value = await contentStore.getNews(currentPage.value);
    }

    async function prevPage() {
        currentPage.value = currentPage.value - 1;
        newsResults.value = await contentStore.getNews(currentPage.value);
    }

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

    function openFullDetailsDialog(newsId) {
        fullDetailsToShow.value = newsResults.value.news.find(({ id }) => id === newsId);
        showFullDetails.value = true;
    }
</script>

<style>
.news-item { padding-left: 0px; }
.news-title { font-size: 16px; }
.news-title .v-icon { margin-right: 10px; }
.news-subtitle .v-container { padding-top: 10px; padding-left: 5px; padding-right: 5px; }
.news-subtitle .v-col { padding: 10px; }
.news-subtitle .news-type { text-align: right; }
.news-subtitle .news-type .v-chip { margin-left: 4px; }
.news-subtitle .news-date-and-type { text-align: center; }
.news-subtitle .news-date-and-type .v-chip { margin-left: 2px; margin-right: 2px; }
.news-image { text-align: center }
.news-navigation { text-align: right; }
.v-col.previous { text-align: left; }
.v-col.page-count { text-align: center; }
.v-col.next { text-align: right; }
.v-icon.prev-page { margin-right: 10px; }
.v-icon.next-page { margin-left: 10px; }
.news-card-item.full-news .v-card-item__content { border-left: 1px solid #CCC; border-right: 1px solid #CCC; padding: 5px; }
</style>