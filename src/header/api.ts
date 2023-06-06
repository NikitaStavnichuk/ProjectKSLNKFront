import axios from "axios";

export const getProfile = async () => {
  try {
    const res = await axios.get('/api/profile')
    return res.data;
  }
  catch (e) {
    return null
  }
}

export const getProfileServer = async (cookies: string) => {
  try {
    const res = await axios.get('http://localhost:3000/api/profile', {
      headers: {
        'Cookie': cookies
      },
    })
    return res.data;
  }
  catch (e) {
    return null
  }
}
