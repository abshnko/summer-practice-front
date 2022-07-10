import { $api } from './api_settings';

export const convertImageToTextMock = () => {
  return $api('/convertedText');
};
