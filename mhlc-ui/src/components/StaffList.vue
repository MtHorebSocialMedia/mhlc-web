<template>
    <v-container v-if="staff">
        <v-row
            v-for="(row, rowIndex) in staffMatrix"
            :key="rowIndex"
        >
            <v-col
                v-for="member in row"
                :key="member.id"
            >
                <v-card>
                    <v-card-title>{{ member.name }}</v-card-title>
                    <v-card-subtitle>{{ member.title }}</v-card-subtitle>
                    <v-card-text class="d-flex">
                        <img
                            v-if="member.picture"
                            :src="member.picture.url"
                            :width="getAssetWidth(member.picture.details.image.width, member.picture.details.image.height)"
                            :height="getAssetHeight(member.picture.details.image.width, member.picture.details.image.height)"
                            :alt="member.name"
                            class="mx-auto"
                        />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
    import { useContentStore } from '@/store/content';
    import { storeToRefs } from 'pinia';
    import { computed } from 'vue';
    import { getAssetWidth, getAssetHeight } from '../utils/assetUtils';

    const contentStore = useContentStore();
    const { staff } = storeToRefs(contentStore);
    const staffMatrix = computed(() => {
        staff.value.sort((a, b) => {
            if (a.sequence === undefined) {
                a.sequence = 999;
            }
            if (b.sequence === undefined) {
                b.sequence = 999;
            }
            return a.sequence - b.sequence;
        });
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
