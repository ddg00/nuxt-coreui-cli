const axios = require('axios');

export const Request = {
  get: async (uri) => {
    try {
      const response = await axios.get(uri);
      return response
    } catch (error) {
      console.error(error);
    }
  }
}
