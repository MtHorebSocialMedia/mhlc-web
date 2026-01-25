<template>
  <v-hover v-slot="{ isHovering, props: hoverProps }">
    <v-card
      v-if="video"
      v-bind="hoverProps"
      :class="{ 'on-hover': isHovering }"
      :elevation="isHovering ? 16 : 2"
      variant="outlined"
    >
      <v-card-title>
        <v-icon color="red">
          mdi-youtube
        </v-icon>
        {{ title }}
      </v-card-title>
      <v-img
        src="/logo193x185.png"
        class="mx-auto"
        width="193"
        height="185"
      />
      <v-overlay
        :model-value="isHovering"
        class="align-center justify-center"
        contained
      >
        <v-btn
          icon="mdi-play"
          @click="openVideoDialog()"
        />
      </v-overlay>
    </v-card>
  </v-hover>
  <v-dialog
    v-model="showVideo"
    width="auto"
  >
    <v-card>
      <v-card-item>
        <v-card-title>
          {{ title }}
          <hr>
        </v-card-title>
        <v-card-subtitle>
          <v-icon color="red">
            mdi-youtube
          </v-icon>
          <a
            :href="video.link"
            target="_blank"
          >Watch on YouTube</a>
          <v-icon size="small">
            mdi-open-in-new
          </v-icon>
        </v-card-subtitle>
        <v-container>
          <v-row>
            <v-col class="d-flex">
              <EmbeddedVideo
                :video-id="video.id"
                :max-width="640"
                :max-height="390"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-item>
      <template #actions>
        <v-btn
          class="ms-auto"
          text="Close"
          @click="showVideo = false"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import EmbeddedVideo from './EmbeddedVideo.vue';
    import { logEvent } from '../utils/auditService';

    const props = defineProps({
        video: { type: Object, required: true }
    });

    const title = computed(() => {
        const [ , festival, date ] = props.video.title.split('-');
        return `${date} - ${festival}`;
    });

    const showVideo = ref(false);

    function openVideoDialog() {
        showVideo.value = true;
        logEvent({ uri: `/live-streams/${props.video.id}`, type: 'dialog' });
    }
</script>

<style scoped>
.v-card-subtitle .v-container { padding: 0px; }
.v-card-subtitle .v-col { padding: 10px; }
.v-card-subtitle { text-align: right; }
.v-card-subtitle .v-icon { margin-right: 5px; margin-left: 5px; }
.v-img { margin-bottom: 20px; }
</style>