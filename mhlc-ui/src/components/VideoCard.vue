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
        <v-card width="800">
            <v-card-title>
                {{ title }}
                <hr />
            </v-card-title>
            <v-container>
                <v-row>
                    <v-col class="d-flex">
                        <iframe
                            id="player"
                            class="mx-auto"
                            type="text/html"
                            width="640"
                            height="390"
                            :src="`http://www.youtube.com/embed/${video.id}`"
                            frameborder="0"
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
.v-card-subtitle .news-type { text-align: right; }
.v-img { margin-bottom: 20px; }
</style>