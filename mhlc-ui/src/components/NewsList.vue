<template>
    <v-row v-if="!props.compact">
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
    </v-row>
    <v-row
        v-for="item in news"
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
                <v-card-text v-if="!props.compact">
                    <RichTextRenderer :document="item.description" />
                </v-card-text>
                <br v-else />
            </v-card>
        </v-col>
    </v-row>
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
                        <RichTextRenderer :document="fullDetailsToShow.description" />
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
    import RichTextRenderer from 'contentful-rich-text-vue-renderer';
    import { ref } from 'vue';

    const props = defineProps({
        compact: { type: Boolean, required: false, default: false }
    });

    const contentStore = useContentStore();
    const { news, newsTypes } = storeToRefs(contentStore);

    const showFullDetails = ref(false);
    const fullDetailsToShow = ref(null);

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

    function openFullDetailsDialog(newsId) {
        fullDetailsToShow.value = news.value.find(({ id }) => id === newsId);
        showFullDetails.value = true;
    }
</script>

<style>
.news-title .v-icon { margin-right: 10px; }
.news-subtitle .v-container { padding: 0px; }
.news-subtitle .v-col { padding: 10px; }
.news-subtitle .news-type { text-align: right; }
.news-subtitle .news-type .v-chip { margin-left: 5px; }
</style>