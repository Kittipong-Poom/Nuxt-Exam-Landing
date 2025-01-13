<template>
  <div>
    <SearchFilter />
    <Taps />
    
  </div>
</template>

<script lang="ts">
import Taps from "@/components/Taps/index.vue";
import SearchFilter from "@/components/SeacrhFilter/index.vue"

export default {
  name: "IndexPage",
  components: {
    Taps,
    SearchFilter
  },
};
</script>
