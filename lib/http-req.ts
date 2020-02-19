const axios = require('axios');

export const Axios = {
  get: async (uri: string, callback: (response: any) => void, error: (error: any) => void) => {
    axios.get(uri)
      .then(callback)
      .catch(error)
  }
}
