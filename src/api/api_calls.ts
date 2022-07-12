import axios from 'axios';

export const convertImageToTextMock = () => {
  return axios.get(
    'https://62cb26761eaf3786ebb64f0e.mockapi.io/api/v1/convertedText'
  );
};
