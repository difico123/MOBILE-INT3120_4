import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import App from "../config/app";
const { IP } = App;

const URI = `http://${IP}:5002/api`;

const http = axios.create({ baseURL: URI });
http.defaults.headers.common["Content-Type"] = "application/json";

const setToken = async () => {
  let token = await AsyncStorage.getItem("token");
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
setToken();

export default http;
