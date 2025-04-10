<template>
    <v-container>
        <v-row v-if="!props.recent">
            <v-col class="page-count">
                <v-icon
                    :disabled="eventsResults.page <= 1"
                    class="prev-page"
                    @click="prevPage()"
                >
                    mdi-arrow-left-circle-outline
                </v-icon>
                <v-chip>
                    Page {{ eventsResults.page }} of {{ eventsResults.totalPages }}
                </v-chip>
                <v-icon
                    :disabled="eventsResults.page >= eventsResults.totalPages"
                    class="next-page"
                    @click="nextPage()"
                >
                    mdi-arrow-right-circle-outline
                </v-icon>
            </v-col>
        </v-row>
        <v-row
            v-for="item in eventsResults.events"
            v-bind:key="item.id"
        >
            <v-col>
                <v-card class="mx-auto" elevation="4">
                    <v-card-item :class="getCardItemClass()">
                        <v-card-title class="news-title">
                            <v-icon v-if="props.recent" size="small">mdi-calendar-clock-outline</v-icon>
                            <a href="javascript:void(0)" @click="openFullDetailsDialog(item.id)">{{ item.title }}</a>
                        </v-card-title>
                        <v-card-subtitle class="news-subtitle">
                            <v-container>
                                <v-row v-if="!xs">
                                    <v-col class="news-date">
                                        <span>{{ formatDateTime(item.eventDatetime) }}</span>
                                    </v-col>
                                </v-row>
                                <v-row v-else>
                                    <v-col class="news-date-and-type">
                                        <div>{{ formatDateTime(item.eventDatetime) }}</div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-subtitle>
                        <template v-if="!props.recent" v-slot:prepend>
                            <v-icon>mdi-calendar-clock-outline</v-icon>
                        </template>
                        <template v-if="!props.recent" v-slot:append>
                            <router-link :to="'/event/'+item.id">
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
                    :disabled="eventsResults.page <= 1"
                    class="prev-page"
                    @click="prevPage()"
                >
                    mdi-arrow-left-circle-outline
                </v-icon>
                <v-chip>
                    Page {{ eventsResults.page }} of {{ eventsResults.totalPages }}
                </v-chip>
                <v-icon
                    :disabled="eventsResults.page >= eventsResults.totalPages"
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
        <v-card>
            <v-card-item>
                <v-card-title class="news-title">
                    <v-icon size="small">mdi-calendar-clock-outline</v-icon>
                    {{ fullDetailsToShow.title }}
                    <hr />
                </v-card-title>
                <v-card-subtitle class="news-subtitle">
                    <v-container>
                        <v-row>
                            <v-col class="news-date">
                                <span>{{ formatDateTime(fullDetailsToShow.eventDatetime) }}</span>
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
                            <ResponsiveImage
                                :src="fullDetailsToShow.image.url"
                                alt="News Image"
                                :maxWidth="fullDetailsToShow.image.details.image.width"
                                :maxHeight="fullDetailsToShow.image.details.image.height"
                            />
                        </v-col>
                    </v-row>
                    <v-row v-if="fullDetailsToShow.videoUrl">
                        <v-col>
                            <EmbeddedVideo :videoId="fullDetailsToShow.videoId" />
                        </v-col>
                    </v-row>
                    <v-row v-if="fullDetailsToShow.attachments && fullDetailsToShow.attachments.length > 0">
                        <v-col>
                            <v-card>
                                <v-card-item>
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
                                </v-card-item>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-item>
            <template v-slot:actions>
                <v-btn
                    class="ms-auto"
                    text="Close"
                    @click="closeFullDetailsDialog()"
                ></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { useDialogsStore } from '@/store/dialogs';
    import { storeToRefs } from 'pinia';
    import EmbeddedVideo from './EmbeddedVideo.vue';
    import RichContentRenderer from './RichContentRenderer.vue';
    import ResponsiveImage from './ResponsiveImage.vue';
    import { ref, watch } from 'vue';
    import { useDisplay } from 'vuetify';
    import { logEvent } from '../utils/auditService';

    const { xs } = useDisplay();

    const props = defineProps({
        recent: { type: Boolean, required: false, default: false }
    });

    const contentStore = useContentStore();
    const { upcomingEvents } = storeToRefs(contentStore);

    const dialogsStore = useDialogsStore();

    const eventsResults = ref({});
    const currentPage = ref(0);
    const showFullDetails = ref(false);
    const fullDetailsToShow = ref(null);

    if (!props.recent) {
        nextPage();
    } else {
        setUpcomingEvents();
        watch(upcomingEvents, () => {
            setUpcomingEvents();
        });
    }

    function getCardItemClass() {
        return !props.recent ? 'news-card-item full-news' : 'news-card-item recent-news';
    }

    function setUpcomingEvents() {
        eventsResults.value = upcomingEvents.value;
        if (eventsResults.value && eventsResults.value.events && eventsResults.value.events.length > 5) {
            // truncate to only 5 entries
            eventsResults.value.events.length = 5;
        }
    }

    async function nextPage() {
        currentPage.value = currentPage.value + 1;
        eventsResults.value = await contentStore.getUpcomingEvents(currentPage.value);
    }

    async function prevPage() {
        currentPage.value = currentPage.value - 1;
        eventsResults.value = await contentStore.getUpcomingEvents(currentPage.value);
    }

    function formatDateTime(dateTime) {
        if (dateTime) {
            const [date, time ] = dateTime.split('T');
            const [ year, month, day ] = date.split('-');
            let [ hour, minute ] = time.split(':');
            let meridian = 'AM';
            const intHour = parseInt(hour);
            if (intHour > 12) {
                hour = `${intHour - 12}`;
                meridian = 'PM';
            }
            const timeDisplay = intHour !== 0 ? ` ${hour.padStart(2, '0')}:${minute} ${meridian}` : '';
            return `${month}/${day}/${year}${timeDisplay}`;
        } else {
            return '';
        }
    }

    function openFullDetailsDialog(newsId) {
        fullDetailsToShow.value = eventsResults.value.events.find(({ id }) => id === newsId);
        showFullDetails.value = true;
        logEvent({ uri: `/event/${newsId}`, type: 'dialog' });
        dialogsStore.openDialog({ close: closeFullDetailsDialog });
    }

    function closeFullDetailsDialog() {
        showFullDetails.value = false;
        dialogsStore.closeDialog({ close: closeFullDetailsDialog });
    }
</script>

<style>
.news-item { padding-left: 0px; }
.news-title { font-size: 16px; }
.news-title .v-icon { margin-right: 10px; }
.news-subtitle .v-container { padding-top: 10px; padding-left: 5px; padding-right: 5px; }
.news-subtitle .v-col { padding: 10px; }
.news-subtitle .news-date { text-align: left; }
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