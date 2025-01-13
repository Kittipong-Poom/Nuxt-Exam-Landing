<template>
    <div>
      <h1>Upcoming SpaceX Launches</h1>
      <ul v-if="launches.length">
        <li v-for="launch in launches" :key="launch.id">
          <h3>{{ launch.name }}</h3>
          <p>Date: {{ new Date(launch.date_utc).toLocaleString() }}</p>
          <p>Rocket: {{ launch.rocket }}</p>
        </li>
      </ul>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script>
  import { fetchUpcomingLaunches } from '~/apis/Launched';
  
  export default {
    data() {
      return {
        launches: [],
      };
    },
    async created() {
      try {
        this.launches = await fetchUpcomingLaunches();
      } catch (error) {
        console.error('Failed to fetch launches:', error);
      }
    },
  };
  </script>
  
  <style scoped>
  h1 {
    font-size: 24px;
    margin-bottom: 16px;
  }
  li {
    margin-bottom: 12px;
  }
  </style>
  