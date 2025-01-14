<template>
    <div class="justify-center grid mt-6 ">
        <Taps @changeTapsContent="handleTabChange" />
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
                                <h2 class="font-medium text-md">{{ launch?.name }}</h2>
                            </div>
                        </div>
                        <div class="flex items-center justify-end">
                            <div class="mr-4  p-0.5 text-white w-16 flex">
                                <h3 :class="{ 'bg-blue-700 p-0.5 rounded-lg  ': launch?.crew && launch.crew.length > 0 }"
                                    class="text-center font-medium">
                                    {{ launch?.crew && launch?.crew.length > 0 ? `${launch.crew.length} Crews` : ""
                                    }}
                                </h3>
                            </div>
                            <div class="font-light text-sm">
                                <p>{{ new Date(launch.date_utc).toDateString() }}</p>
                            </div>
                            <div class="ml-4 text-blue-700 font-medium">
                                {{ getLaunchStatus(launch.upcoming) }}
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
import SearchFilter from '@/components/SearchFilter/index.vue';
import Taps from '@/components/Taps/index.vue';
import { fetchUpcomingLaunches } from '~/apis/Launched';
import { Launch } from '~/types/Launch';
import Vue from "vue";

export default Vue.extend({
    name: "CardBox",
    components: {
        ModalBox,
        SearchFilter,
        Taps,
    },
    data(): {
        isModalOpen: boolean,
        launches: Launch[],
        limitedLaunches: Launch[],
        selectedLaunch: Launch | null,
        searchQuery: string,
        dateSearch: string,
        selectedTab: "all" | "launched" | "upcoming",
    } {
        return {
            isModalOpen: false,
            launches: [] as Launch[],
            limitedLaunches: [] as Launch[],
            selectedLaunch: null,
            dateSearch: "",
            searchQuery: "",
            selectedTab: "all",
        };
    },
    computed: {
        filteredLaunches(): Launch[] {
            const query = this.searchQuery.toLowerCase();
            return this.limitedLaunches.filter((launch) => {
                // ฟิลเตอร์ตามแท็บที่เลือก
                if (this.selectedTab === "all") {
                    return true;
                }
                if (this.selectedTab === "launched") {
                    return !launch.upcoming;
                }
                if (this.selectedTab === "upcoming") {
                    return launch.upcoming;
                }

                return true;
            }).filter((launch) => {
                // แปลงวันที่เป็น String 
                const launchDate = new Date(launch.date_utc).toDateString().toLowerCase();

                // ให้ค้นหาชื่อและ วันที่ได้
                return launch.name.toLowerCase().includes(query) || launchDate.includes(query);
            });
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
            this.searchQuery = query.trim();
        },
        handleTabChange(tab: "all" | "launched" | "upcoming") {
            this.selectedTab = tab;
            this.fetchLaunches();
        },
        getLaunchStatus(upcoming: boolean): string {
            if (upcoming) {
                return "Upcoming"
            } else {
                return ""
            }
        },
        async fetchLaunches(): Promise<void> {
            try {
                const allLaunches: Launch[] = await fetchUpcomingLaunches();
                const sortedLaunches = allLaunches.sort((a, b) => {
                    const dateA = new Date(a.date_utc).getTime();
                    const dateB = new Date(b.date_utc).getTime();
                    return dateB - dateA;
                });

                this.launches = sortedLaunches;
                this.limitedLaunches = sortedLaunches.slice(0, 30);
            } catch (error) {
                console.error("Failed to fetch launches:", error);
            }
        },
    },
    created(): void {
        this.fetchLaunches();
    },
});
</script>
