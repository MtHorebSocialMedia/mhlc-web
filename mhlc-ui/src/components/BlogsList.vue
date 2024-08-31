<template>
    <v-row
        v-for="item in blogPosts"
        v-bind:key="item.id"
    >
        <v-col>
            <v-card class="mx-auto">
                <v-card-title class="blog-title">
                    <v-icon size="small">mdi-post-outline</v-icon>
                    <a href="javascript:void(0)" @click="openFullDetailsDialog(item.id)">{{ item.title }}</a>
                </v-card-title>
                <v-card-subtitle class="blog-subtitle">
                    <v-container>
                        <v-row>
                            <v-col class="blog-author">
                                {{ item.author.name }}
                            </v-col>
                            <v-col class="blog-publish-date">
                                <span>{{ formatDateTime(item.publishDate) }}</span>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-subtitle>
                <br />
            </v-card>
        </v-col>
    </v-row>
    <v-dialog
      v-model="showFullDetails"
      width="auto"
    >
        <v-card width="800">
            <v-card-title class="blog-title">
                <v-icon size="small">mdi-post-outline</v-icon>
                {{ fullDetailsToShow.title }}
                <hr />
            </v-card-title>
            <v-card-subtitle class="blog-subtitle">
                <v-container>
                    <v-row>
                        <v-col class="blog-author">
                            {{ fullDetailsToShow.author.name }}
                        </v-col>
                        <v-col class="blog-publish-date">
                            <span>{{ formatDateTime(fullDetailsToShow.publishDate) }}</span>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-subtitle>
            <v-container>
                <v-row>
                    <v-col>
                        <RichContentRenderer :content="fullDetailsToShow.content" />
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
    import { ref } from 'vue';

    const contentStore = useContentStore();
    const { blogPosts } = storeToRefs(contentStore);

    const showFullDetails = ref(false);
    const fullDetailsToShow = ref(null);

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

    function openFullDetailsDialog(blogId) {
        fullDetailsToShow.value = blogPosts.value.find(({ id }) => id === blogId);
        showFullDetails.value = true;
    }
</script>

<style>
.blog-title .v-icon { margin-right: 10px; }
.blog-subtitle .v-container { padding: 0px; }
.blog-subtitle .v-col { padding: 10px; }
.blog-subtitle .blog-publish-date { text-align: right; }
</style>