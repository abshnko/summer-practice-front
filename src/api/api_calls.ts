import axios from 'axios';

export const getImages = () => {
  return axios.get('http://176.53.160.122:8000/api/get');
};

export const uploadImage = async (file: File, id: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('destination', 'images');
  formData.append('create_thumbnail', 'true');
  const url = `http://176.53.160.122:8000/api/upload?file_id=${id}`;

  return axios.post(url, formData);
};

export const predictText = async (id: number) => {
  const url = `http://176.53.160.122:8000/api/predict?file_id=${id}`;
  return axios.post(url);
};

export const getImageById = async (id: number) => {
  const url = `http://176.53.160.122:8000/api/photo?file_id=${id}`;
  return axios.get(url, { responseType: 'blob' });
};

export const getImageInfoById = async (id: number) => {
  const url = `http://176.53.160.122:8000/api/get?id=${id}`;
  return axios.get(url);
};

export const getNextImages = async (start: number, count: number) => {
  const url = `http://176.53.160.122:8000/api/photos?start=${start}&count=${count}`;
  return axios.get(url);
};
