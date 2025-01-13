<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        @click.self="$emit('close')">
        <div class="absolute top-4 right-4">
            <button class="font-bold text-2xl hover:text-slate-300 duration-100 text-white px-2 py-1 rounded  "
                @click="$emit('close')">
                X
            </button>
        </div>
        <div class="bg-white w-[650px] rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto no-scrollbar">
            <div class="flex-row items-center border-b pb-4">
                <h2 class="font-bold text-lg text-center w-full">{{ launch?.name }}</h2>
                <div class="justify-center text-center mt-3 font-light">
                    <p>{{ launch?.date_utc ? new Date(launch.date_utc).toDateString() : 'No Date Available' }}</p>
                </div>
            </div>
            <div class="mt-4 flex flex-col items-center border-b pb-4">
                <!-- Title -->
                <h3 class="bg-blue-700 text-white p-1 rounded-full font-medium w-[70px] text-center">Crews</h3>

                <!-- Grid -->
                <div v-if="crewDetails.length > 0" class="mt-4 grid grid-cols-4 gap-6">
                    <div v-for="crew in crewDetails" :key="crew.id" class="text-center">
                        <img :src="crew.image" alt="Crew Member"
                            class="bg-gray-300 w-[100px] h-[100px] mx-auto rounded-full" />
                        <h2 class="mt-2 font-medium">{{ crew.name }}</h2>
                        <p class="text-sm text-gray-500">{{ crew.agency }}</p>
                    </div>
                </div>
                <div v-else class="mt-4 text-center text-gray-500">No Crew Members</div>
            </div>
            <!--- Rocket จรวด -->
            <div class="mt-4 flex flex-col items-center border-b pb-4">
                <div class="mb-4">
                    <h3 class="bg-blue-700 text-white p-1 rounded-full font-medium w-[70px] text-center">
                        Rocket
                    </h3>
                </div>
                <div class="text-center">
                    <h2 class="text-xl font-medium">
                        {{ rocket?.name }} <!-- แสดงชื่อจรวด -->
                    </h2>
                    <img :src="rocket?.flickr_images?.[0]" alt="Rocket Image" class="mt-4 w-[300px] h-[200px]" />
                    <!-- แสดงภาพจรวด -->
                </div>
            </div>

            <!--- Launchpad ฐานปล่อย -->
            <div class="mt-4 flex flex-col items-center border-b pb-4">
                <!-- ส่วนของ Launchpad -->
                <div class="mb-4">
                    <h3 class="bg-blue-700 text-white p-1 rounded-full font-medium w-[120px] text-center">
                        Launchpad
                    </h3>
                </div>

                <!-- ส่วนของ เนื้อหา -->
                <div class="text-center grid">
                    <h2 class="text-xl font-medium">
                        Launchpad: {{ launchpad?.full_name }}
                    </h2>
                    <h2 class="text-xl font-medium">Locality : {{ launchpad?.locality }}</h2>
                </div>
            </div>
            <!--หัว Detail รายละเอียด -->
            <div class="mt-4 flex flex-col items-center border-b pb-4">
                <!-- ส่วนของ Detail -->
                <div class="mb-4">
                    <h3 class="bg-blue-700 text-white p-1 rounded-full font-medium w-[70px] text-center">
                        Details
                    </h3>
                </div>

                <!-- ส่วนของ รายละเอียด -->
                <div class="text-center ">
                    <h2 class="text-xl font-light ">
                        {{ launchpad?.details }}
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { fetchUpcomingLaunches } from '~/apis/Launched';
import { fetchCrewDetails } from '@/apis/Crews';
import { fetchRocketDetails } from '~/apis/Rocket';
import { fetchLaunchpadsById } from '@/apis/Launchpads';
import { Launch } from '~/types/Launch';
import { Crew } from '~/types/Crews';
import { Rocket } from '~/types/Rocket';
import { Launchpads } from '~/types/Launchpad';


export default Vue.extend({
    name: "Modal",
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
        launch: {
            type: Object as () => Launch | null,
            required: false,
            default: null,
        },
    },
    data(): { launches: Launch[], crewDetails: Crew[], rocket: Rocket | null, launchpad: Launchpads | null, } {
        return {
            launches: [] as Launch[],
            crewDetails: [] as Crew[],
            rocket: null,
            launchpad: null,
        };
    },
    watch: {
        launch: {
            immediate: true,
            handler(newLaunch) {
                if (newLaunch && newLaunch.crew && newLaunch.crew.length > 0) {
                    this.loadCrewDetails(newLaunch.crew);
                } else {
                    this.crewDetails = [];
                }

                if (newLaunch && newLaunch.rocket) {
                    this.loadRocketDetails(newLaunch.rocket);
                } else {
                    this.rocket = null;
                }

                // Fetch the launchpad data based on launchpadId
                if (newLaunch && newLaunch.launchpad) {
                    this.loadLaunchpad(newLaunch.launchpad);
                } else {
                    this.launchpad = null;
                }
            },
        },
    },
    methods: {
        async loadCrewDetails(crewIds: string[]) {
            try {
                this.crewDetails = await fetchCrewDetails(crewIds);
            } catch (error) {
                console.error('Failed to fetch crew details:', error);
            }
        },
        async loadRocketDetails(rocketId: string) {
            try {
                this.rocket = await fetchRocketDetails(rocketId);
            } catch (error) {
                console.error('Failed to fetch rocket details:', error);
            }
        },
        async loadLaunchpad(launchpadId: string) {
            try {
                const launchpadData = await fetchLaunchpadsById(launchpadId); // Use the function that fetches launchpad by ID
                this.launchpad = launchpadData;
            } catch (error) {
                console.error('Failed to fetch launchpad details:', error);
            }
        }
    },
    async created() {
    try {
        // 1. เรียกข้อมูลทั้งหมดของการปล่อยยานจาก API
        const allLaunches = await fetchUpcomingLaunches();
        this.launches = allLaunches; // เก็บข้อมูลทั้งหมดของการปล่อยยานลงในตัวแปร launches

        // 2. ตรวจสอบว่าการปล่อยยานตัวแรกในข้อมูลมีฐานปล่อยหรือไม่
        if (this.launches.length > 0 && this.launches[0].launchpad) {
            // ถ้ามีข้อมูลฐานปล่อย (launchpad) ในการปล่อยยานตัวแรก
            // เรียกใช้ฟังก์ชัน fetchLaunchpadsById เพื่อดึงข้อมูลของฐานปล่อยจาก API โดยใช้ launchpadId
            const launchpadData = await fetchLaunchpadsById(this.launches[0].launchpad);
            
            // 3. เก็บข้อมูลของฐานปล่อยที่ดึงมาในตัวแปร launchpad
            this.launchpad = launchpadData;
        }
    } catch (error) {
        // ถ้ามีข้อผิดพลาดในขั้นตอนใดก็ตาม จะแสดงข้อความใน console
        console.error('Failed to fetch launches:', error);
    }
}

});
</script>