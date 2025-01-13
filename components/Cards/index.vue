<template>
    <div class="justify-center grid mt-6 ">
        <Taps  />
        <SearchFilter @search="handleSearch" />
        <div class="space-y-4 w-[600px]">
            <div v-if="filteredLaunches.length" class="relative">
                <div v-for="launch in filteredLaunches" :key="launch.id"
                    class="card border-2 border-slate-50 mb-5 bg-slate-50 shadow-lg rounded-lg cursor-pointer hover:scale-95 active:scale-90 transition duration-300 transform-origin-center"
                    @click="openModal(launch)">
                    <div class="justify-between items-center p-4 grid grid-cols-2 gap-4">
                        <div class="flex items-center text-2xl">
                            <div class="mr-4">
                                <img class="w-34 h-8" v-if="launch.links.patch.small" :src="launch.links.patch.small"
                                    :alt="launch.name" />
                            </div>
                            <div class="flex flex-col">
                                <h2 class="font-medium text-md">{{ launch.name }}</h2>
                            </div>
                        </div>
                        <div class="flex items-center justify-end">
                            <div class="mr-4 bg-blue-700 p-0.5 text-white rounded-full w-16 flex">
                                <h3 class="text-center font-medium">
                                    {{ launch.crew && launch.crew.length > 0 ? `${launch.crew.length} Crews` : "No crew" }}
                                </h3>
                            </div>
                            <div class="font-light text-sm">
                                <p>{{ new Date(launch.date_utc).toDateString() }}</p>
                            </div>
                            <div class="ml-4 text-blue-700 font-medium">
                                Upcoming
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalBox :isVisible="isModalOpen" @close="closeModal" :launch="selectedLaunch" />
        </div>
    </div>
</template>

<script lang="ts">
import ModalBox from "@/components/Modal/index.vue";
import Vue from "vue";
import { fetchUpcomingLaunches } from '~/apis/Launched';
import { Launch } from '~/types/Launch';
import SearchFilter from '@/components/SearchFilter/index.vue';
import Taps from '@/components/Taps/index.vue'

export default Vue.extend({
    name: "CardBox",
    components: {
        ModalBox,
        SearchFilter,
        Taps
    },
    data(): {
        isModalOpen: boolean,
        launches: Launch[],
        limitedLaunches: Launch[],
        selectedLaunch: Launch | null,
        searchQuery: string,
    } {
        return {
            isModalOpen: false,
            launches: [] as Launch[],
            limitedLaunches: [] as Launch[],
            selectedLaunch: null,
            searchQuery: "",
        };
    },
    computed: {
        filteredLaunches(): Launch[] {
            return this.limitedLaunches.filter(launch => 
                launch.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
    },
    methods: {
        openModal(launch: Launch): void {
            this.selectedLaunch = launch;
            this.isModalOpen = true;
        },
        closeModal(): void {
            this.isModalOpen = false;
            this.selectedLaunch = null;
        },
        handleSearch(query: string): void {
            this.searchQuery = query;
        },
    },
    async created() {
        try {
            const allLaunches: Launch[] = await fetchUpcomingLaunches();
            const sortedLaunches = allLaunches.sort((a, b) => {
                const crewA = a.crew && a.crew.length > 0;
                const crewB = b.crew && b.crew.length > 0;
                if (crewA && !crewB) {
                    return -1;
                }
                if (!crewA && crewB) {
                    return 1;
                }

                const dateA = new Date(a.date_utc).getTime();
                const dateB = new Date(b.date_utc).getTime();
                return dateB - dateA;
            });

            this.launches = sortedLaunches;
            this.limitedLaunches = sortedLaunches.slice(0, 10);
        } catch (error) {
            console.error('Failed to fetch launches:', error);
        }
    },
});
</script>
