import axios from 'axios';

export const getImages = () => {
  return axios.get('http://127.0.0.1:8000/api/get');
};

export const uploadImage = async (file: File, id: number) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('destination', 'images');
  formData.append('create_thumbnail', 'true');
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };
  const url = `http://127.0.0.1:8000/api/upload?file_id=${id}`;

  return axios.post(url, formData, config);
};
