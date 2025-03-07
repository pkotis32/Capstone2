import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://tennispal-finder.onrender.com";


// API class containing static methods sent to the API
class TennisApi {
  // saves the current token to be used with requests when necessary
  static token: string;

  // builds and sends each request based on the type that the function is given
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
      // Check if `err.response` exists
      if (err.response) {
        console.error("API Error:", err.response);
        const message = err.response.data?.error?.message || "Unknown error occurred";
        throw Array.isArray(message) ? message : [message];
      } else {
        console.error("API Error: No response", err);
      }
    }
  }

  // signs the user in
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

  // logs the user in
  static async login(username: string, password: string) {
    let data = {
      username,
      password
    }

    let res = await this.request('auth/token', data, 'post');
    return res;
  }


  // saves the users home address
  static async saveAddress(username: string, address: string, token: string) {
    
    this.token = token;
    let data = {
      address
    }

    let res = await this.request(`users/${username}/save_address`, data, 'patch');
    return res;
  }

  // saves the users preferred court location
  static async saveCourtAddress(username: string, courtName: string, address: string, token: string) {
    
    this.token = token;
    let data = {
      courtName,
      address
    }
    
    let res = await this.request(`users/${username}/save_court_address`, data, 'post')
    return res;
  }


  // saves the users availabilities
  static async saveAvailabilities(username: string, availabilities: string[], token: string) {
    
    this.token = token;
    let data = {
      availabilities
    }

    let res = await this.request(`users/${username}/save_availabilities`, data, 'post')
    return res;
  }

  // retrieves all saved users
  static async getUsers(username: string, token: string) {
    this.token = token;
    let data = {
      username
    }

    let res = await this.request("users", data);
    return res;
  } 

  // returns the information for a user
  static async getUser(username: string, token: string) {
    this.token = token;
    
    let res = await this.request(`users/${username}`)
    return res;
  }


  // sends a message to a user
  static async sendMessage(sender: string, receiver: string, message: string, token: string) {
    this.token = token
    let data = {
      receiver,
      message
    }

    let res = await this.request(`messages/${sender}`, data, 'post');
    return res
  }

  // gets all messages between two users
  static async getMessages(senderId: number, sender: string, receiverId: number, token: string) {
    this.token = token;
    let data = {
      senderId,
      receiverId
    }

    let res = await this.request(`messages/${sender}`, data, 'get');
    return res;
  }

  // gets all users that a current user has a chat with
  static async getUserChats(senderId: number, sender: string, token: string) {
    this.token = token;
    let data = {
      senderId
    }

    let res = await this.request(`messages/chats/${sender}`, data);
    return res;
  }


  // get all saved court locations
  static async getCourtLocations(token: string) {
    this.token = token

    let res = await this.request(`court_locations`);
    return res;
  }
  

}

export default TennisApi;