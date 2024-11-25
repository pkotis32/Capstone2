import axios from "axios";
import { AxiosError } from 'axios';

const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class TennisApi {
  // the token for interactive with the API will be stored here.
  static token: string;

  static async request(endpoint: string, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${TennisApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async signup(username: string, password: string, email: string, firstName: string, lastName: string, skillLevel: string) {
    let data = {
      username, 
      password, 
      email,
      firstName,
      lastName,
      skillLevel
    }

    let res = await this.request('auth/register', data, 'post');
    return res;
  }

  static async login(username: string, password: string) {
    let data = {
      username,
      password
    }

    let res = await this.request('auth/token', data, 'post');
    return res;
  }


  static async saveAddress(username: string, address: string) {
    let data = {
      address
    }

    let res = await this.request(`users/${username}/save_address`, data, 'patch');
    return res;
  }

  
  static async saveCourtAddress(username: string, courtName: string, address: string) {
    let data = {
      courtName,
      address
    }
    
    let res = await this.request(`users/${username}/save_court_address`, data, 'post')
    return res;
  }

}

export default TennisApi;