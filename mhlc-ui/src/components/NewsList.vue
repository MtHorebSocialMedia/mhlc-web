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
            <v-col class="previous">
                <v-btn :disabled="newsResults.page <= 1" @click="prevPage()">
                    <v-icon>mdi-arrow-left-circle-outline</v-icon>
                    Previous
                </v-btn>
            </v-col>
            <v-col class="page-count">
                <v-chip>
                    Page {{ newsResults.page }} of {{ newsResults.totalPages }}
                </v-chip>
            </v-col>
            <v-col class="next">
                <v-btn :disabled="newsResults.page >= newsResults.totalPages" @click="nextPage()">
                    Next
                    <v-icon>mdi-arrow-right-circle-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            v-for="item in newsResults.news"
            v-bind:key="item.id"
        >
            <v-col>
                <v-card class="mx-auto">
                    <v-card-title class="news-title">
                        <v-icon size="small">mdi-newspaper-variant-outline</v-icon>
                        <a href="javascript:void(0)" @click="openFullDetailsDialog(item.id)">{{ item.title }}</a>
                    </v-card-title>
                    <v-card-subtitle class="news-subtitle">
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
                    <br />
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="!props.recent">
            <v-col class="previous">
                <v-btn :disabled="newsResults.page <= 1" @click="prevPage()">
                    <v-icon>mdi-arrow-left-circle-outline</v-icon>
                    Previous
                </v-btn>
            </v-col>
            <v-col class="page-count">
                <v-chip>
                    Page {{ newsResults.page }} of {{ newsResults.totalPages }}
                </v-chip>
            </v-col>
            <v-col class="next">
                <v-btn :disabled="newsResults.page >= newsResults.totalPages" @click="nextPage()">
                    Next
                    <v-icon>mdi-arrow-right-circle-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
    <v-dialog
      v-model="showFullDetails"
      width="auto"
    >
        <v-card width="800">
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
    import { ref, watch } from 'vue';

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
.news-title .v-icon { margin-right: 10px; }
.news-subtitle .v-container { padding: 0px; }
.news-subtitle .v-col { padding: 10px; }
.news-subtitle .news-type { text-align: right; }
.news-subtitle .news-type .v-chip { margin-left: 5px; }
.v-col.previous { text-align: left; }
.v-col.page-count { text-align: center; }
.v-col.next { text-align: right; }
</style>