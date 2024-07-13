<template>
  <v-container class="home">
    <h2>Welcome to Mt. Horeb Lutheran Church!</h2>
    <v-alert style="text-align: center">
      <p>Mt. Horeb Lutheran Church is located in Chapin, SC and is a member of the Evangelical Lutheran Church of America (ELCA).</p>
      <p>We are a vibrant congregation steeped in a rich history and looking torward a promising future!</p>
      <p>
        <strong>Come worship with us on Sunday mornings at 10am!</strong>
      </p>
    </v-alert>
    <v-container class="d-flex justify-center">
      <iframe
        width="560"
        height="315"
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
  import HelloWorld from '@/components/HelloWorld.vue'
</script>

<style scoped>
  .home p { margin-bottom: 10px; }
</style>
