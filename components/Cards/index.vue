<template>
    <div class="justify-center flex mt-6">
        <div class="space-y-4 w-[600px] ">
            <div class="border-2 border-slate-50 bg-slate-50 shadow-lg rounded-lg cursor-pointer hover:opacity-90 hover:scale-90 active:scale-95 transition duration-300"
                @click="openModal">
                <div class=" justify-between items-center p-4 grid grid-cols-2 gap-4 ">
                    <div class="flex items-center text-2xl">
                        <div class="mr-4">
                            <h2>Img</h2>
                        </div>
                        <div class="flex flex-col">
                            <h2 class="font-bold">Crew Name</h2>
                        </div>
                    </div>
                    <div class="flex items-center justify-end">
                        <div class="mr-4 bg-blue-700 p-0.5 text-white rounded-full w-16  flex">
                            <h3 class="text-center font-bold">3 crews</h3>
                        </div>
                        <div class="font-medium">
                            Date
                        </div>
                        <div class="ml-4 text-blue-700 font-medium">
                            Upcoming
                        </div>
                    </div>
                </div>
            </div>
            <ModalBox :isVisible="isModalOpen" @close="closeModal" />
        </div>
    </div>
</template>

<script lang="ts">
import ModalBox from "@/components/Modal/index.vue";

export default {
    name: "CardBox",
    components: {
        ModalBox,
    },
    data(): { isModalOpen: boolean } {
        return {
            isModalOpen: false,
        };
    },
    methods: {
        openModal(): void {
            this.isModalOpen = true;
        },
        closeModal(): void {
            this.isModalOpen = false;
        },
    },
};

</script>