<template>
  <div>
    <CardBox />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import CardBox from "@/components/CardBox/index.vue";
export default Vue.extend({
  name: "IndexPage",
  components: {
    CardBox,
  },
});
</script>
