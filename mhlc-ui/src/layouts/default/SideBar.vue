<template>
    <v-container>
        <v-row class="justify-center">
            <ContentBlock contentBlockKey="home/elca" />
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
                    @click="$router.push('/newsletter')"
                >
                    Join the Newsletter
                </v-btn>
            </v-col>
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
</script>

<style scoped>
 .elca { margin-bottom: 20px; }
 h3 { margin-bottom: 10px; }
 .v-col.news-link { text-align: right; }
</style>

