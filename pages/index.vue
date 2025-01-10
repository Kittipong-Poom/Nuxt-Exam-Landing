<template>
  <div>
    <Taps />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Taps from "@/components/Taps/index.vue";
export default Vue.extend({
  name: "IndexPage",
  components: {
    Taps,
  },
});
</script>
