<template>
    <v-container>
        <v-row class="justify-center">
            <img
                width="300"
                height="88"
                data-src="https://mthoreb.net/wp-content/uploads/2022/09/ELCA_4_Color_Secondary.png"
                class="elca image wp-image-12330  attachment-full size-full ls-is-cached lazyloaded"
                alt="ELCA Logo"
                style="--smush-placeholder-width: 300px; --smush-placeholder-aspect-ratio: 300/88;max-width: 100%; height: auto;"
                decoding="async"
                loading="lazy"
                src="https://mthoreb.net/wp-content/uploads/2022/09/ELCA_4_Color_Secondary.png"
            />
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="red" block>Donate Online</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-btn color="red" block>Join the Newsletter</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <h3>Recent News</h3>
                <NewsList compact />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import NewsList from '@/components/NewsList.vue'
</script>

<style scoped>
 .elca { margin-bottom: 20px; }
 h3 { margin-bottom: 10px; }
</style>

