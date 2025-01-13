// apis/Launched.ts
import axios from 'axios';
import { Launch } from '~/types/Launch';  // ตรวจสอบให้แน่ใจว่า import ถูกต้อง

const API_LAUNCHES = 'https://api.spacexdata.com/v4';

export const fetchUpcomingLaunches = async (): Promise<Launch[]> => {
  try {
    const response = await axios.get<Launch[]>(`${API_LAUNCHES}/launches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching upcoming launches:', error);
    throw error;
  }
  
};
