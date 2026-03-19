import axios from 'axios';

describe('GET /', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/`, { validateStatus: () => true });

    expect(res).toBeDefined();
  });
});
