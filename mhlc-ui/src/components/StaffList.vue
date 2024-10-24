<template>
    <v-container v-if="staff">
        <template v-if="mdAndUp">
            <v-row
                v-for="(row, rowIndex) in staffMatrix"
                :key="rowIndex"
            >
                <v-col
                    v-for="member in row"
                    :key="member.id"
                >
                    <v-card elevation="4">
                        <v-card-item>
                            <v-card-title>{{ member.name }}</v-card-title>
                            <v-card-subtitle>{{ member.title }}</v-card-subtitle>
                            <v-card-text>
                                <ResponsiveImage
                                    v-if="member.picture"
                                    :src="member.picture.url"
                                    :alt="member.name"
                                    :maxWidth="member.picture.details.image.width"
                                    :maxHeight="member.picture.details.image.height"
                                    align="center"
                                />
                            </v-card-text>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <template v-else>
            <v-row
                v-for="member in staff"
                :key="member.id"
            >
                <v-col>
                    <v-card elevation="4">
                        <v-card-item>
                            <v-card-title>{{ member.name }}</v-card-title>
                            <v-card-subtitle>{{ member.title }}</v-card-subtitle>
                            <v-card-text>
                                <ResponsiveImage
                                    v-if="member.picture"
                                    :src="member.picture.url"
                                    :alt="member.name"
                                    :maxWidth="member.picture.details.image.width"
                                    :maxHeight="member.picture.details.image.height"
                                    align="center"
                                />
                            </v-card-text>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { computed } from 'vue';
    import { useDisplay } from 'vuetify'
    import ResponsiveImage from './ResponsiveImage.vue';

    const { mdAndUp } = useDisplay();
    const contentStore = useContentStore();
    const { staff } = storeToRefs(contentStore);
    staff.value.sort((a, b) => {
        if (a.sequence === undefined) {
            a.sequence = 999;
        }
        if (b.sequence === undefined) {
            b.sequence = 999;
        }
        return a.sequence - b.sequence;
    });
    const staffMatrix = computed(() => {
        // technique copied from
        // https://stackoverflow.com/questions/4492385/convert-simple-array-into-two-dimensional-array-matrix
        return staff.value.reduce((rows, key, index) => {
            return (index % 2 == 0 ?
                rows.push([key]) :
                rows[rows.length-1].push(key)) && rows;
        }, []);
    });
</script>

<style>
.v-card-subtitle .v-container { padding: 0px; }
.v-card-subtitle .v-col { padding: 10px; }
.v-card-subtitle .news-type { text-align: right; }
.v-img { margin-bottom: 20px; }
</style>
