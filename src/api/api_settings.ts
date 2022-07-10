import axios from 'axios';

export const API_URL = 'https://62cb26761eaf3786ebb64f0e.mockapi.io/api/v1/';

export const $api = axios.create({
  baseURL: API_URL,
});
