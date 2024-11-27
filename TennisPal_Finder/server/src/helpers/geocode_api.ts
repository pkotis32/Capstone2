import axios from 'axios';

const BASE_API = 'https://maps.googleapis.com/maps/api/geocode/json'
const API_KEY = 'AIzaSyBJH3OKaWYrm3RiNkabZCCfyfM9Z2m0PLk'


async function getLatLng (address: string) {

  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(`${BASE_API}?address=${encodedAddress}&key=${API_KEY}`)
    let data = response.data
    const location = data.results[0].geometry.location;
    return location;
  } catch (error) {
    throw new Error("Failed to get court location");
  }

}


export default getLatLng