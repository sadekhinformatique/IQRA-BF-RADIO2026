import axios from 'axios';
import { CONFIG } from '../constants/config';

const api = axios.create({
  baseURL: CONFIG.API_BASE,
  timeout: 10000,
});

export const getNowPlaying = async () => {
  try {
    // Use the local proxy to bypass CORS issues
    const response = await axios.get('/api/proxy/nowplaying');
    return response.data;
  } catch (error) {
    console.error('Error fetching now playing data via proxy:', error);
    throw error;
  }
};
