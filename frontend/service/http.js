import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { IP } from "../config/app";

const URI = `http://${IP}:5002/api`;

const http = axios.create({ baseURL: URI });
http.defaults.headers.common["Content-Type"] = "application/json";

const token = async () => {
    let token = await AsyncStorage.getItem("token");
    return token;
};

http.defaults.headers.common["Authorization"] = `Bearer ${token()}`;

export default http;
