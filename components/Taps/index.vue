<template>
    <div class=" items-center min-h-screen  bg-gray-100 mt-6">
      <div class=" justify-center   rounded-lg  flex">
        <!-- Tab: All -->
        <button
          :class="tab === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 '"
          class="px-6 py-2 rounded-l-lg border border-gray-300 focus:outline-none w-[150px] bg-gray-100"
          @click="tab = 'all'"
        >
          All
        </button>
  
        <!-- Tab: Launched -->
        <button
          :class="tab === 'launched' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'"
          class="px-6 py-2 border border-gray-300 focus:outline-none w-[150px]"
          @click="tab = 'launched'"
        >
          Launched
        </button>
  
        <!-- Tab: Upcoming -->
        <button
          :class="tab === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600'"
          class="px-6 py-2 rounded-r-lg border border-gray-300 focus:outline-none w-[150px]"
          @click="tab = 'upcoming'"
        >
          Upcoming
        </button>
      </div>
    </div>
  </template>

<script>
export default {
  name: "CardBox",

    data() {
        return {
        tab: "all",
        };
    },
};
</script>
