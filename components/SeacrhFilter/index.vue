<template>
    <div class="p-6 justify-center flex">
        <!-- Search Bar -->
        <div class="relative w-[600px] ">
            <input type="text" placeholder="Search..."
                class="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l-4-4m0 0l4-4m-4 4h16" />
            </svg>
        </div>


        <!-- Filtered List -->

    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend ({
    data(): {searchQuery : string} {
        return {
            searchQuery: "", // เก็บค่าการค้นหา
        };
    },
});
</script>
