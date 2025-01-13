<template>
    <div class="justify-center flex mt-6 ">
        <div class="space-y-4 w-[600px]">
            <div v-if="launches.length" class="relative">
                <div v-for="launch in limitedLaunches" :key="launch.id"
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
                                <h3 class="text-center font-bold">3 crews</h3>
                            </div>
                            <div class="font-light text-sm">
                                <p> {{ new Date(launch.date_utc).toDateString() }}</p>
                            </div>
                            <div class="ml-4 text-blue-700 font-medium">
                                Upcoming
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ModalBox :isVisible="isModalOpen" @close="closeModal" :launch="selectedLaunch"  />
        </div>
    </div>
</template>

<script lang="ts">
import ModalBox from "@/components/Modal/index.vue";
import Vue from "vue";
import { fetchUpcomingLaunches } from '~/apis/Launched';
import { Launch } from '~/types/Launch';  
export default Vue.extend({
    name: "CardBox",
    components: {
        ModalBox,
    },
    data(): { isModalOpen: boolean, launches: Launch[], limitedLaunches: Launch[], selectedLaunch: Launch | null } {
        return {
            isModalOpen: false,
            launches: [] as Launch[],
            limitedLaunches: [] as Launch[],
            selectedLaunch: null,
        };
    },

    methods: {
        openModal(launch: Launch): void {
        this.selectedLaunch = launch; // กำหนด launch ที่ถูกเลือก
        this.isModalOpen = true;
    },
        closeModal(): void {
            this.isModalOpen = false;
            this.selectedLaunch = null
        },
    },
    async created() {
        try {
            const allLaunches = await fetchUpcomingLaunches();
            this.launches = allLaunches; // เก็บข้อมูลทั้งหมด
            this.limitedLaunches = allLaunches.slice(0, 15);
        } catch (error) {
            console.error('Failed to fetch launches:', error);
        }
    },
});
</script>
