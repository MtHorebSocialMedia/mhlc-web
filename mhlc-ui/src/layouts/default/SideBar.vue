<template>
    <v-container>
        <v-row>
            <v-col>
                <ContentBlock contentBlockKey="home/elca" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    color="red"
                    block
                    @click="$router.push('/donate')"
                >
                    Donate Online
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    color="red"
                    block
                    @click="$router.push('/content/prayer')"
                >
                    Send a Prayer Request
                </v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn
                    color="red"
                    block
                    @click="$router.push('/newsletter')"
                >
                    Join the Weekly e-News
                </v-btn>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="8">
                <h3>Upcoming Events</h3>
            </v-col>
            <v-col cols="4" class="news-link">
                <router-link to="/events">View All</router-link>
            </v-col>
        </v-row>
        <v-row>
            <EventsList recent />
        </v-row>

        <v-row>
            <v-col cols="8">
                <h3>Recent News</h3>
            </v-col>
            <v-col cols="4" class="news-link">
                <router-link to="/news">View All</router-link>
            </v-col>
        </v-row>
        <v-row>
            <NewsList recent />
        </v-row>
    </v-container>
</template>

<script setup>
import ContentBlock from '@/components/ContentBlock.vue'
import NewsList from '@/components/NewsList.vue'
import EventsList from '@/components/EventsList.vue'
</script>

<style scoped>
 h3 { margin-bottom: 10px; }
 .v-col.news-link { text-align: right; }
</style>

