import axios from 'axios';
import { convertImageToTextMock } from './api_calls';

jest.mock('axios');

describe('api calls', () => {
  it('should return text from image', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: '1',
          image: 'image blob',
          text: 'Конвертированный текст, который получен через api',
        },
      ],
    });
    const res = await convertImageToTextMock();
    expect(res.data[0].image).toEqual('image blob');
  });
});
