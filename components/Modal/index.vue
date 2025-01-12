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
                <h2 class="font-bold text-lg text-center w-full">Crew Details</h2>
                <div class="justify-center text-center mt-3 font-light">
                    <p>Date mount</p>
                </div>
            </div>
            <div class="mt-4 flex flex-col items-center border-b pb-4">
                <!-- Title -->
                <h3 class="bg-blue-700 text-white p-1 rounded-full font-medium w-[70px] text-center">Crews</h3>

                <!-- Grid -->
                <div class="mt-4 grid grid-cols-4 gap-6">
                    <!-- Item 1 -->
                    <div class="text-center">
                        <div class="bg-gray-300 w-[100px] h-[50px] mx-auto">Img</div>
                        <h2 class="mt-2">space man name</h2>
                    </div>
                    <!-- Item 2 -->
                    <div class="text-center">
                        <div class="bg-gray-300 w-[100px] h-[50px] mx-auto">Img</div>
                        <h2 class="mt-2">space man name</h2>
                    </div>

                    <div class="text-center">
                        <div class="bg-gray-300 w-[100px] h-[50px] mx-auto">Img</div>
                        <h2 class="mt-2">space man name</h2>
                    </div>

                    <div class="text-center">
                        <div class="bg-gray-300 w-[100px] h-[50px] mx-auto">Img</div>
                        <h2 class="mt-2">space man name</h2>
                    </div>
                </div>
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

export default Vue.extend  ({ 
    name: "Modal",
    props: {
        isVisible: {
            type: Boolean,
            required: true,
        },
    },
});
</script>