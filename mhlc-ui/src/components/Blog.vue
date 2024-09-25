<template>
    <v-card
        v-if="blogContent"
        :width="getAssetWidth(800)"
    >
        <v-card-title class="blog-title">
            <v-icon size="small">mdi-post-outline</v-icon>
            {{ blogContent.title }}
            <hr />
        </v-card-title>
        <v-card-subtitle class="blog-subtitle">
            <v-container>
                <v-row>
                    <v-col class="blog-author">
                        {{ blogContent.author.name }}
                    </v-col>
                    <v-col class="blog-publish-date">
                        <span>{{ formatDateTime(blogContent.publishDate) }}</span>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-subtitle>
        <v-container>
            <v-row>
                <v-col>
                    <RichContentRenderer :content="blogContent.content" />
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import RichContentRenderer from './RichContentRenderer.vue';
    import { getAssetWidth } from '../utils/assetUtils';
    import { ref } from 'vue';
    import router from '../router';

    const blogContent = ref(null);

    async function loadBlogPost(blogId) {
        blogContent.value = await useContentStore().getBlogPost(blogId);
    }

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

    const path = router.currentRoute.value.path;
    const [,,blogId] = path.split('/');
    loadBlogPost(blogId);

</script>

<style>
.blog-title .v-icon { margin-right: 10px; }
.blog-subtitle .v-container { padding-top: 10px; padding-left: 5px; padding-right: 5px; }
.blog-subtitle .v-col { padding: 10px; }
.blog-subtitle .blog-publish-date { text-align: right; }
</style>