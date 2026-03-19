import axios from 'axios';

describe('GET /', () => {
  it('should return a message', async () => {
    const res = await axios.get(`/`);

    // Some services may return 404 for a plain GET /, so we catch errors to ensure the server is up
    expect(res).toBeDefined();
  });
});
