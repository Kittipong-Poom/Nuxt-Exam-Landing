<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        @click.self="$emit('close')">
        <div class="absolute top-4 right-4">
            <button class="font-bold text-2xl hover:text-slate-300 duration-100 text-white px-2 py-1 rounded  "
                @click="$emit('close')">
                X
            </button>
        </div>
        <div class="bg-white w-[650px] rounded-lg shadow-lg p-6">
            <div class="flex-row items-center border-b pb-4">
                <h2 class="font-bold text-lg text-center w-full">{{ launch?.name }}</h2>
                <div class="justify-center text-center mt-3 font-light">
                    <p>{{ launch?.date_utc ? new Date(launch.date_utc).toDateString(): 'No Date Available' }}</p>
                </div>
            </div>
            <div class="mt-4 flex flex-col items-center border-b pb-4">
                <!-- Title -->
                <h3 class="bg-blue-700 text-white p-1 rounded-full font-medium w-[70px] text-center">Crews</h3>

                <!-- Grid -->
                <div v-if="crewDetails.length > 0" class="mt-4 grid grid-cols-4 gap-6">
                    <div v-for="crew in crewDetails" :key="crew.id" class="text-center">
                        <img :src="crew.image" alt="Crew Member" class="bg-gray-300 w-[100px] h-[100px] mx-auto rounded-full" />
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
                        Falcon 9
                    </h2>
                    <img src="your-image-url" alt="Rocket Image" class="mt-4 w-[300px] h-auto" />
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
                <div class="text-center">
                    <h2 class="text-xl font-medium">
                        Falcon 9 Falcon 9 Falcon 9 Falcon 9 Falcon 9
                    </h2>
                </div>
            </div>
            <!--หัว Detail รายละเอียด -->
            <div class="mt-4 flex flex-col items-center border-b pb-4">
                <!-- ส่วนของ Detail -->
                <div class="mb-4">
                    <h3 class="bg-blue-700 text-white p-1 rounded-full font-medium w-[70px] text-center">
                        Detail
                    </h3>
                </div>

                <!-- ส่วนของ รายละเอียด -->
                <div class="text-center ">
                    <h2 class="text-xl font-light ">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates vel libero,
                        laborum consectetur aliquid eaque dolores consequatur optio totam quia sequi,
                        praesentium sapiente, numquam fugiat repellendus quasi aut fuga voluptatum assumenda
                        culpa dolore rem possimus mollitia. Nobis quibusdam voluptatibus ducimus debitis accusamus
                        voluptates velit pariatur placeat. Ad beatae hic tempore.
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { fetchUpcomingLaunches } from '~/apis/Launched';
import { Launch } from '~/types/Launch';
import { fetchCrewDetails } from '@/apis/Crews'
import { Crew } from '~/types/Crews';


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
    data(): { launches: Launch[],crewDetails: Crew[] } {
        return {
            launches: [] as Launch[],
            crewDetails: [] as Crew[],
        };
    },
    watch: {
        // Watch launch prop เพื่อเรียกข้อมูล Crew เมื่อ launch เปลี่ยน
        launch: {
            immediate: true,
            handler(newLaunch) {
                if (newLaunch && newLaunch.crew && newLaunch.crew.length > 0) {
                    this.loadCrewDetails(newLaunch.crew);
                } else {
                    this.crewDetails = [];
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
    },
    async created() {
        try {
            const allLaunches = await fetchUpcomingLaunches();
            this.launches = allLaunches; // เก็บข้อมูลทั้งหมด
        } catch (error) {
            console.error('Failed to fetch launches:', error);
        }
    },
});
</script>