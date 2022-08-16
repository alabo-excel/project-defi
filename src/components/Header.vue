<script setup>
import { ref } from "vue";
defineProps({
  userEth: String,
  loggedin: Boolean,
  login: Function,
});
</script>

<template>
  <div
    class="lg:px-20 lg:p-8 p-4 flex justify-between absolute top-0 w-full z-50"
  >
    <div class="text-3xl">Defi</div>
    <div v-if="loggedin" class="bg-green-100 py-2 px-3 text-sm rounded-full">
      {{ userEth.slice(0, 13) }}...
    </div>
    <div v-else>
      <button
        class="border border-[#00E3A5] lg:p-4 p-2 lg:w-44 w-32"
        @click="login"
      >
        Connect
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
