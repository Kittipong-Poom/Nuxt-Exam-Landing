<template>
  <div>
    
    <CardBox />
    
  </div>
</template>

<script lang="ts">
import Taps from "@/components/Taps/index.vue";
import SearchFilter from "@/components/SearchFilter/index.vue"
import CardBox from '@/components/Cards/index.vue';

export default {
  name: "IndexPage",
  components: {
    Taps,
    SearchFilter,
    CardBox
  },
};
</script>
