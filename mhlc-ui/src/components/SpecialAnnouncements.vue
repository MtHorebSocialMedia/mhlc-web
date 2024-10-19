<template>
    <v-container v-if="specialAnnouncements && specialAnnouncements.length > 0" class="special-announcements">
        <v-alert
            v-for="announcement in specialAnnouncements"
            :key="announcement.id"
            :type="announcement.type"
        >
            <h3>{{ formatDateTime(announcement.publishBeginDate) }} - {{ announcement.title }}</h3>
            <RichContentRenderer :content="announcement.description" />
            <img
                v-if="announcement.image"
                :src="announcement.image.url"
                :width="getAssetWidth(announcement.image.details.image.width, announcement.image.details.image.height)"
                :height="getAssetHeight(announcement.image.details.image.width, announcement.image.details.image.height)"
                alt="Special Announcement Image"
                class="d-flex justify-center"
            />
            <v-container v-if="announcement.videoUrl" class="d-flex justify-center">
                <iframe
                    :width="getAssetWidth(560, 315)"
                    :height="getAssetHeight(560, 315)"
                    :src="announcement.videoUrl"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </v-container>
        </v-alert>
    </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { getAssetWidth, getAssetHeight } from '../utils/assetUtils';
    import RichContentRenderer from './RichContentRenderer.vue';

    const contentStore = useContentStore();
    const { specialAnnouncements } = storeToRefs(contentStore);

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

</script>

<style>
.v-container.special-announcements { padding: 0px; margin-bottom: 10px; }
.v-container.special-announcements .v-alert { margin-bottom: 10px; }
.v-container.special-announcements .v-alert img { display: block; margin-left: auto; margin-right: auto; }
</style>