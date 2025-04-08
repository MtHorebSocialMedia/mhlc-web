<template>
  <v-container class="form">
    <v-row>
      <v-col>
        <div
            v-if="jotformFormId"
            ref="jotformWrapper"
        ></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import router from '../router';

    const jotformWrapper = ref(null);
    const jotformFormId = ref(null);

    watch(jotformWrapper, () => {
      if(jotformWrapper.value && jotformWrapper.value.appendChild) {
          const jotformScript = document.createElement("script");
          jotformScript.setAttribute('type', 'text/javascript');
          jotformScript.setAttribute(
              'src',
              `https://form.jotform.com/jsform/${jotformFormId.value}`
          );
          jotformWrapper.value.appendChild(jotformScript);
      }
    });

    const path = router.currentRoute.value.path;
    const [,,formId] = path.split('/');
    jotformFormId.value = formId;

</script>

<style scoped>
.v-container.form h2 { margin-top: 10px; margin-bottom: 10px; }
.v-container.form hr { margin-bottom: 20px; }
.v-container.form .navigation { text-align: right; }
</style>
