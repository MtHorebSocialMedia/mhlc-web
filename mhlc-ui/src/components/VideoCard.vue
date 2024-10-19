<template>
    <v-hover v-slot="{ isHovering, props }">
        <v-card
            v-if="video"
            v-bind="props"
            :class="{ 'on-hover': isHovering }"
            :elevation="isHovering ? 16 : 2"
            variant="outlined">
            <v-card-title>
                <v-icon color="red">mdi-youtube</v-icon>
                {{ title }}
            </v-card-title>
            <v-img
                src="/logo193x185.png"
                class="mx-auto"
                width="193"
                height="185"
            ></v-img>
            <v-overlay
                :model-value="isHovering"
                class="align-center justify-center"
                contained
            >
                <v-btn
                    icon="mdi-play"
                    @click="showVideo = true"
                >
                </v-btn>
            </v-overlay>
        </v-card>
    </v-hover>
    <v-dialog
      v-model="showVideo"
      width="auto"
    >
        <v-card :width="getAssetWidth(800)">
            <v-card-title>
                {{ title }}
                <hr />
            </v-card-title>
            <v-card-subtitle>
                <v-icon color="red">mdi-youtube</v-icon>
                <a :href="video.link" target="_blank">Watch on YouTube</a>
                <v-icon size="small">mdi-open-in-new</v-icon>
            </v-card-subtitle>
            <v-container>
                <v-row>
                    <v-col class="d-flex">
                        <iframe
                            id="player"
                            class="mx-auto"
                            type="text/html"
                            :width="getAssetWidth(640)"
                            :height="getAssetHeight(640, 390)"
                            :src="`https://www.youtube.com/embed/${video.id}`"
                            :title="video.title"
                            allowfullscreen
                        ></iframe>
                    </v-col>
                </v-row>
            </v-container>
            <template v-slot:actions>
                <v-btn
                    class="ms-auto"
                    text="Close"
                    @click="showVideo = false"
                ></v-btn>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { getAssetWidth, getAssetHeight } from '../utils/assetUtils';

    const props = defineProps({
        video: { type: Object, required: true }
    });

    const title = computed(() => {
        const [ , festival, date ] = props.video.title.split('-');
        return `${date} - ${festival}`;
    });

    const showVideo = ref(false);

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
.v-card-subtitle .v-container { padding: 0px; }
.v-card-subtitle .v-col { padding: 10px; }
.v-card-subtitle { text-align: right; }
.v-card-subtitle .v-icon { margin-right: 5px; margin-left: 5px; }
.v-img { margin-bottom: 20px; }
</style>