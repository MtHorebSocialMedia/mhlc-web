<template>
  <v-container class="home">
    <h2>Welcome to Mt. Horeb Lutheran Church!</h2>
    <hr />
    <v-alert style="text-align: center">
      <p>Mt. Horeb Lutheran Church is a community of faith located in Chapin, SC and is a part of the Evangelical Lutheran Church of America (ELCA).</p>
      <p>We are a vibrant congregation steeped in a rich history while also looking forward torwards a promising future!</p>
      <p>
        <strong>Come worship with us on Sunday mornings at 10am!</strong>
      </p>
    </v-alert>
    <v-container class="d-flex justify-center">
      <iframe
        :width="videoWidth"
        :height="videoHeight"
        src="https://www.youtube.com/embed/FywyUyCav4A?si=OL6EtBX38sBYP2h7"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </v-container>
  </v-container>
</template>

<script setup>
  import { useDisplay } from 'vuetify'
  import { computed } from 'vue';
  const { xs, sm } = useDisplay();
  const videoWidth = computed(() => {
    const originalSize = 560;
    if (xs.value) {
      return originalSize * .7;
    } else if (sm.value) {
      return originalSize * .85;
    } else {
      return originalSize;
    }
  })
  const videoHeight = computed(() => {
    const originalSize = 315;
    if (xs.value) {
      return originalSize * .7;
    } else if (sm.value) {
      return originalSize * .85;
    } else {
      return originalSize;
    }
  })
</script>

<style scoped>
  .v-container.home h2 { margin-top: 10px; margin-bottom: 10px; }
  .v-container.home hr { margin-bottom: 20px; }
  .home p { margin-bottom: 10px; }
</style>
