<template>
    <div>
      <h1>Upcoming SpaceX Launches</h1>
      <ul v-if="launches.length">
        <li v-for="launch in launches" :key="launch.id">
          <h3>{{ launch.name }}</h3>
          <p>Date: {{ new Date(launch.date_utc).toLocaleString() }}</p>
          <p>Rocket: {{ launch.rocket }}</p>
          <!-- แสดงภาพของจรวด -->
          <img v-if="launch.links.patch.small" :src="launch.links.patch.small" :alt="launch.name" />
        </li>
      </ul>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { fetchUpcomingLaunches } from '~/apis/Launched';
  import { Launch } from '~/types/Launch';  // Import Launch type
  
  export default defineComponent({
    data() {
      return {
        launches: [] as Launch[],  // กำหนดประเภทเป็น Launch[] โดยตรง
      };
    },
    async created() {
      try {
        this.launches = await fetchUpcomingLaunches();
      } catch (error) {
        console.error('Failed to fetch launches:', error);
      }
    },
  });
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  li {
    margin-bottom: 12px;
  }
  img {
    width: 100px;
    height: auto;
    margin-top: 8px;
  }
  </style>
  