import axios from 'axios';
import { getImages, uploadImage } from './api_calls';

jest.mock('axios');

describe('api calls', () => {
  it('should get images', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: '1',
          image: 'image blob',
        },
      ],
    });
    const res = await getImages();
    expect(res.data[0].image).toEqual('image blob');
  });

  it('should upload image', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      status: 201,
      data: [
        {
          id: '1',
          image: 'image',
        },
      ],
    });

    const file = new File([''], 'filename', { type: 'multipart/formdata' });
    const res = await uploadImage(file, 10);
    expect(res.status).toEqual(201);
  });
});
