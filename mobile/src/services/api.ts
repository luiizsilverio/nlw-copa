import axios from 'axios';
import { ENV } from '../../src/.env.js';

export const api = axios.create({
  baseURL: ENV.URL_API
})

