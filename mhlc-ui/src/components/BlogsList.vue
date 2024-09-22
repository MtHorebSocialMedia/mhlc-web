<template>
    <v-container>
        <v-row>
            <v-col class="previous">
                <v-btn :disabled="blogResults.page <= 1" @click="prevPage()">
                    <v-icon>mdi-arrow-left-circle-outline</v-icon>
                    Previous
                </v-btn>
            </v-col>
            <v-col class="page-count">
                <v-chip>
                    Page {{ blogResults.page }} of {{ blogResults.totalPages }}
                </v-chip>
            </v-col>
            <v-col class="next">
                <v-btn :disabled="blogResults.page >= blogResults.totalPages" @click="nextPage()">
                    Next
                    <v-icon>mdi-arrow-right-circle-outline</v-icon>
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            v-for="item in blogResults.blogs"
            v-bind:key="item.id"
        >
            <v-col>
                <v-card class="mx-auto">
                    <v-card-title>
                        <v-container class="blog-item">
                            <v-row>
                                <v-col class="blog-title">
                                    <v-icon size="small">mdi-post-outline</v-icon>
                                    <a href="javascript:void(0)" @click="openFullDetailsDialog(item.id)">{{ item.title }}</a>
                                </v-col>
                                <v-col class="blog-navigation">
                                    <router-link :to="'/blog-posts/'+item.id">
                                        <v-icon size="x-small">mdi-open-in-new</v-icon>
                                    </router-link>
                                </v-col>
                            </v-row>
                        </v-container>
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
        <v-row>
            <v-col class="previous">
                <v-btn :disabled="blogResults.page <= 1" @click="prevPage()">
                    <v-icon>mdi-arrow-left-circle-outline</v-icon>
                    Previous
                </v-btn>
            </v-col>
            <v-col class="page-count">
                <v-chip>
                    Page {{ blogResults.page }} of {{ blogResults.totalPages }}
                </v-chip>
            </v-col>
            <v-col class="next">
                <v-btn :disabled="blogResults.page >= blogResults.totalPages" @click="nextPage()">
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
    import RichContentRenderer from './RichContentRenderer.vue';
    import { ref } from 'vue';

    const contentStore = useContentStore();

    const blogResults = ref({});
    const currentPage = ref(0);
    const showFullDetails = ref(false);
    const fullDetailsToShow = ref(null);

    nextPage();

    async function nextPage() {
        currentPage.value = currentPage.value + 1;
        blogResults.value = await contentStore.getBlogPosts(currentPage.value);
    }

    async function prevPage() {
        currentPage.value = currentPage.value - 1;
        blogResults.value = await contentStore.getBlogPosts(currentPage.value);
    }

    function formatDateTime(dateTime) {
        const [ year, month, day ] = dateTime.split('T')[0].split('-');
        return `${month}/${day}/${year}`;
    }

    function openFullDetailsDialog(blogId) {
        fullDetailsToShow.value = blogResults.value.blogs.find(({ id }) => id === blogId);
        showFullDetails.value = true;
    }
</script>

<style>
.blog-item { padding-left: 0px; }
.blog-title .v-icon { margin-right: 10px; }
.blog-subtitle .v-container { padding: 0px; }
.blog-subtitle .v-col { padding: 10px; }
.blog-subtitle .blog-publish-date { text-align: right; }
.blog-navigation { text-align: right; }
</style>