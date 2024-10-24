<template>
    <v-container>
        <v-row>
            <v-col class="page-count">
                <v-icon
                    :disabled="blogResults.page <= 1"
                    class="prev-page"
                    @click="prevPage()"
                >
                    mdi-arrow-left-circle-outline
                </v-icon>
                <v-chip>
                    Page {{ blogResults.page }} of {{ blogResults.totalPages }}
                </v-chip>
                <v-icon
                    :disabled="blogResults.page >= blogResults.totalPages"
                    class="next-page"
                    @click="nextPage()"
                >
                    mdi-arrow-right-circle-outline
                </v-icon>
            </v-col>
        </v-row>
        <v-row
            v-for="item in blogResults.blogs"
            v-bind:key="item.id"
        >
            <v-col>
                <v-card class="mx-auto" elevation="4">
                    <v-card-item class="blog-card-item">
                        <v-card-title class="blog-title">
                            <a href="javascript:void(0)" @click="openFullDetailsDialog(item.id)">{{ item.title }}</a>
                        </v-card-title>
                        <v-card-subtitle class="blog-subtitle">
                            <v-container>
                                <v-row v-if="!xs">
                                    <v-col class="blog-author">
                                        {{ item.author.name }}
                                    </v-col>
                                    <v-col class="blog-publish-date">
                                        <span>{{ formatDateTime(item.publishDate) }}</span>
                                    </v-col>
                                </v-row>
                                <v-row v-else>
                                    <v-col class="blog-author-and-publish-date">
                                        <div>{{ item.author.name }}</div>
                                        <div>{{ formatDateTime(item.publishDate) }}</div>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-subtitle>
                        <template v-slot:prepend>
                            <v-icon size="large">mdi-post-outline</v-icon>
                        </template>
                        <template v-slot:append>
                            <router-link :to="'/blog-posts/'+item.id">
                                <v-icon size="small">mdi-open-in-new</v-icon>
                            </router-link>
                        </template>
                    </v-card-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col class="page-count">
                <v-icon
                    :disabled="blogResults.page <= 1"
                    class="prev-page"
                    @click="prevPage()"
                >
                    mdi-arrow-left-circle-outline
                </v-icon>
                <v-chip>
                    Page {{ blogResults.page }} of {{ blogResults.totalPages }}
                </v-chip>
                <v-icon
                    :disabled="blogResults.page >= blogResults.totalPages"
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
            </v-card-item>
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
    import { useDisplay } from 'vuetify'

    const contentStore = useContentStore();

    const blogResults = ref({});
    const currentPage = ref(0);
    const showFullDetails = ref(false);
    const fullDetailsToShow = ref(null);

    const { xs } = useDisplay();

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
.blog-title { font-size: 16px; }
.blog-subtitle .v-container { padding-top: 10px; padding-left: 5px; padding-right: 5px; }
.blog-subtitle .v-col { padding: 10px; }
.blog-subtitle .blog-author { text-align: left; }
.blog-subtitle .blog-publish-date { text-align: right; }
.blog-subtitle .blog-author-and-publish-date { text-align: center; }
.blog-navigation { text-align: right; }
.v-col.previous { text-align: left; }
.v-col.page-count { text-align: center; }
.v-col.next { text-align: right; }
.v-icon.prev-page { margin-right: 10px; }
.v-icon.next-page { margin-left: 10px; }
.blog-card-item .v-card-item__content { border-left: 1px solid #CCC; border-right: 1px solid #CCC; padding: 5px; }
</style>