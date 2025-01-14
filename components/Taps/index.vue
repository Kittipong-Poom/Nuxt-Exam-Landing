<!-- Taps/index.vue -->
<template>
  <div class="items-center bg-gray-100 pt-6">
    <div class="justify-center rounded-lg flex">
      <button
        :class="tab === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'"
        class="px-6 py-2 rounded-l-lg border border-gray-300 focus:outline-none w-[200px] bg-gray-100"
        @click="changeTapsContent('all')"
      >
        All
      </button>
      <button
        :class="tab === 'launched' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'"
        class="px-6 py-2 border border-gray-300 focus:outline-none w-[200px]"
        @click="changeTapsContent('launched')"
      >
        Launched
      </button>
      <button
        :class="tab === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'"
        class="px-6 py-2 rounded-r-lg border border-gray-300 focus:outline-none w-[200px]"
        @click="changeTapsContent('upcoming')"
      >
        Upcoming
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

type TabType = "all" | "launched" | "upcoming";

export default Vue.extend({
  name: "Taps",
  data(): { tab: TabType } {
    return {
      tab: "all",
    };
  },
  methods: {
    changeTapsContent(tab: TabType) {
      this.tab = tab;
      this.$emit("changeTapsContent", tab);
    },
  },
});
</script>
