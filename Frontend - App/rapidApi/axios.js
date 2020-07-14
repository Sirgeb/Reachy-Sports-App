import axios from 'axios';
import { rapidApiKey } from '../config';

const instance = axios.create({
  baseURL: 'https://api-football-v1.p.rapidapi.com/v2',
  headers: {
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    'x-rapidapi-key': rapidApiKey
  }
});

export default instance;
