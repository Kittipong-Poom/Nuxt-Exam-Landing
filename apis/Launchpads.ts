import axios from "axios";
import { Launchpads } from "~/types/Launchpad";

const API_LAUNCHPADS = "https://api.spacexdata.com/v4";

export const fetchLaunchpadsById = async (
  launchpadId: string
): Promise<Launchpads> => {
  try {
    const response = await axios.get<Launchpads>(
      `${API_LAUNCHPADS}/launchpads/${launchpadId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching specific launchpad details", error);
    throw error;
  }
};
