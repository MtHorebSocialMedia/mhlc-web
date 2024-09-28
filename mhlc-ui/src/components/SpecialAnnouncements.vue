<template>
    <v-container v-if="specialAnnouncements && specialAnnouncements.length > 0" class="special-announcements">
        <v-alert :type="announcement.type" v-for="announcement in specialAnnouncements">
            <h3>{{ formatDateTime(announcement.publishBeginDate) }} - {{ announcement.title }}</h3>
            <RichContentRenderer :content="announcement.description" />
        </v-alert>
    </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import RichContentRenderer from './RichContentRenderer.vue';

    const props = defineProps({
        recent: { type: Boolean, required: false, default: false }
    });

    const contentStore = useContentStore();
    const { specialAnnouncements } = storeToRefs(contentStore);

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

</script>

<style>
.v-container.special-announcements { padding: 0px; margin-bottom: 10px; }
</style>