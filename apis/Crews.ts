import axios from 'axios';
import { Crew } from '~/types/Crews';

const API_BASE_URL = 'https://api.spacexdata.com/v4';

export const fetchCrewDetails = async (crewIds: string[]): Promise<Crew[]> => {
    try {
        const crewDetails = await Promise.all(
            crewIds.map(async (id) => {
                const response = await axios.get<Crew>(`${API_BASE_URL}/crew/${id}`);
                return response.data;
            })
        );
        return crewDetails;
    } catch (error) {
        console.error('Error fetching crew details:', error);
        throw error;
    }
};
