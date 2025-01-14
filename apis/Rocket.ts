// apis/Launched.ts
import axios from "axios";
import { Rocket } from "~/types/Rocket"; // ใช้ interface ของ Rocket ที่คุณสร้างไว้

const API_ROCKETS = "https://api.spacexdata.com/v4/rockets"; // API สำหรับดึงข้อมูลจรวด

export const fetchRocketDetails = async (rocketId: string): Promise<Rocket> => {
  try {
    const response = await axios.get<Rocket>(`${API_ROCKETS}/${rocketId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rocket details:", error);
    throw error;
  }
};
